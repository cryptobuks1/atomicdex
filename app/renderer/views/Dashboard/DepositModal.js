import React from 'react';
import QRCode from 'qrcode.react';
import Modal from 'components/Modal';
import Button from 'components/Button';
import CopyCurrencyAddress from 'components/CopyCurrencyAddress';
import dashboardContainer from 'containers/Dashboard';
import CopiedIcon from 'icons/Copied';
import {translate} from '../../translate';
import './DepositModal.scss';

const t = translate('dashboard');

class DepositModal extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			isOpen: false,
			isCopied: false,
		};
	}

	open = () => {
		this.setState({isOpen: true});
	};

	close = () => {
		this.setState({isOpen: false});
	};

	onCopied = () => {
		const self = this;
		this.setState({isCopied: true});
		setTimeout(() => {
			self.setState({isCopied: false});
		}, 2000);
	}

	render() {
		// const currencyInfo = dashboardContainer.activeCurrency;
		const { currencyInfo } = this.props;
		return (
			<div className="modal-wrapper">
				<Modal
					className="DepositModal"
					title={t('deposit.title')}
					open={this.state.isOpen}
					width="445px"
					onClose={this.close}
				>
					<>
						<div className="section qrcode">
							<QRCode value={currencyInfo.address}/>
						</div>
						<p className="symbol-name">{t('deposit.symbolName', {symbol: currencyInfo.symbol})}</p>
						<div className="section">
							<CopyCurrencyAddress value={currencyInfo.address} onCopied={this.onCopied}/>
						</div>
						{
							this.state.isCopied &&
							<div className="copy">
								<div className="copied-icon"><CopiedIcon/></div>
								<p>Copied</p>
							</div>
						}
					</>
				</Modal>
				<Button
					className="OpenModalButton"
					color="transparent"
					value={t('deposit.label')}
					onClick={this.open}
				/>
			</div>
		);
	}
}

export default DepositModal;
