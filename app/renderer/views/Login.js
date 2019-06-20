import React from 'react';
import {Subscribe} from 'unstated';
import Progress from 'components/Progress';
import loginContainer from 'containers/Login';
import {setLoginWindowBounds} from '../util';
import LoginBox from './LoginBox';
import ForgotPassword from './ForgotPassword';
import './Login.scss';

class Login extends React.Component {
	componentDidMount() {
		setLoginWindowBounds();
	}

	render() {
		return (
			<Subscribe to={[loginContainer]}>
				{login => {
					if (login.state.portfolios === null) {
						return null; // Not loaded yet
					}

					return (
						<div className="Login container">
							<div className="window-draggable-area"/>
							<Progress className="login-progress" value={login.state.progress}/>
							<div className="is-centered">
								<p className="title" >UMBRELLA</p>
								<LoginBox/>
								<ForgotPassword/>
							</div>
						</div>
					);
				}}
			</Subscribe>
		);
	}
}

export default Login;
