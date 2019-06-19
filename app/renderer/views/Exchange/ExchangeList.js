import React from 'react';
import {translate} from '../../translate';
import './ExchangeList.scss';
import NextArrow from 'icons/NextArrow';

const t = translate('exchange');

class ExchangeList extends React.Component {
	render() {
        const {type, exchangeData} = this.props;
		return (
			<div className="exchange-list">
                {
                    exchangeData.map((item, index) => {
                        return (
                            <div className="item" key={index} >
                                <div className="item-from">
                                    <p><strong>{item.fromCurrency}</strong>&nbsp;{item.fromAmount}</p>
                                </div>
                                <div className="item-to">
                                    <p><strong>{item.toCurrency}</strong>&nbsp;{item.toAmount}</p>
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
