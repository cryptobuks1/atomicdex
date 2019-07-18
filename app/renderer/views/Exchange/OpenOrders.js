import React from 'react';
import appContainer from 'containers/App';
import CurrencyIcon from 'components/CurrencyIcon';
import { translate } from '../../translate';
import './OpenOrders.scss';
import NextArrow from 'icons/NextArrow';
import Oval from 'icons/Oval';
import {getCurrencyName} from '../../../marketmaker/supported-currencies';

const t = translate('exchange');

const getOpenOrders = () => appContainer.state.swapHistory.filter(swap => swap.isActive);

class OpenOrders extends React.Component {

	render() {
		const openOrders = getOpenOrders();
		return (
			<div className="order-list">
				{
					openOrders.map((item, index) => {
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
