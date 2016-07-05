import React, {Component} from 'react'

import { autobind } from 'core-decorators';
import CSSModules from 'react-css-modules';
import styles from './styles.scss';

@CSSModules(styles)
class Dashboard extends Component {
    constructor() {
        super();
    }

    render() {

    	return (
    		<div>
		    </div>
    	)
    }
}

export default Dashboard