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

    getRepresentation(chart){
        let series
        let serie
        let kpi

        switch(chart.chartType){
            case "line":
                let lineObject = highChartsJSON[0]
                let lineRepr
                series = []
                let numberElementData = 0
                let id
                let dataAux = []

                this.props.kpi.kpis.map( k => {
                    if(k.id === chart.idkpi){
                        kpi = k
                    }
                })

                kpi.representation.map( repr => {
                    if(repr.type === "line"){
                        lineRepr = repr
                    }
                })

                if(chart.data !== undefined){
                    while(numberElementData < chart.data.length){
                        id = undefined

                        serie = {
                            data:[],
                        }

                        chart.data.map(data => {
                            let exist = false
                            dataAux.map(dataAuxEl => {
                                if(dataAuxEl === data){
                                    exist = true
                                }
                            })

                            if(exist === false){
                                if(id === undefined){
                                    id = data[lineRepr.mapXAxis]
                                }

                                if(id === data[lineRepr.mapXAxis]){
                                    serie.data.push(Number(data[lineRepr.mapYAxis]))

                                    dataAux.push(data)
                                }
                                
                            }
                        })

                        serie.name = id

                        if(serie.name !== undefined & serie.data.length > 0){
                            series.push(serie)
                        }
                        
                        numberElementData += 1
                    }

                    lineObject.series = series
                    lineObject.title.text = kpi.name
                    lineObject.xAxis.title.text = lineRepr.labelXAxis
                    lineObject.yAxis.title.text = lineRepr.labelYAxis
                }

                return (
                    <div>
                        <ReactHighcharts className={styles.container} config={ lineObject }></ReactHighcharts>
                    </div>
                )

            case "bar":
                return (
                    <div>
                        {highChartsJSON.map ( (r,index) => {
                            if(r.chart.type === chart.chartType){
                                return (
                                    <ReactHighcharts key={index} className={styles.container} config={ r }></ReactHighcharts>
                                )
                            }
                        })}
                    </div> 
                )

            case "pie":
                let pieObject = highChartsJSON[2]
                series = [{ data: [] }]
                let sumTotal = 0
                let pierepr

                this.props.kpi.kpis.map( k => {
                    if(k.id === chart.idkpi){
                        kpi = k
                    }
                })

                kpi.representation.map( repr => {
                    if(repr.type === "pie"){
                        pierepr = repr
                    }
                })

                pieObject.title.text = kpi.name

                if(chart.data !== undefined){
                    chart.data.map( data => {
                        sumTotal = sumTotal + Number(data[pierepr.mapYAxis])
                    })

                    chart.data.map( data => {
                            series[0].data.push({
                            name: data[pierepr.mapXAxis],
                            y: Number(data[pierepr.mapYAxis])*100/sumTotal
                        })
                    })

                    pieObject.series = series

                }
                
                return (
                    <ReactHighcharts className={styles.container} config={ pieObject }></ReactHighcharts>
                )

            default:
                return null;
        }
    }
    

    render() {
    	const {dashboard} = this.props;

    	return (
    		<div>
	    		<ReactGridLayout onLayoutChange={(layout) => this.changeLayout(layout)} items={3} rowHeight={30} cols={12} className="layout">
	                {dashboard.dashboard.map( (d, index) => {
	                        return (
                                <div key={d.layout.i} _grid={d.layout} className={styles.cell}>
	                               {this.getRepresentation(d)}

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