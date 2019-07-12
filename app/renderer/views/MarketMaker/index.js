import React from 'react';
import _ from 'lodash';
import {Subscribe} from 'unstated';
import appContainer from 'containers/App';
import TabView from '../TabView';
import './MarketMaker.scss';
import MarketList from './MarketList';

class MarketMaker extends React.Component {
	render() {
		return (
			<Subscribe to={[appContainer]}>
				{() => (
					<TabView className="MarketMaker">
						<header>
							<p className="title">Market Maker</p>
							<p className="description">With our market maker tool you can create liquidity in the market</p>
						</header>
						<main>
							<div className="section">
								<MarketList />
							</div>
						</main>
					</TabView>
				)}
			</Subscribe>
		);
	}
}

export default MarketMaker;
