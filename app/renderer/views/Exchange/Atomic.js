import React from 'react';
import roundTo from 'round-to';
import Button from 'components/Button';
import Input from 'components/Input';
import TabButton from 'components/TabButton';
import appContainer from 'containers/App';
import exchangeContainer from 'containers/Exchange';
import Select from 'components/Select';
import CurrencySelectOption from 'components/CurrencySelectOption';
import { translate } from '../../translate';
import SwapIcon from 'icons/Swap';
import './Atomic.scss';
import ExchangeList from './ExchangeList';

const t = translate('exchange');
const exchangeBuyData = [
	{
		fromCurrency: 'BTC',
		fromAmount: "3.2",
		toCurrency: 'LTC',
		toAmount: "0.000000043"
	},
	{
		fromCurrency: 'BTC',
		fromAmount: "3.2",
		toCurrency: 'LTC',
		toAmount: "0.000000043"
	},
	{
		fromCurrency: 'BTC',
		fromAmount: "3.2",
		toCurrency: 'LTC',
		toAmount: "0.000000043"
	},
];

const exchangeSellData = [
	{
		fromCurrency: 'LTC',
		fromAmount: "1000",
		toCurrency: 'BTC',
		toAmount: "0.1"
	},
	{
		fromCurrency: 'LTC',
		fromAmount: "1000",
		toCurrency: 'BTC',
		toAmount: "0.1"
	},
	{
		fromCurrency: 'LTC',
		fromAmount: "1000",
		toCurrency: 'BTC',
		toAmount: "0.1"
	},
]

class Atomic extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			sellAmount: '',
			buyAmount: '',
			exchangeRate: '',
			tabType: 'buy',
			buySymbol: "",
			sellSymbol: "",
			selectedCurrency: null,
		}
	}

	componentDidMount() {
		const {state} = exchangeContainer;
		if (state.baseCurrency && state.quoteCurrency && (state.baseCurrency !== state.quoteCurrency)) {
			const selectedCurrency = this.getSelectedCurrency();
			this.setState({selectedCurrency, sellSymbol: state.baseCurrency, buySymbol: state.quoteCurrency});
		}
	}

	handleSellAmountChange = value => {
		this.setState({ sellAmount: value }, () => {
			this.setState({ buyAmount:  String(roundTo(Number(this.state.sellAmount) * Number(this.state.exchangeRate), 8))})
		});
	}

	handleBuyAmountChange = value => {
		this.setState({ buyAmount: value }, () => {
			if (Number(this.state.exchangeRate) > 0) {
				this.setState({sellAmount: String(roundTo(Number(this.state.buyAmount) / Number(this.state.exchangeRate), 8))});
			}
		});
	}

	handleRateChange = value => {
		this.setState({ exchangeRate: value }, () => {
			this.setState({ buyAmount:  String(roundTo(Number(this.state.sellAmount) * Number(this.state.exchangeRate), 8))})
		});
	}

	handleSelectChange = async (selectedOption, type) => {
		if (type === 'sell') {
			await exchangeContainer.setBaseCurrency(selectedOption.value);
			const selectedCurrency = this.getSelectedCurrency();
			this.setState({selectedCurrency, sellSymbol: selectedOption.value});
		} else {
			exchangeContainer.setQuoteCurrency(selectedOption.value);
			this.setState({buySymbol: selectedOption.value});
		}
	};

	getSelectedCurrency = () => {
		const {state} = exchangeContainer;
		const selectedCurrencySymbol = state.baseCurrency;
		return appContainer.getCurrency(selectedCurrencySymbol);
	};

	changeCurrency = async () => {
		const {sellSymbol, buySymbol} = this.state;
		
		await this.setState({buySymbol: sellSymbol, sellSymbol: buySymbol});
		await exchangeContainer.setBaseCurrency(buySymbol);
		await exchangeContainer.setQuoteCurrency(sellSymbol);
		const selectedCurrency = this.getSelectedCurrency();
		this.setState({ selectedCurrency });
	}

	handleOrder = async () => {
		const {api} = appContainer;
		const {baseCurrency, quoteCurrency} = exchangeContainer.state;
		const price = this.state.exchangeRate;
		const amount = this.state.sellAmount;
		const type = "sell";
		const total = Number(this.state.buyAmount);
		const orderError = error => {
			// eslint-disable-next-line no-new
			new Notification(t('order.failedTrade', {baseCurrency, type}), {body: error});
			exchangeContainer.setIsSendingOrder(false);
			this.setState({hasError: true});
		};

		let requestOpts = {
			type,
			baseCurrency,
			quoteCurrency,
			price: Number(price),
			volume: Number(amount)
		};
		let swap;
		
		if (baseCurrency && quoteCurrency && baseCurrency !== quoteCurrency) {
			exchangeContainer.setIsSendingOrder(true);
			try {
				swap = await api.order(requestOpts);
			} catch (error) {
				console.log('a', error);
				orderError(error);
				return;
			}

			requestOpts.amount = requestOpts.volume;
			requestOpts.total = total;

			const {swapDB} = appContainer;
			await swapDB.insertSwapData(swap, requestOpts);
			exchangeContainer.setIsSendingOrder(false);
		}
	}

	render() {
		const {currencies} = appContainer.state;

		const selectData = currencies.map(currency => ({
			label: `${currency.symbol} ${currency.name}`,
			value: currency.symbol,
		}));
		
		return (
			<div>
				<div className="Atomic">
					<div className="sell-currency">
						<div className="form-group">
							<Input
								className="sell-amount"
								type="text"
								onlyNumeric
								value={this.state.sellAmount}
								onChange={this.handleSellAmountChange}
							/>
						</div>
						<div className="form-group">
							<Select
								className="currency-selector"
								value={this.state.sellSymbol}
								options={selectData}
								valueRenderer={CurrencySelectOption}
								optionRenderer={CurrencySelectOption}
								onChange={option => this.handleSelectChange(option, 'sell')}
							/>
							<h3 className="balance">
								{t('order.symbolBalance')}: <span>{this.state.selectedCurrency ? roundTo(this.state.selectedCurrency.balance, 8) : 0}</span>
							</h3>
						</div>
					</div>
					<div className="swap-currency">
						<button onClick={this.changeCurrency}>
							<SwapIcon />
						</button>
					</div>
					<div className="buy-currency">
						<div className="form-group">
							<Input
								className="buy-amount"
								type="text"
								onlyNumeric
								value={this.state.buyAmount}
								onChange={this.handleBuyAmountChange}
							/>
						</div>
						<div className="form-group">
							<Select
								className="currency-selector"
								value={this.state.buySymbol}
								options={selectData}
								valueRenderer={CurrencySelectOption}
								optionRenderer={CurrencySelectOption}
								onChange={option => this.handleSelectChange(option, 'buy')}
							/>
						</div>
						<div className="form-group">
							<Input
								className="sell-rate"
								type="text"
								placeholder={t('exchange.exchangeRatePlaceholder')}
								onlyNumeric
								value={this.state.exchangeRate}
								onChange={this.handleRateChange}
							/>
						</div>
						<p className="global-rate">{this.state.sellSymbol.toUpperCase()}/{this.state.buySymbol.toUpperCase()} Global market rate: <span>3.215</span></p>
						<p className="global-rate-date">updated 10/11/18, 11:31</p>
						<div className="form-group">
							<Button
								className="exchange-btn"
								fullwidth
								color="blue"
								value={t('exchange.exchangeButton')}
								onClick={this.handleOrder}
							/>
						</div>
					</div>
				</div>
				<div className="exchange-history">
					<nav>
						<TabButton
							isActive={this.state.tabType === 'buy'}
							onClick={() => this.setState({ tabType: 'buy' })}
						>
							{t('exchange.buyTab')}
						</TabButton>
						<TabButton
							isActive={this.state.tabType === 'sell'}
							onClick={() => this.setState({ tabType: 'sell' })}
						>
							{t('exchange.sellTab')}
						</TabButton>
					</nav>
					<main>
						{this.state.tabType === 'buy' && <ExchangeList type="buy" exchangeData={exchangeBuyData} />}
						{this.state.tabType === 'sell' && <ExchangeList type="sell" exchangeData={exchangeSellData} />}
					</main>
				</div>
			</div>
		);
	}
}

export default Atomic;
