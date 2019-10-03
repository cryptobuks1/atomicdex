import {remote} from 'electron';
import {Container} from 'unstated';
import {translate} from '../translate';
import loginContainer from './Login';

const {getPortfolios, changePortfolioPassword} = remote.require('./portfolio-util');
const t = translate('portfolio');

class RestorePortfolioContainer extends Container {
	state = {
		seedPhrase: '',
		portfolioName: '',
		portfolioPassword: '',
		confirmedPassword: '',
		confirmedPasswordError: null,
		portfolioNameError: null,
		isCreatingPortfolio: false,
		step: 1,
	};

	backStep = step => {
		this.setState({ step });
	}

	handleSeedPhraseInputChange = value => {
		this.setState({seedPhrase: value});
	};

	handleStep1Submit = event => {
		event.preventDefault();

		if (!this.state.seedPhrase) {
			return;
		}

		this.setState({step: 2});
		// loginContainer.setActiveView('RestorePortfolioStep2');
		// loginContainer.setProgress(0.66);
	};

	handlePortfolioNameInputChange = value => {
		this.setState({portfolioName: value});
	};

	handlePortfolioPasswordInputChange = value => {
		this.setState({portfolioPassword: value});
	};

	handleConfirmPasswordInputChange = value => {
		this.setState({confirmedPassword: value});
	};

	handleStep2Submit = async event => {
		event.preventDefault();

		if (this.state.portfolioPassword !== this.state.confirmedPassword) {
			this.setState({
				confirmedPassword: '',
				confirmedPasswordError: t('restore.confirmPasswordNoMatch'),
			});
			this.confirmPasswordInput.focus();
			return;
		}

		this.setState({confirmedPasswordError: null});
		await this.setState({isCreatingPortfolio: true});
		
		const portfolios = await getPortfolios();
		const currentPortfolio = portfolios.filter(portfolio => {
			return portfolio && portfolio.name === this.state.portfolioName;
		});

		if (currentPortfolio.length === 0) {
			usernameError
			this.setState({
				portfolioName: '',
				portfolioNameError: t('restore.confirmPasswordNoMatch'),
			});
			return;
		}

		await changePortfolioPassword({
			id: currentPortfolio[0].id,
			seedPhrase: this.state.seedPhrase,
			newPassword: this.state.portfolioPassword,
		});

		// const portfolioId = await createPortfolio({
		// 	name: this.state.portfolioName,
		// 	password: this.state.portfolioPassword,
		// 	seedPhrase: this.state.seedPhrase,
		// });

		// loginContainer.setActiveView('RestorePortfolioStep3');
		// loginContainer.setProgress(1);

		await loginContainer.loadPortfolios();
		await loginContainer.handleLogin(currentPortfolio[0].id, this.state.portfolioPassword);
	};
}

const restorePortfolioContainer = new RestorePortfolioContainer();

export default restorePortfolioContainer;
