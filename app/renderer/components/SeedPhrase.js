import React from 'react';
import PropTypes from 'prop-types';
import {clipboard} from 'electron';
import ReloadButton from 'components/ReloadButton';
import Button from 'components/Button';
import WrapWidth from 'components/WrapWidth';
import {translate} from '../translate';
import './SeedPhrase.scss';

const t = translate(['common']);

class SeedPhrase extends React.Component {
	static propTypes = {
		value: PropTypes.string.isRequired,
		showCopy: PropTypes.bool,
		showReload: PropTypes.bool,
		onReload: PropTypes.func,
	}

	static defaultProps = {
		showCopy: true,
		showReload: false,
		onReload: () => {},
	}

	state = {
		isCopied: false,
	}

	handleClose = () => {
		this.setState({isCopied: false});
	}

	handleCopy = () => {
		const {value} = this.props;
		this.setState({isCopied: true});
		clipboard.writeText(value);
	}

	handleReload = event => {
		const {onReload} = this.props;
		this.setState({isCopied: false});
		onReload(event);
	}

	render() {
		const {value, showReload} = this.props;

		return (
			<div>
				<div className="SeedPhrase">
					{showReload && (
						<div className="section section--reload">
							<ReloadButton onClick={this.handleReload}/>
						</div>
					)}
					<div className="section section--value">
						<WrapWidth wordsPerLine={5}>
							{value}
						</WrapWidth>
					</div>
				</div>
				<div className="section--copy--generate">
					<Button className="copy-btn" color="transparent" value="Copy" onClick={this.handleCopy}/>
					<Button className="generate-btn" color="transparent" value="Generate" onClick={this.handleReload}/>
				</div>
			</div>
		);
	}
}

export default SeedPhrase;
