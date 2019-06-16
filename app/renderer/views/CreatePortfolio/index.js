import React from 'react';
import {Subscribe} from 'unstated';
import loginContainer from 'containers/Login';
import LoginView from 'components/LoginView';
import createPortfolioContainer from 'containers/CreatePortfolio';
import { setLoginWindowBounds } from '../../util';
import Step1 from './Step1';
import Step2 from './Step2';
import Step3 from './Step3';
import Step4 from './Step4';

class CreatePortfolio extends React.Component {
	componentDidMount() {
		setLoginWindowBounds();
		loginContainer.setActiveView('CreatePortfolioStep1');
	}
	
	render() {
		return (
			<Subscribe to={[createPortfolioContainer]}>
				{() =>{ return (
					<>
						{createPortfolioContainer.state.step === 1 && <Step1 /> }
						{createPortfolioContainer.state.step === 2 && <Step2 /> }
					</>
				)}}
			</Subscribe>
		)
	}
}

export default CreatePortfolio;
