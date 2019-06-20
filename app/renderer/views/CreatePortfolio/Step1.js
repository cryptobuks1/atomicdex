import React from 'react';
import appContainer from 'containers/App';
import Button from 'components/Button';
import Input from 'components/Input';
import BackTextButton from 'components/BackTextButton';
import container from 'containers/CreatePortfolio';
import {translate} from '../../translate';
import './CreatePortfolio.scss';

const t = translate('portfolio');

const Step1 = () => {
	const {state} = container;

	return (
		<div className="CreatePortfolio">
			<BackTextButton
				onClick={() => {
					appContainer.setActiveView('Home');
				}}
			/>
			<p className="signup-title">{t('create.title')}</p>
			<form style={{marginTop: '20px'}} onSubmit={container.handleStep1Submit}>
				<div className="form-group">
					<Input
						type="email"
						className="user-email"
						autoFocus
						required
						placeholder={t('create.email')}
						value={state.portfolioEmail}
						maxLength="50"
						onChange={container.handlePortfolioEmailInputChange}
					/>
				</div>
				<div className="form-group">
					<Input
						className="user-name"
						autoFocus
						required
						placeholder={t('create.name')}
						value={state.portfolioName}
						maxLength="50"
						onChange={container.handlePortfolioNameInputChange}
					/>
				</div>
				<div className="form-group">
					<Input
						className="user-password"
						required
						type="password"
						placeholder={t('create.password')}
						value={state.portfolioPassword}
						onChange={container.handlePortfolioPasswordInputChange}
					/>
				</div>
				<div className="form-group">
					<Input
						className="user-confirmpassword"
						ref={input => {
							container.confirmPasswordInput = input;
						}}
						required
						type="password"
						placeholder={t('create.confirmPassword')}
						value={state.confirmedPassword}
						errorMessage={state.confirmedPasswordError}
						onChange={container.handleConfirmPasswordInputChange}
					/>
				</div>
				<div className="form-group">
					<Button
						className="signup-btn"
						type="submit"
						value={t('create.next')}
						disabled={!(state.portfolioName && state.portfolioPassword && state.confirmedPassword)}
						color="blue"
						style={{
							marginTop: '15px',
						}}
					/>
				</div>
			</form>
		</div>
	);
};

export default Step1;
