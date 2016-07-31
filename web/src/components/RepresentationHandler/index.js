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

    getKPIAndRepresentation(idKPI, typeChart){
        let kpi;
        let representation;

        this.props.kpi.kpis.map( k => {
            if(k.id === idKPI){
                kpi = k
            }
        })

        kpi.representation.map( repr => {
            if(repr.type === typeChart){
                representation = repr
            }
        })

        return [kpi, representation]
    }

    line(chart){
        let series = []
        let kpiAndRepr
        let kpi
        let lineObject = highChartsJSON[0]
        let lineRepr

        let elementsRepeats = {}

        kpiAndRepr = this.getKPIAndRepresentation(chart.idkpi, chart.chartType)
        kpi = kpiAndRepr[0]
        lineRepr = kpiAndRepr[1]

        if(chart.data !== undefined){
            chart.data.map(data => {
                if(elementsRepeats[data[lineRepr.mapXAxis]] === undefined){
                    elementsRepeats[data[lineRepr.mapXAxis]] = [ Number(data[lineRepr.mapYAxis]) ]
                }
                else {
                    elementsRepeats[data[lineRepr.mapXAxis]].push( Number(data[lineRepr.mapYAxis])) 
                }
            })

            for(var key in elementsRepeats){
                series.push({
                    name: key,
                    data: elementsRepeats[key]
                })
            }

            lineObject.series = series
            lineObject.title.text = kpi.name
            lineObject.xAxis.title.text = lineRepr.labelXAxis
            lineObject.yAxis.title.text = lineRepr.labelYAxis
        }

        return lineObject
    }

    bar(chart){
        let barObject = highChartsJSON[1]
        let kpiAndRepr
        let kpi
        let barRepr
        let elementsRepeats = {}
        let series = []

        kpiAndRepr = this.getKPIAndRepresentation(chart.idkpi, chart.chartType)
        kpi = kpiAndRepr[0]
        barRepr = kpiAndRepr[1]

        if(chart.data !== undefined){
            chart.data.map(data => {
                if(elementsRepeats[data[barRepr.mapYAxis]] === undefined){
                    elementsRepeats[data[barRepr.mapYAxis]] = [ Number(data[barRepr.mapXAxis]) ]
                }
                else {
                    elementsRepeats[data[barRepr.mapYAxis]].push( Number(data[barRepr.mapXAxis])) 
                }
            })

            for(var key in elementsRepeats){
                series.push({ name: key, data: []})
            }

            let numberElements = 0
            series.map( serie => {
                for(var key in elementsRepeats){
                    if(numberElements < elementsRepeats[key].length){
                        serie.data.push(elementsRepeats[key][numberElements])
                    }
                }

                numberElements += 1
            })

            barObject.series = series
            barObject.title.text = kpi.name
            barObject.xAxis.title.text = barRepr.labelXAxis
            barObject.yAxis.title.text = barRepr.labelYAxis
        }

        return barObject
    }

    pie(chart){
        let pieObject = highChartsJSON[2]
        let series = [{ data: [] }]
        let sumTotal = 0
        let pieRepr
        let kpiAndRepr
        let kpi

        kpiAndRepr = this.getKPIAndRepresentation(chart.idkpi, chart.chartType)
        kpi = kpiAndRepr[0]
        pieRepr = kpiAndRepr[1]

        pieObject.title.text = kpi.name

        if(chart.data !== undefined){
            chart.data.map( data => {
                sumTotal = sumTotal + Number(data[pieRepr.mapYAxis])
            })

            chart.data.map( data => {
                    series[0].data.push({
                    name: data[pieRepr.mapXAxis],
                    y: Number(data[pieRepr.mapYAxis])*100/sumTotal
                })
            })

            pieObject.series = series

        }

        return pieObject

    }

    number(chart){
        let kpiAndRepr
        let kpi
        let numberRepr
        let data

        kpiAndRepr = this.getKPIAndRepresentation(chart.idkpi, chart.chartType)
        kpi = kpiAndRepr[0]
        numberRepr = kpiAndRepr[1]

        if(chart.data !== undefined){
            data = chart.data[0][numberRepr.mapXAxis]
        }

        return [ kpi.name, numberRepr.labelXAxis, data ]
    }

    getRepresentation(chart){
        switch(chart.chartType){
            case "line":
                return (
                    <ReactHighcharts className={styles.container} config={ this.line(chart) }></ReactHighcharts>
                )

            case "bar":
                return (
                    <ReactHighcharts className={styles.container} config={ this.bar(chart) }></ReactHighcharts>
                )

            case "pie":
                return (
                    <ReactHighcharts className={styles.container} config={ this.pie(chart) }></ReactHighcharts>
                )

            case "number":
                let data = this.number(chart)

                return (
                    <div>
                      <div className={styles.numberGraph}>
                        <h3>{data[0]}</h3>
                        <h4>{data[1]}</h4>
                        <p>{data[2]}</p>
                      </div>
                    </div>
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