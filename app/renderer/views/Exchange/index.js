import React from 'react';
import { Subscribe } from 'unstated';
import exchangeContainer from 'containers/Exchange';
import TabView from 'views/TabView';
import Order from './Order';
import Atomic from './Atomic';
import OpenOrders from './OpenOrders';
import View from 'components/View';
import TabButton from 'components/TabButton';
import './Exchange.scss';
import {translate} from '../../translate';
const t = translate('exchange');

const TabLayout = ({component}) => (
	<View component={component} activeView={exchangeContainer.state.activeSwapsView}/>
);

// const CurrentPairOpenOrders = () => {
// 	const {state} = exchangeContainer;

// 	const filteredData = getOpenOrders().filter(swap =>
// 		swap.baseCurrency === state.baseCurrency &&
// 		swap.quoteCurrency === state.quoteCurrency
// 	);

// 	return (
// 		<SwapList showCancel swaps={filteredData}/>
// 	);
// };

const Exchange = () => {
	exchangeContainer.watchOrderBook();
	return (
		<Subscribe to={[exchangeContainer]}>
			{container => (
				<>
					{/* <Intro/> */}
					<TabView className="Exchange">
						{/* <Order type="buy"/>
						<Order type="sell"/> */}
						{/* <Chart/> */}
						{/* <Swaps/> */}
						<p className="title">{t('exchange.title')}</p>
						<header>
							<nav>
								<TabButton
									isActive={container.state.activeSwapsView === Atomic.name}
									onClick={() => exchangeContainer.setActiveSwapsView(Atomic.name)}
								>
									{t('exchange.exchangeTab')}
								</TabButton>
								<TabButton
									isActive={container.state.activeSwapsView === OpenOrders.name}
									onClick={() => exchangeContainer.setActiveSwapsView(OpenOrders.name)}
								>
									{t('exchange.openorderTab')}
								</TabButton>
							</nav>
						</header>
						<main>
							<TabLayout component={Atomic}/>
							<TabLayout component={OpenOrders}/>
						</main>
					</TabView>

				</>
			)}
		</Subscribe>
	);
};

export default Exchange;
