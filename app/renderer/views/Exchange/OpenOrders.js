import React from 'react';
import appContainer from 'containers/App';
import CurrencyIcon from 'components/CurrencyIcon';
import { translate } from '../../translate';
import './OpenOrders.scss';
import NextArrow from 'icons/NextArrow';
import Oval from 'icons/Oval';

const t = translate('exchange');

const orderData = [
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

const getOpenOrders = () => appContainer.state.swapHistory.filter(swap => swap.isActive);

class OpenOrders extends React.Component {
	render() {
		const openOrders = getOpenOrders();

		return (
			<div className="order-list">
				{
					orderData.map((item, index) => {
						return (
							<div className="item" key={index} >
								<div className="item-from">
									<div className="left">
										<CurrencyIcon symbol={item.fromCurrency} size="24" />
									</div>
									<div className="right">
										<p className="amount"><strong>{item.fromAmount}</strong></p>
										<p className="currency">{item.fromCurrency}</p>
									</div>
								</div>
								<div className="item-to">
									<NextArrow />
									<div className="left">
										<CurrencyIcon symbol={item.fromCurrency} size="24" />
									</div>
									<div className="right">
										<p className="amount"><strong>{item.fromAmount}</strong></p>
										<p className="currency">{item.fromCurrency}</p>
									</div>
								</div>
								<div className="item-status">
									<Oval />
									<span>Transaction</span>
								</div>
							</div>
						)
					})
				}
			</div>
		);
	}
}

export default OpenOrders;
