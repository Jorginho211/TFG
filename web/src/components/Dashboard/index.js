import React, {Component} from 'react'

import { autobind } from 'core-decorators';
import CSSModules from 'react-css-modules';
import styles from './styles.scss';

import 'style!css!react-grid-layout/css/styles.css'
import RaisedButton from 'material-ui/RaisedButton';

import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';

import IconButton from 'material-ui/IconButton';
import DeleteIcon from 'material-ui/svg-icons/action/delete';

import representations from '../../../strings/src/components/Dashboard/representations.json';

var WidthProvider = require('react-grid-layout').WidthProvider;
var ReactGridLayout = require('react-grid-layout');
ReactGridLayout = WidthProvider(ReactGridLayout);
const ReactHighcharts = require('react-highcharts');

@CSSModules(styles)
class Dashboard extends Component {
    constructor() {
        super();
    }

    @autobind changeLayout(layout){
        this.props.DashboardActions.saveLayout(layout)
        this.forceUpdate()
    }

    @autobind addLayout(){
        let layout = this.props.dashboard.layout
        layout.push(
            {i: (layout.length + 1).toString(), x: 0, y: 0, w: 4, h: 8},
        )

        this.props.DashboardActions.addRemoveElement(layout)
    }

    @autobind deleteLayout(layout){
        let layout2 = []

        this.props.dashboard.layout.map(l => {
            if( l !== layout){
                layout2.push(l)
            }
        })

        this.props.DashboardActions.addRemoveElement(layout2)
    }

    componentWillUnmount() {
        let layout = []
        let j = 1
        this.props.dashboard.layoutSave.map(l => {
            layout.push({
                ...l,
                i : j.toString(),
            })

            j++
        })

        this.props.DashboardActions.addRemoveElement(layout)
    }

    render() {
		const {dashboard} = this.props;

    	return (
            <div>
        		<ReactGridLayout onLayoutChange={(layout) => this.changeLayout(layout)} items={3} rowHeight={30} cols={12} className="layout">
                    {dashboard.layout.map((l, index) => {
                        return (
                            <div key={l.i} _grid={l} className={styles.cell}>
                                <ReactHighcharts className={styles.container} config={ representations[0] }></ReactHighcharts>
                                <IconButton onTouchTap={() => this.deleteLayout(l)} className={styles.actionButtons}>
                                    <DeleteIcon />
                                </IconButton>
                            </div>
                        )
                    })}
          		</ReactGridLayout>

                <FloatingActionButton onTouchTap={() => this.addLayout()} className={styles.floatingButton}>
                    <ContentAdd />
                </FloatingActionButton>
            </div>
    	)
    }
}

export default Dashboard