import React from 'react';
import {translate} from '../../translate';
import exchangeContainer from 'containers/Exchange';
import './ExchangeList.scss';
import NextArrow from 'icons/NextArrow';

const t = translate('exchange');
const getOrderBook = type => {
    return exchangeContainer.state.orderBook[type === 'buy' ? 'asks' : 'bids'];
};

class ExchangeList extends React.Component {
    
	render() {
        const { type } = this.props;
        const { baseCurrency, quoteCurrency } = exchangeContainer.state;
        const orderBook = getOrderBook(type);
		return (
			<div className="exchange-list">
                {
                    orderBook.map((item, index) => {
                        return (
                            <div className="item" key={index} >
                                <div className="item-from">
                                    <p>
                                        <strong>{ type === 'sell' ? baseCurrency : quoteCurrency }</strong>&nbsp;
                                        { type === 'sell' ? item.maxVolume / item.price : item.maxVolume }
                                    </p>
                                </div>
                                <div className="item-to">
                                    <p>
                                        <strong>{ type === 'sell' ? quoteCurrency : baseCurrency }</strong>&nbsp;
                                        { type === 'sell' ? item.maxVolume : item.maxVolume / item.price }
                                    </p>
                                </div>
                                <div className="item-icon">
                                    <NextArrow />
                                </div>
                            </div>
                        )
                    })
                }
            </div>
		);
	}
}

export default ExchangeList;
