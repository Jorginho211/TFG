import React, {Component} from 'react'

import { autobind } from 'core-decorators';
import CSSModules from 'react-css-modules';
import styles from './styles.scss';

import 'style!css!react-grid-layout/css/styles.css'

import highChartsJSON from '../../../strings/src/components/RepresentationHandler/representations.json';

import IconButton from 'material-ui/IconButton';
import DeleteIcon from 'material-ui/svg-icons/action/delete';

var WidthProvider = require('react-grid-layout').WidthProvider;
var ReactGridLayout = require('react-grid-layout');
ReactGridLayout = WidthProvider(ReactGridLayout);
const ReactHighcharts = require('react-highcharts');

@CSSModules(styles)
class RepresentationHandler extends Component {
    constructor() {
        super();
    }

    @autobind changeLayout(layout){
        this.props.DashboardActions.saveLayout(layout)
        this.forceUpdate()
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
    

    render() {
    	const {dashboard} = this.props;

    	return (
    		<div>
	    		<ReactGridLayout onLayoutChange={(layout) => this.changeLayout(layout)} items={3} rowHeight={30} cols={12} className="layout">
	                {dashboard.dashboard.map( (d, index) => {
	                        return (
	                           <div key={d.layout.i} _grid={d.layout} className={styles.cell}>
	                                {highChartsJSON.map ( (r,index) => {
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
            </div>
    	)
    }
}

export default RepresentationHandler