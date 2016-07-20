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
import SaveIcon from 'material-ui/svg-icons/content/save';

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
        let dashboard = [
            ...this.props.dashboard.dashboard
        ]

        dashboard.push({
            idkpi: dashboard.length.toString(),
            chartType: "line",
            layout: {h: 8, w: 4, x: 0, y: 0, i: dashboard.length.toString() + "||line"},
        })

        this.props.DashboardActions.addRemoveElement(dashboard)
    }

    @autobind deleteLayout(layout){
        let dashboard = []

        this.props.dashboard.dashboard.map( d => {
            if(d.layout.i !== layout.i){
                dashboard.push({
                    ...d,
                })
            }
        })

        this.props.DashboardActions.addRemoveElement(dashboard)
    }

    @autobind saveDashboard(){
        let chartType
        let idkpi
        let dashboard = []
        let layoutAux

        this.props.dashboard.layoutSave.map(l => {
            layoutAux = {
                ...l
            }
            layoutAux.i = layoutAux.i.replace(".$", "")

            idkpi = layoutAux.i.split("||")[0]
            chartType = layoutAux.i.split("||")[1]

            this.props.dashboard.dashboard.map(d => {
                if(d.idkpi === idkpi && d.chartType === chartType){
                    dashboard.push({
                        ...d,
                        layout: layoutAux
                    })
                }
            })
        })

        this.props.DashboardActions.addRemoveElement(dashboard)
        this.props.DashboardActions.putDashboard("aKxOyCoyl7ENwD8ipdRhOUo82WO50UZYdKdyelZi", dashboard)
    }

    componentWillMount(){
        this.props.DashboardActions.requestDashboard("aKxOyCoyl7ENwD8ipdRhOUo82WO50UZYdKdyelZi")
    }

    componentWillUnmount() {
    }

    render() {
		const {dashboard} = this.props;

    	return (
            <div>
        		<ReactGridLayout onLayoutChange={(layout) => this.changeLayout(layout)} items={3} rowHeight={30} cols={12} className="layout">
                    {dashboard.dashboard.map( (d, index) => {
                            return (
                               <div key={d.layout.i} _grid={d.layout} className={styles.cell}>
                                    {representations.map ( (r,index) => {
                                        if(r.chart.type === d.chartType){
                                            return (
                                                <ReactHighcharts key={index} className={styles.container} config={ r }></ReactHighcharts>
                                            )
                                        }
                                    })}
                                    <IconButton onTouchTap={() => this.deleteLayout(d.layout)} className={styles.actionButtons}>
                                        <DeleteIcon />
                                    </IconButton>
                                </div> 
                            )
                        })
                    }
          		</ReactGridLayout>

                <RaisedButton label="Gardar" labelPosition="before" primary={true} onTouchTap={() => this.saveDashboard()} icon={<SaveIcon />} className={styles.btnGardar} />

                <FloatingActionButton onTouchTap={() => this.addLayout()} className={styles.floatingButton} mini={true}>
                    <ContentAdd />
                </FloatingActionButton>
            </div>
    	)
    }
}

export default Dashboard