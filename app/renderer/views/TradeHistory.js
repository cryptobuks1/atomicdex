import React from 'react';
import appContainer from 'containers/App';
import CurrencyIcon from 'components/CurrencyIcon';
import './TradeHistory.scss';
import NextArrow from 'icons/NextArrow';
import Success from 'icons/Success';
import Fail from 'icons/Fail';
import {getCurrencyName} from '../../marketmaker/supported-currencies';

const tradeData = [
	{
		fromCurrency: 'BTC',
		fromAmount: "3.2",
		toCurrency: 'LTC',
        toAmount: "0.000000043",
        date: '20 Oct 2018, 22:00',
        status: 1
	},
	{
		fromCurrency: 'BTC',
		fromAmount: "3.2",
		toCurrency: 'LTC',
        toAmount: "0.000000043",
        date: '20 Oct 2018, 22:00',
        status: 0
	},
	{
		fromCurrency: 'BTC',
		fromAmount: "3.2",
		toCurrency: 'LTC',
        toAmount: "0.000000043",
        date: '20 Oct 2018, 22:00',
        status: 0
	},
];

class TradeHistory extends React.Component {
	render() {
		const { swapHistory } = appContainer.state;
		console.log('swapHistory', swapHistory);
		return (
			<div className="trade-list">
				{
					swapHistory.map((item, index) => {
						if (item.uuid) {
							return (
								<div className="item" key={index} >
									<div className="item-from">
										<div className="left">
											<CurrencyIcon symbol={item.baseCurrency} size="24" />
										</div>
										<div className="right">
											<p className="amount">{item.baseCurrencyAmount}</p>
											<p className="currency">
												{item.baseCurrency}
												&nbsp;{getCurrencyName(item.baseCurrency)}
											</p>
										</div>
									</div>
									<div className="item-to">
										<NextArrow />
										<div className="left">
											<CurrencyIcon symbol={item.quoteCurrency} size="24" />
										</div>
										<div className="right">
											<p className="amount">{item.quoteCurrencyAmount}</p>
											<p className="currency">
												{item.quoteCurrency}
												&nbsp;{getCurrencyName(item.quoteCurrency)}
											</p>
										</div>
									</div>
									<div className="item-status">
										<div className="trade-date">
											{item.timeStarted}
										</div>
										<div className={`trade-status ${item.status === 'completed' ? 'success' : 'fail'}`}>
											{item.status === 'completed' && <div><Success /><span>{item.status}</span></div>}
											{item.status !== 'completed' && <div><Fail /><span>{item.status}</span></div>}
										</div>
									</div>
								</div>
							)
						} else {
							return null;
						}
					})
				}
			</div>
		);
	}
}

export default TradeHistory;
