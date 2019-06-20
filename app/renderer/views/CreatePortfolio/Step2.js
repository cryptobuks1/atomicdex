import React from 'react';
import {Trans} from 'react-i18next';
import Button from 'components/Button';
import SeedPhrase from 'components/SeedPhrase';
import container from 'containers/CreatePortfolio';
import {instance, translate} from '../../translate';
import LoggingIn from '../LoggingIn';
import './CreatePortfolio.scss';

const t = translate(['portfolio']);

const CreatePortfolioStep2 = () => {
	// TODO(sindresorhus): Fill in the link to security best practices
	const {state} = container;

	return (
		<div className="CreatePortfolio">
			{state.isCreatingPortfolio && <LoggingIn />}
			<h1>{t('create.seedPhrase')}</h1>
			<div className="form-group" style={{marginTop: '20px'}}>
				<SeedPhrase
					value={state.generatedSeedPhrase}
					onReload={() => {
						container.generateSeedPhrase();
					}}
				/>
				<Trans i18n={instance} t={t}>
					<p className="warning-text">{t('create.warning')}</p>					
				</Trans>
			</div>
			<div className="form-group">
				<Button
					className="save-code-btn"
					value={t('create.saveCode')}
					color="blue"
					onClick={container.handleStep2ClickNext}
				/>
			</div>
		</div>
	);
};

export default CreatePortfolioStep2;
