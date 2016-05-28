import React, {Component} from 'react'
import CSSModules from 'react-css-modules'

class Home extends Component {
    constructor() {
        super();
    }

    render() {
        return(
            <div styleName='home'>
                <img src='http://www.phdcomics.com/comics/archive/phd012716s.gif' />
                <hgroup>
                    <h1>Welcome!</h1>
                    <h2>This is a React+Redux+ReactRouter app template</h2>
                </hgroup>
                <span><b>Created by </b><i><a href='mailto:victorj.gallego+react.template@gmail.com'>Víctor José Gallego Fontenla</a></i></span>
            </div>
        )
    }
}

export default Home