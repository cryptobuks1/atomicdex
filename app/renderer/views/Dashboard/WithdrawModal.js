import React from 'react';
import {remote} from 'electron';
import roundTo from 'round-to';
import Modal from 'components/Modal';
import Button from 'components/Button';
import Input from 'components/Input';
import appContainer from 'containers/App';
import CopiedIcon from 'icons/Copied';
import dashboardContainer from 'containers/Dashboard';
import loginContainer from 'containers/Login';
import CurrencyIcon from 'components/CurrencyIcon';
import {formatCurrency} from '../../util';
import {getCurrency} from '../../../marketmaker/supported-currencies';
import {translate} from '../../translate';
import './WithdrawModal.scss';

const {decryptSeedPhrase} = remote.require('./portfolio-util');

const t = translate('dashboard');
const t_login = translate('login');

const getInitialState = () => ({
	isOpen: false,
	recipientAddress: '',
	amount: '',
	amountInUsd: '',
	password: '',
	isShowPassword: false,
	passwordError: null,
	isWithdrawing: false,
	isBroadcasting: false,
	symbol: '',
	address: '',
	txFeeCurrencySymbol: '',
	txFee: 0,
	txFeeUsd: 0,
	txHex: '',
	broadcast: false,
	confirmCode: '',
	isSuccessWithdraw: false,
});

class WithdrawModal extends React.Component {
	state = getInitialState();

	constructor(props) {
		super(props);
		this.initialState = this.state;
	}

	open = () => {
		this.resetState();
		this.setState({isOpen: true});
	};

	close = () => {
		this.resetState();
	};

	resetState = () => {
		this.setState(getInitialState());
	};

	cancelWithdraw = () => {
		this.setState({ isWithdrawing: false, broadcast: false });
	}

	withdrawButtonHandler = async () => {
		const { selectedPortfolio } = loginContainer;
		try {
			const seedPhrase = await decryptSeedPhrase(selectedPortfolio.encryptedSeedPhrase, this.state.password);
			if (seedPhrase) {
				this.setState({
					passwordError: '',
				});
			}
		} catch	(error) {
			this.setState({
				passwordError: 'password is not correct',
			});
		}
		
		if (this.state.passwordError === '') {
			this.setState({isWithdrawing: true});

			const {symbol} = dashboardContainer.activeCurrency;
			const {recipientAddress: address, amount} = this.state;
			const {
				fee_details: feeDetails,
				tx_hex: txHex,
			} = await appContainer.api.withdraw({
				symbol,
				address,
				amount: Number(amount),
				// TODO: Support `max` option
				max: false,
			});

			const txFee = 'amount' in feeDetails ? feeDetails.amount : feeDetails.total_fee;

			const currency = getCurrency(symbol);
			const txFeeCurrencySymbol = currency.contractAddress ? 'ETH' : symbol;
			const {cmcPriceUsd} = appContainer.getCurrencyPrice(txFeeCurrencySymbol);
			const txFeeUsd = formatCurrency(txFee * cmcPriceUsd);

			// TODO: For ETH-based currencies, show the gas amount and gas price.

			this.setState({symbol, address, txFeeCurrencySymbol, txFee, txFeeUsd, txHex});
		}
	};

	confirmButtonHandler = async () => {
		this.setState({isSuccessWithdraw: true, isBroadcasting: true});
		const {symbol, address, amount, txFee, txFeeUsd, txHex} = this.state;
		console.log('Raw transaction details', {symbol, address, amount, txFee, txFeeUsd, txHex});

		const broadcastTxHash = await appContainer.api.sendRawTransaction({symbol, txHex});

		// TODO: Show the user the broadcast tx hash
		console.log('Broadcast TX hash', broadcastTxHash);

		// TODO: The notification should be clickable and open a block explorer for the currency.
		// We'll need to have a list of block explorers for each currency.
		// eslint-disable-next-line no-new
		new Notification(t('withdraw.successTitle'), {
			body: t('withdraw.successDescription', {address, amount, symbol}),
		});
	};

	showPassword = () => {
		const isShowPassword = this.state.isShowPassword;
		this.setState({ isShowPassword: !isShowPassword });
	}

	render() {
		// const currencyInfo = dashboardContainer.activeCurrency;
		const { currencyInfo } = this.props;
		const maxAmount = currencyInfo.balance;
		const remainingBalance = roundTo(maxAmount - (Number(this.state.amount) + (this.state.txFee || 0)), 8);
		
		const setAmount = value => {
			this.setState({
				amount: String(value),
				amountInUsd: String(Number.parseFloat(value || '0') * currencyInfo.cmcPriceUsd),
			});
		};

		const setConfirmCode = value => {
			this.setState({
				confirmCode: value
			})
		}

		return (
			<div className="modal-wrapper">
				<Modal
					className="WithdrawModal"
					title={t('withdraw.title')}
					open={this.state.isOpen}
					onClose={this.close}
				>
					{!this.state.isWithdrawing && (
						<>
							<p className="symbol-name">
								{t('withdraw.symbolName', { symbol: currencyInfo.symbol })}
							</p>
							<p className="balance">{t('withdraw.balance')}<span>{currencyInfo.balance}</span></p>
							<div className="section">
								<p>
									{/* TODO: Remove this when #302 is fixed */}
									{/* <small>{'Note: HyperDEX doesn\'t yet calculate the TX fee, so you can\'t withdraw the whole balance. Try withdrawing slightly less.'}</small> */}
								</p>
								<label>{t('withdraw.amountLabel')}</label>
								<Input
									required
									onlyNumeric
									value={this.state.amount}
									fractionalDigits={8}
									disabled={this.state.isWithdrawing}
									placeholder={t('withdraw.amountPlaceholder')}
									onChange={value => {
										setAmount(value);
									}}
								/>
							</div>
							<div className="section">
								<label>{t('withdraw.recipientLabel')}</label>
								<Input
									required
									value={this.state.recipientAddress}
									placeholder={t('withdraw.recipientPlaceholder')}
									disabled={this.state.isWithdrawing}
									onChange={value => {
										this.setState({ recipientAddress: value });
									}}
								/>
							</div>
							<div className="section">
								<label>{t_login('password')}</label>
								<Input
									className="user-password"
									type={this.state.isShowPassword ? 'text' : 'password'}
									placeholder={t_login('passwordPlaceHolder')}
									value={this.state.password}
									showPassword={this.showPassword}
									suffixString="SHOW"
									onChange={value => {
										this.setState({ password: value });
									}}
								/>
							</div>

							<div className="withdraw-fee">
								<span>Withdrawal Fee:</span>
								<span>0.00002</span>
							</div>
							<div className="withdraw-total">
								<span>Total:</span>
								<span>{remainingBalance}</span>
							</div>
							{this.state.passwordError && <p className="error-msg">{this.state.passwordError}</p>}
							<div className="section--withdraw--btn">
								<Button className="cancel-btn" color="transparent" value="Cancel" onClick={() => this.close()} />
								{!this.state.broadcast &&
									<Button
										className="continue-btn"
										color="blue"
										value="Continue"
										disabled={
											!this.state.recipientAddress ||
											!this.state.amount ||
											remainingBalance < 0 ||
											this.state.isWithdrawing
										}
										onClick={this.withdrawButtonHandler}
									/>
								}
							</div>
						</>)
					}
					{this.state.isWithdrawing && !this.state.isSuccessWithdraw && (
						<>
							<p className="confirm-title">
								{t('withdraw.confirm')}
							</p>
							<p className="confirm-description">{t('withdraw.confirmDescription')}</p>
							<div className="section">
								<Input
									required
									onlyNumeric
									value={this.state.confirmCode}
									placeholder={t('withdraw.confirmCode')}
									onChange={value => {
										setConfirmCode(value);
									}}
								/>
							</div>
							<p className="resend-code">
								{t('withdraw.confirmCodeQuiz')}<span>{t('withdraw.confirmCodeResend')}</span>
							</p>
							<div className="section--withdraw--btn">
								<Button className="cancel-btn" color="transparent" value="Cancel" onClick={() => this.cancelWithdraw()} />
								{this.state.broadcast &&
									<Button
									className="continue-btn"
									color="blue"
									value="Submit"
									disabled={this.state.isBroadcasting}
									onClick={this.confirmButtonHandler}
									/>
								}
							</div>
						</>)						
					}
					{this.state.isSuccessWithdraw && (
						<>
							<div className="currency-icon">
								<CurrencyIcon symbol={currencyInfo.symbol} size="38"/>
								<div className="copied-icon"><CopiedIcon/></div>
								<p className="currency-name"><strong>{currencyInfo.symbol}</strong>{currencyInfo.name}</p>
							</div>
							<p className="withdraw-success">{t('withdraw.confirmWithdrawSuccess')}</p>
							<div className="withdraw--modal-close-btn">
								<Button className="close-btn" color="blue" value="Close" onClick={() => this.close()} />
							</div>
						</>)
					}
				</Modal>
				<Button
					className="OpenModalButton"
					value={t('withdraw.label')}
					color="transparent"
					// disabled={!currencyInfo.balance}
					onClick={this.open}
				/>
			</div>
		);
	}
}

export default WithdrawModal;
