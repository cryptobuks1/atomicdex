import unhandled from 'electron-unhandled';
import React from 'react';
import Button from 'components/Button';
import Input from 'components/Input';
import Link from 'components/Link';
import appContainer from 'containers/App';
import loginContainer from 'containers/Login';
import LoggingIn from './LoggingIn';
import {translate} from '../translate';
import BackTextButton from 'components/BackTextButton';
import './LoginBox.scss';
import { setDate } from 'date-fns';

const t = translate('login');

class LoginBox extends React.Component {
	state = {
		usernameInputValue: '',
		passwordInputValue: '',
		isLoggingIn: false,
		isShowPassword: false,
	};

	usernameInputRef = React.createRef();
	passwordInputRef = React.createRef();

	handleUsernameInputChange = value => {
		this.setState({ usernameInputValue: value, passwordError: null});
	};

	handlePasswordInputChange = value => {
		this.setState({passwordInputValue: value});
	};

	handleSubmit = async event => {
		event.preventDefault();

		this.setState({
			isLoggingIn: true,
			passwordError: null,
		});

		const {usernameInputValue, passwordInputValue} = this.state;
		const {portfolios} = loginContainer.state;
		const selectData = portfolios.filter(portfolio => {
			return portfolio && portfolio.name === usernameInputValue;
		});
		loginContainer.setSelectedPortfolioId(selectData[0] ? selectData[0].id : null);
		try {
			await loginContainer.handleLogin(selectData[0] ? selectData[0].id : null, passwordInputValue);
		} catch (error) {
			if (this._isMounted) {
				await this.setState({
					isLoggingIn: false,
					passwordInputValue: '',
					passwordError: 'Username or password is not correct',
				});

				this.passwordInputRef.current.focus();
				return;
			}
			loginContainer.setActiveView(LoginBox.name);
			unhandled.logError(error, {title: 'Login Failed'});
		}
	};

	componentDidMount() {
		this._isMounted = true;
	}

	componentWillUnmount() {
		this._isMounted = false;
	}

	showPassword = () => {
		const isShowPassword = this.state.isShowPassword;
		this.setState({ isShowPassword: !isShowPassword });
	}

	render() {

		return (
			<div className="LoginBox">
				{ !this.state.isLoggingIn &&
					<BackTextButton
						onClick={() => {
							appContainer.setActiveView('Home');
						}}
					/>
				}
				{this.state.isLoggingIn && <LoggingIn />}
				<form onSubmit={this.handleSubmit}>
					<div className="form-group form-group-1">
						<Input
							className="user-name"
							ref={this.usernameInputRef}
							required
							type="text"
							placeholder={t('user')}
							value={this.state.usernameInputValue}
							disabled={this.state.isLoggingIn}
							onChange={this.handleUsernameInputChange}
						/>
					</div>
					<div className="form-group">
						<Input
							className="user-password"
							ref={this.passwordInputRef}
							required
							type={this.state.isShowPassword ? 'text' : 'password'}
							placeholder={t('password')}
							value={this.state.passwordInputValue}
							disabled={this.state.isLoggingIn}
							onChange={this.handlePasswordInputChange}
							showPassword={this.showPassword}
							suffixString="SHOW"
						/>
					</div>
					<p className="error-msg">{this.state.passwordError}</p>
					<div className="form-group form-group-2">
						<Button className="signin-btn" fullwidth type="submit" color="blue" value={t('login')} disabled={!this.state.passwordInputValue || this.state.isLoggingIn}/>
						{/* <Link
							disabled={this.state.isLoggingIn}
							style={{
								fontSize: '12px',
								lineHeight: 1.5,
								marginTop: '30px',
								color: '#54A1DA',
							}}
							onClick={() => {
								loginContainer.setActiveView('ForgotPasswordStep1');
								loginContainer.setProgress(0.33);
							}}
						>
							{t('forgotPassword')}
						</Link> */}
					</div>
				</form>
			</div>
		);
	}
}

export default LoginBox;
