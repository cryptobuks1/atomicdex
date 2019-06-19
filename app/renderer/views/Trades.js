import React from 'react';
import PropTypes from 'prop-types';
import {Subscribe} from 'unstated';
import {withState} from 'containers/SuperContainer';
import appContainer from 'containers/App';
import tradesContainer from 'containers/Trades';
import View from 'components/View';
import SwapList from 'components/SwapList';
import SwapFilters from 'components/SwapFilters';
import {formatCurrency} from '../util';
import {translate} from '../translate';
import AppTabView from './TabView';
import TradeHistory  from './TradeHistory';
import './Exchange/Swaps.scss';
import './Trades.scss';

const t = translate('trades');

const TabView = ({component}) => (
	<View component={component} activeView={tradesContainer.state.activeView}/>
);

TabView.propTypes = {
	component: PropTypes.elementType.isRequired,
};

const OpenOrders = () => {
	const {state} = appContainer;
	const filteredData = state.swapHistory.filter(swap => swap.isActive);
	return <SwapList showCancel showHeader swaps={filteredData}/>;
};

// const TradeHistory = () => {
// 	const {state} = appContainer;
// 	const filteredData = state.swapHistory.filter(swap => !swap.isActive);

// 	return (
// 		<SwapFilters swaps={filteredData}>
// 			{swaps => <SwapList showCancel showHeader swaps={swaps}/>}
// 		</SwapFilters>
// 	);
// };

const Trades = props => (
	<Subscribe to={[tradesContainer]}>
		{() => {
			const {state} = props;
			const {stats} = state;

			return (
				<AppTabView title="Trades" className="Trades">
					<main>
						<p className="title">{t('title')}</p>
						<p className="description">{t('description')}</p>
						<TabView component={TradeHistory}/>
					</main>
				</AppTabView>
			);
		}}
	</Subscribe>
);

Trades.propTypes = {
	state: PropTypes.object.isRequired,
};

export default withState(Trades, {}, {
	async componentDidMount() {
		this.setState({
			stats: await appContainer.swapDB.statsSinceLastMonth(),
		});
	},
});
