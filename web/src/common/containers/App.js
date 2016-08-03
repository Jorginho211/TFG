import React, { Component, PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import Dimensions from 'react-dimensions'
import { Link } from 'react-router'
import { FormattedMessage } from 'react-intl'
import CSSModules from 'react-css-modules'

import styles from '../styles/styles.scss'

import { autobind } from 'core-decorators'

import AppBar from 'material-ui/AppBar'
import LeftNav from 'material-ui/Drawer'
import IconButton from 'material-ui/IconButton'
import Divider from 'material-ui/Divider'

import NavigationMenu from 'material-ui/svg-icons/navigation/menu'
import Home from 'material-ui/svg-icons/action/home'
import Info from 'material-ui/svg-icons/action/info'
import MenuItem from 'material-ui/MenuItem/MenuItem'
import DeveloperBoard from 'material-ui/svg-icons/hardware/developer-board.js'

import Avatar from 'material-ui/Avatar'

import * as UIActions from '../store/actions/UIActions'
//Import here the different actions from components
//      import * as XXActions from '../../XX/Actions'
import * as KPIActions from '../../components/KPI/Actions'
import * as DatosKPIActions from '../../components/DatosKPI/Actions'
import * as CodeWizardActions from '../../components/CodeWizard/Actions'
import * as DashboardActions from '../../components/Dashboard/Actions'
import * as RepresentationHandlerActions from '../../components/RepresentationHandler/Actions'

import { Breakpoints } from '../styles/Breakpoints'

@Dimensions()
@CSSModules(styles)
class App extends Component {
    constructor() {
        super();
    }

    @autobind handleNavigationButtonClick(){
        this.toggleMenu(true);
    }

    @autobind toggleMenu(force = false){
        if(this.props.isMenuOpened || force)
            this.props.UIActions.toggleMenu()
    }

    render() {
        const { title, isMenuOpened, children, containerWidth, kpi} = this.props;

        return (
            <div className='div1' styleName='app-container'>
                <AppBar
                    styleName = 'appbar-container'
                    title = {title}
                    iconElementLeft = {
                        <IconButton onClick={ this.handleNavigationButtonClick }>
                            <NavigationMenu />
                        </IconButton>
                    }
                    showMenuIconButton = { containerWidth < Breakpoints.large } />
                <LeftNav
                    styleName='leftbar-container'
                    open={(containerWidth < Breakpoints.large && isMenuOpened) || (containerWidth >= Breakpoints.medium)}
                    docked={ containerWidth >= Breakpoints.large }
                >
                    <Link to='/' onClick={this.toggleMenu}>
                        <MenuItem leftIcon={<Home />}>
                            <FormattedMessage
                                id='main.menu.home'
                                description='Main menu home link'
                                defaultMessage='Home'
                            />
                        </MenuItem>
                    </ Link>

                    <Link to='/kpi' onClick={ this.toggleMenu }>
                        <MenuItem>
                            Administración
                        </MenuItem>
                    </ Link>
                    <Link to='/dashboard' onClick={ this.toggleMenu }>
                        <MenuItem>
                            Dashboard
                        </MenuItem>
                    </Link>
                </LeftNav>
                <div styleName='main-container'>
                    { children && React.cloneElement(children, {...this.props, style: undefined})}
                </div>
            </div>
        )
    };

    static propTypes = {
        title: PropTypes.string.isRequired,
        isMenuOpened: PropTypes.bool.isRequired,
        children: PropTypes.node.isRequired,
    };
}

function mapStateToProps(state) {
    return {
        title: state.UIState.title,
        isMenuOpened: state.UIState.isMenuOpened,
        kpi: {
                ...state.KPIState,
                datoskpi: {
                    ...state.DatosKPIState,
                    codewizard: state.CodeWizardState,
                },
        },
        dashboard: {
            ...state.DashboardState,
            representationHandler: state.RepresentationHandlerState,
        }
    };
}

function mapDispatchToProps(dispatch) {
    return {
        UIActions: bindActionCreators(UIActions, dispatch),
        //Add here the binding for the different actions
        //      XXActions: bindActionCreators(XXActions, dispatch)
        KPIActions: {
            ...bindActionCreators(KPIActions, dispatch),
            DatosKPIActions : {
                ...bindActionCreators(DatosKPIActions, dispatch),
                CodeWizardActions : bindActionCreators(CodeWizardActions, dispatch),
            },
        },
        DashboardActions: {
            ...bindActionCreators(DashboardActions, dispatch),
            RepresentationHandlerActions: bindActionCreators(RepresentationHandlerActions, dispatch),
        }
    };
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(App);