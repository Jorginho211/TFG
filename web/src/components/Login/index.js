import React, {Component} from 'react'

import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';

import { autobind } from 'core-decorators';
import CSSModules from 'react-css-modules';

import styles from './styles.scss';

@CSSModules(styles)
class Login extends Component {
    constructor() {
        super();
    }

    @autobind usernameChange(evt){
        this.props.LoginActions.usernameChange(evt.target.value)
    }

    @autobind passwordChange(evt){
        this.props.LoginActions.passwordChange(evt.target.value)
    }

    @autobind login(){
    	this.props.LoginActions.requestLogin(this.props.login.username, this.props.login.password)
    }

    @autobind authenticate(props) {
        if (!props.login.isAuthenticated) {
            return
        } else {
            this.context.router.push('/app')
        }
    }

    componentWillMount(){
        this.props.UIActions.setTitle("Login")
        this.authenticate(this.props)
    }

    componentWillReceiveProps(nextProps) {
        this.authenticate(nextProps)
    }

    render() {
        const { login } = this.props

    	return (
    		<div className={styles.mainContainer}>
    			<div className={styles.loginForm}>
                    <h1>Iniciar Sesión</h1>
    				<div className={styles.textField}>
    					<TextField hintText="Introduza o usuario" floatingLabelText="Usuario" onBlur={this.usernameChange} errorText={ login.loginError && "Usuario ou contrasinal incorrectos" }/>
    				</div>

    				<div className={styles.textField}>
    					<TextField hintText="Introduza un contrasinal" floatingLabelText="Contrasinal" type="password" onBlur={this.passwordChange}/>
    				</div>
    				<div className={styles.btnIniciarSesion}>
    					<RaisedButton label="Iniciar Sesión" primary={true} onTouchTap={() => this.login()}/>
    				</div>
    			</div>
    		</div>
    	)
    }
}

Login.contextTypes = {
  router: React.PropTypes.object
};

export default Login