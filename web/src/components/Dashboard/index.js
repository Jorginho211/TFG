import React, {Component} from 'react'

import { autobind } from 'core-decorators';
import CSSModules from 'react-css-modules';
import styles from './styles.scss';

import 'style!css!react-grid-layout/css/styles.css'
import 'style!css!./style.css'
import RaisedButton from 'material-ui/RaisedButton';

var WidthProvider = require('react-grid-layout').WidthProvider;
var ReactGridLayout = require('react-grid-layout');
ReactGridLayout = WidthProvider(ReactGridLayout);

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

    	return (
            <div>
        		<ReactGridLayout onLayoutChange={this.changeLayout} items={3} rowHeight={30} cols={12} autoSize={true} className="layout">
                    {dashboard.layout.map((l, index) => {
                        return (
                            <div key={index} _grid={l} className={styles.cell}>
                                <img className={styles.container} src="http://concepto.de/wp-content/uploads/2015/03/Paisaje.jpg"/>
                            </div>
                        )
                    })}
          		</ReactGridLayout>
            </div>
    	)
    }
}

export default Dashboard