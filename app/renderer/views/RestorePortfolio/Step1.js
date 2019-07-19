import React from 'react';
import appContainer from 'containers/App';
import Button from 'components/Button';
import TextArea from 'components/TextArea';
import LoginBackButton from 'components/LoginBackButton';
import BackTextButton from 'components/BackTextButton';
import container from 'containers/RestorePortfolio';
import Toolbar from '../Toolbar/Toolbar';
import {translate} from '../../translate';
import './RestorePortfolio.scss';

const t = translate('portfolio');

const RestorePortfolioStep1 = () => {
	const {state} = container;

	return (
		<div className="RestorePortfolio">
			<Toolbar />
			<BackTextButton
				onClick={() => {
					appContainer.setActiveView('Home');
				}}
			/>
			<p className="restore-title">{t('restore.enterSeedPhrase')}</p>
			<form onSubmit={container.handleStep1Submit}>
				<div className="form-group">
					<TextArea
						required
						autoFocus
						preventNewlines
						value={state.seedPhrase}
						placeholder={t('restore.exampleSeedPhrase', {seedPhrase: 'advanced generous profound'})}
						style={{padding: '15px'}}
						onChange={container.handleSeedPhraseInputChange}
					/>
				</div>
				<div className="form-group">
					<Button
						className="seed-btn"
						type="submit"
						value={t('restore.confirm')}
						disabled={!state.seedPhrase}
						color="blue"
					/>
				</div>
			</form>
		</div>
	);
};

export default RestorePortfolioStep1;
