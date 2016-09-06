import React, {Component} from 'react'
import {createChild} from './helpers.js'

import { autobind } from 'core-decorators';
import CSSModules from 'react-css-modules';

//import styles from './styles.scss';

//@CSSModules(styles)
class Layout extends Component {
    constructor() {
        super();
    }

    componentWillMount(){
        console.log(this.props)
        this.authenticate(this.props)
    }

	componentWillReceiveProps(nextProps) {
        this.authenticate(nextProps)
    }

	@autobind authenticate(props) {
        if(props.login.isAuthenticated) {
            return
        } else {
            this.context.router.push('/login')
        }
        return
    }

    render(){
        return (
            <div>
                { createChild(this.props.children, this.props) }
            </div>
        )
    }
}

Layout.contextTypes = {
  router: React.PropTypes.object
};

export default Layout