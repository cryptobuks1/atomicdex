import {hot} from 'react-hot-loader';
import React from 'react';
import {Subscribe} from 'unstated';
import '../styles/index.scss';
import appContainer from 'containers/App';
import AppView from 'components/AppView';
import Home from './Home';
import CreatePortfolio from './CreatePortfolio';
import RestorePortfolio from './RestorePortfolio';
import Login from './Login';
import AppSettings from './AppSettings';
import Dashboard from './Dashboard';
// import Swap from './Swap';
import Exchange from './Exchange';
import Trades from './Trades';
import Settings from './Settings';
import MarketMaker from './MarketMaker';
import ComponentsPreview from './ComponentsPreview';

const App = () => (
	<Subscribe to={[appContainer]}>
		{() => (
			<>
				<AppView component={Home}/>
				<AppView component={CreatePortfolio}/>
				<AppView component={RestorePortfolio}/>
				<AppView component={Login}/>
				<AppView component={AppSettings}/>
				<AppView component={Dashboard}/>
				{/* <AppView component={Swap}/> */}
				<AppView component={Exchange}/>
				<AppView component={Trades}/>
				<AppView component={MarketMaker}/>
				<AppView component={Settings}/>
				<AppView component={ComponentsPreview}/>
			</>
		)}
	</Subscribe>
);

export default hot(module)(App);
