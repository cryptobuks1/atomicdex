import unhandled from 'electron-unhandled';
import React from 'react';
import { CircularProgressbar, buildStyles  } from 'react-circular-progressbar';
import appContainer from 'containers/App';
import tradesContainer from 'containers/Trades';
import CurrencyIcon from 'components/CurrencyIcon';
import { translate } from '../../translate';
import './OpenOrders.scss';
import NextArrow from 'icons/NextArrow';
import Oval from 'icons/Oval';
import {getCurrencyName} from '../../../marketmaker/supported-currencies';
import Fail from 'icons/Fail';

const t = translate('exchange');

const getOpenOrders = () => appContainer.state.swapHistory.filter(swap => swap.isActive);

class OpenOrders extends React.Component {
	cancelSwap = async swapUuid => {
		await tradesContainer.setIsSwapCancelling(swapUuid, true);
		this.forceUpdate();

		try {
			await appContainer.api.cancelOrder(swapUuid);
		} catch (error) {
			unhandled.logError(error);
		}
	};

	render() {
		const openOrders = getOpenOrders();
		console.log('openOrder', openOrders);
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
									<CircularProgressbar
										value={item.progress}
										maxValue={1}
										styles={{
											// Customize the root svg element
											root: {},
											// Customize the path, i.e. the "completed progress"
											path: {
												// Path color
												stroke: `rgba(62, 152, 199, 1)`,
												// Whether to use rounded or flat corners on the ends - can use 'butt' or 'round'
												strokeLinecap: 'butt',
												// Customize transition animation
												transition: 'stroke-dashoffset 0.5s ease 0s',
												// Rotate the path
												transform: 'rotate(0.25turn)',
												transformOrigin: 'center center',
											},
											// Customize the circle behind the path, i.e. the "total progress"
											trail: {
												// Trail color
												stroke: '#d6d6d6',
												// Whether to use rounded or flat corners on the ends - can use 'butt' or 'round'
												strokeLinecap: 'butt',
												// Rotate the trail
												transform: 'rotate(0.25turn)',
												transformOrigin: 'center center',
											},
											// Customize the text
											text: {
												// Text color
												fill: '#f88',
												// Text size
												fontSize: '16px',
											},
											// Customize background - only used when the `background` prop is true
											background: {
												fill: '#3e98c7',
											},
										}}
										/>
									<span>Transaction</span>
								</div>
								<div className="item-cancel">
								 { 
									(item.status === 'pending' || !tradesContainer.state.isSwapCancelling[item.uuid]) &&
									<Fail onClick={event => {
										event.stopPropagation();
										this.cancelSwap(item.uuid);
									}}/>
								}
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
