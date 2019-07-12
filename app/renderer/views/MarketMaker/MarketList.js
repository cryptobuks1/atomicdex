import React from 'react';
import CurrencyIcon from 'components/CurrencyIcon';
import Input from 'components/Input';
import Button from 'components/Button';

const marketData = [
    [
        {
            pairA: 'BTC',
            pairB: 'LTC',
            balance: 0.5463,
            amount: 0.01,
            offerPrice: 0.00032112,
            margin: '2',
            broadcastOffer: 0.0003333343,
            updateSec: '30',
            type: 'start',
        },
        {
            pairA: 'BTC',
            pairB: 'LTC',
            balance: 0.5463,
            amount: 0.01,
            offerPrice: 0.00032112,
            margin: '2',
            broadcastOffer: 0.0003333343,
            updateSec: '30',
            type: 'stop',
        }
    ],
    [
        {
            pairA: 'BTC',
            pairB: 'LTC',
            balance: 0.5463,
            amount: 0.01,
            offerPrice: 0.00032112,
            margin: '2',
            broadcastOffer: 0.0003333343,
            updateSec: '30',
            type: 'start',
        },
    ],
]

class MarketList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            margin: '',
            updateSec: '',
            marketData: null,
        }
    }

    componentWillMount() {
        this.setState({marketData});
    }

    handleMarginInputChange = (value, index1, index2) => {
    };
    
    handleUpdateSecInputChange = (value, index1, index2) => {
    }

    render() {
        return (
            <div className="MarketList">
                <div className="head">
                    <div style={{ width: '10%' }}>PAIR</div>
                    <div style={{ width: '10%' }}>BALANCE</div>
                    <div style={{ width: '10%' }}>AMOUNT</div>
                    <div style={{ width: '20%' }}>OFFER PRICE</div>
                    <div style={{ width: '10%' }}>MARGIN</div>
                    <div style={{ width: '20%' }}>BROADCAST OFFER</div>
                    <div style={{ width: '10%' }}>UPDATE (SEC)</div>
                    <div style={{ width: '10%' }}></div>
                </div>
                <div className="list">
                    {
                        this.state.marketData && this.state.marketData.map((items, index1) => {
                            return (
                                <div className="market-item" key={index1}>
                                    {
                                        items.map((market, index2) => {
                                            return (
                                                <div className="market" key={index2}>
                                                    <div style={{ width: '10%' }}>
                                                        <CurrencyIcon symbol={market.pairA} size="24" />
                                                        <CurrencyIcon symbol={market.pairB} size="24" />
                                                    </div>
                                                    <div style={{ width: '10%' }}>{market.balance}</div>
                                                    <div style={{ width: '10%' }}>{market.amount}</div>
                                                    <div style={{ width: '20%' }}>{market.offerPrice}</div>
                                                    <div style={{ width: '10%' }}>
                                                        <Input
                                                            className="market-margin"
                                                            type="text"
                                                            value={market.margin}
                                                            onChange={value => this.handleMarginInputChange(value, index1, index2)}
                                                            onlyNumeric
                                                        />
                                                    </div>
                                                    <div style={{ width: '20%' }}>{market.broadcastOffer}</div>
                                                    <div style={{ width: '10%' }}>
                                                        <Input
                                                            className="market-margin"
                                                            type="text"
                                                            value={market.updateSec}
                                                            onChange={value => this.handleUpdateSecInputChange(value, index1, index2)}
                                                            onlyNumeric
                                                        />
                                                    </div>
                                                    <div style={{ width: '10%' }}>
                                                        {market.type === 'start' && <Button className="start" color="transparent" value="Start"/> }
                                                        {market.type === 'stop' && <Button className="stop" color="transparent" value="Stop"/> }
                                                    </div>
                                                </div>
                                            )
                                        })
                                    }
                                    <div className="market-update-date">
                                        <span className="add-offer">+ Add Offer</span>
                                        <span className="update-date">updated 12/11/2019, 19:52 GMC</span>
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        );
    }
}

export default MarketList;
