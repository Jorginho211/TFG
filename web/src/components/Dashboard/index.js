import React, {Component} from 'react'

import { autobind } from 'core-decorators';
import CSSModules from 'react-css-modules';
import styles from './styles.scss';

import 'style!css!react-grid-layout/css/styles.css'
import RaisedButton from 'material-ui/RaisedButton';

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
        this.props.DashboardActions.changeLayout(layout)
    }

    render() {
		const {dashboard} = this.props;

        var config = {
            chart: {
                type: 'pie'
            },
            title: {
                text: 'Title'
            },

            series: [{
                data: [{
                    name: 'Name 1',
                    y: 56.33
                }, {
                    name: 'Name 2',
                    y: 24.03,
                }, {
                    name: 'Name 3',
                    y: 10.38
                }, {
                    name: 'Name 4',
                    y: 4.77
                }]
            }]
        }

    	return (
            <div>
        		<ReactGridLayout onLayoutChange={this.changeLayout} items={3} rowHeight={30} cols={12} autoSize={true} className="layout">
                    {dashboard.layout.map((l, index) => {
                        return (
                            <div key={index} _grid={l} className={styles.cell}>
                                <ReactHighcharts className={styles.container} config={config} ref="chart"></ReactHighcharts>
                            </div>
                        )
                    })}
          		</ReactGridLayout>
            </div>
    	)
    }
}

export default Dashboard