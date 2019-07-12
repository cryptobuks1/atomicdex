import React from 'react';
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
		return (
			<div className="trade-list">
				{
					tradeData.map((item, index) => {
						return (
							<div className="item" key={index} >
								<div className="item-from">
									<div className="left">
										<CurrencyIcon symbol={item.fromCurrency} size="24" />
									</div>
									<div className="right">
										<p className="amount">{item.fromAmount}</p>
										<p className="currency">
											{item.fromCurrency}
											&nbsp;{getCurrencyName(item.fromCurrency)}
										</p>
									</div>
								</div>
								<div className="item-to">
									<NextArrow />
									<div className="left">
										<CurrencyIcon symbol={item.toCurrency} size="24" />
									</div>
									<div className="right">
										<p className="amount">{item.toAmount}</p>
										<p className="currency">
											{item.toCurrency}
											&nbsp;{getCurrencyName(item.toCurrency)}
										</p>
									</div>
								</div>
								<div className="item-status">
                                    <div className="trade-date">
                                        {item.date}
                                    </div>
                                    <div className={`trade-status ${item.status === 1 ? 'success' : 'fail'}`}>
                                        {item.status === 1 && <div><Success /><span>SUCCESSFUL</span></div>}
                                        {item.status === 0 && <div><Fail /><span>NO MATCH</span></div>}
                                    </div>
								</div>
							</div>
						)
					})
				}
			</div>
		);
	}
}

export default TradeHistory;
