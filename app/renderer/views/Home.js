import React from 'react';
import { Subscribe } from 'unstated';
import Button from 'components/Button';
import appContainer from 'containers/App';
import loginContainer from 'containers/Login';
import { setLoginWindowBounds } from '../util';
import { translate } from '../translate';
import Toolbar from './Toolbar/Toolbar';
import './Home.scss';

const t = translate('home');

class Home extends React.Component {
	componentDidMount() {
		setLoginWindowBounds();
	}

	render() {
		return (
			<Subscribe to={[loginContainer]}>
				{login => {
					return (
						<div className="Home container">
							{/* <div className="window-draggable-area" /> */}
							<Toolbar/>
							<div className="is-centered">
								<p>UMBRELLA</p>
								<Button
									className="sign-nav-btn"
									color="blue"
									fullwidth
									value="Sign In"
									onClick={() => {
										appContainer.setActiveView('Login');
									}}
								/>
								<Button
									className="signup-nav-btn"
									color="transparent"
									fullwidth
									value="Create New Account"
									onClick={() => {
										appContainer.setActiveView('CreatePortfolio');
										// loginContainer.setProgress(0.25);
									}}
								/>
							</div>
						</div>
					);
				}}
			</Subscribe>
		);
	}
}

export default Home;

