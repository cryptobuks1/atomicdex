import React from 'react';
import roundTo from 'round-to';
import Modal from 'components/Modal';
import Button from 'components/Button';
import Input from 'components/Input';
import appContainer from 'containers/App';
import CopiedIcon from 'icons/Copied';
import dashboardContainer from 'containers/Dashboard';
import CurrencyIcon from 'components/CurrencyIcon';
import { formatCurrency } from '../../util';
import { getCurrency } from '../../../marketmaker/supported-currencies';
import { translate } from '../../translate';
import './WithdrawModal.scss';

const t = translate('dashboard');
const t_login = translate('login');

const getInitialProps = () => ({
	isOpen: false,
	recipientAddress: '',
	amount: '',
	amountInUsd: '',
	password: '',
	isShowPassword: false,
	isWithdrawing: false,
	isBroadcasting: false,
	txFeeCurrencySymbol: '',
	txFee: 0,
	txFeeUsd: 0,
	broadcast: false,
	isConfirmWithdraw: false,
	confirmCode: '',
	isSuccessWithdraw: false,
});

class WithdrawModal extends React.Component {
	state = getInitialProps();

	constructor(props) {
		super(props);
		this.initialState = this.state;
	}

	open = () => {
		this.setState({isOpen: true});
	};

	close = () => {
		this.setState(getInitialProps());
	};

	withdrawButtonHandler = async () => {
		this.setState({isWithdrawing: true});

		const {symbol} = dashboardContainer.activeCurrency;
		const {recipientAddress: address, amount} = this.state;

		const {txFee, broadcast} = await appContainer.api.withdraw({
			symbol,
			address,
			amount: Number(amount),
		});

		const currency = getCurrency(symbol);
		const txFeeCurrencySymbol = currency.contractAddress ? 'ETH' : symbol;
		const {cmcPriceUsd} = appContainer.getCurrencyPrice(txFeeCurrencySymbol);
		const txFeeUsd = formatCurrency(txFee * cmcPriceUsd);

		this.setState({txFeeCurrencySymbol, txFee, txFeeUsd, broadcast});
	};

	confirmButtonHandler = async () => {
		this.setState({isBroadcasting: true});
		const {txid, amount, symbol, address} = await this.state.broadcast();
		console.log({txid, amount, symbol, address});

		// TODO: The notification should be clickable and open a block explorer for the currency.
		// We'll need to have a list of block explorers for each currency.
		// eslint-disable-next-line no-new
		new Notification(t('withdraw.successTitle'), {
			body: t('withdraw.successDescription', {address, amount, symbol}),
		});

		this.close();
	};

	showPassword = () => {
		const isShowPassword = this.state.isShowPassword;
		this.setState({ isShowPassword: !isShowPassword });
	}

	render() {
		// const currencyInfo = dashboardContainer.activeCurrency;
		const { currencyInfo } = this.props;
		const maxAmount = currencyInfo.balance;
		const remainingBalance = roundTo(maxAmount - (Number(this.state.amount) + this.state.txFee), 8);

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
					{!this.state.isConfirmWithdraw && (
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
									showpassword={this.showPassword}
									suffixString="SHOW"
								/>
							</div>

							<div className="withdraw-fee">
								<span>Withdrawal Fee:</span>
								<span>0.00002</span>
							</div>
							<div className="withdraw-total">
								<span>Total:</span>
								<span>3.214998</span>
							</div>

							{/* {this.state.broadcast ? (
							<Button
								className="confirm-button"
								color="transparent"
								value={t('withdraw.confirmNetworkFee')}
								disabled={this.state.isBroadcasting}
								onClick={this.confirmButtonHandler}
							/>
						) : (
								<Button
									className="withdraw-button"
									color="transparent"
									value={t('withdraw.label')}
									disabled={
										!this.state.recipientAddress ||
										!this.state.amount ||
										remainingBalance < 0 ||
										this.state.isWithdrawing
									}
									onClick={this.withdrawButtonHandler}
								/>
							)} */}
							<div className="section--withdraw--btn">
								<Button className="cancel-btn" color="transparent" value="Cancel" onClick={() => this.close()} />
								<Button className="continue-btn" color="blue" value="Continue" onClick={() => this.setState({isConfirmWithdraw: true})} />
							</div>
						</>)
					}
					{this.state.isConfirmWithdraw && !this.state.isSuccessWithdraw && (
						<>
							<p className="confirm-title">
								{t('confirmWithdraw')}
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
								<Button className="cancel-btn" color="transparent" value="Cancel" onClick={() => this.setState({isConfirmWithdraw: false})} />
								<Button className="continue-btn" color="blue" value="Submit" onClick={() => this.setState({isSuccessWithdraw: true})} />
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
