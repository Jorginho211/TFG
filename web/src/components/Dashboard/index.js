import React, {Component} from 'react'

import { autobind } from 'core-decorators';
import CSSModules from 'react-css-modules';
import styles from './styles.scss';

import 'style!css!react-grid-layout/css/styles.css'
import RaisedButton from 'material-ui/RaisedButton';


@CSSModules(styles)
class Dashboard extends Component {
    constructor() {
        super();
    }

    @autobind changeLayout(layout){
        this.props.DashboardActions.changeLayout(layout)
    }

    render() {
    	var WidthProvider = require('react-grid-layout').WidthProvider;
		var ReactGridLayout = require('react-grid-layout');
		ReactGridLayout = WidthProvider(ReactGridLayout);

		const {dashboard} = this.props;

    	return (
            <div>
        		<ReactGridLayout layout={dashboard.layout} items={3} rowHeight={30} cols={12}>
                    <div key={'a'}>a</div>
                    <div key={'b'}>b</div>
                    <div key={'c'}>c</div>
          		</ReactGridLayout>
            </div>
    	)
    }
}

export default Dashboard