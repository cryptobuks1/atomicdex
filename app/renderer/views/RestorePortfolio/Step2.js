import React from 'react';
import appContainer from 'containers/App';
import Button from 'components/Button';
import Input from 'components/Input';
import BackTextButton from 'components/BackTextButton';
import LoginBackButton from 'components/LoginBackButton';
import container from 'containers/RestorePortfolio';
import {translate} from '../../translate';
import LoggingIn from '../LoggingIn';
import Toolbar from '../Toolbar/Toolbar';

const t = translate('portfolio');

const RestorePortfolioStep2 = () => {
	const {state} = container;

	return (
		<div className="RestorePortfolio">
			<Toolbar />
			<BackTextButton
				onClick={() => {
					container.backStep(1);
				}}
			/>
			{state.isCreatingPortfolio && <LoggingIn />}
			<h1>{t('create.title')}</h1>
			<form  onSubmit={container.handleStep2Submit}>
				<div className="form-group">
					<Input
						className="user-name"
						autoFocus
						required
						placeholder={t('create.name')}
						value={state.portfolioName}
						maxLength="50"
						errorMessage={state.portfolioNameError}
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
						className="restore-btn"
						type="submit"
						value={t('restore.reset')}
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

export default RestorePortfolioStep2;
