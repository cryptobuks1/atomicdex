import React from 'react';
import appContainer from 'containers/App';
import './Toolbar.scss';

class Toolbar extends React.Component {
	render() {
		const { online } = this.props;
		return (
			<div className="header_toolbar">
				<div className="toolbar">
					<div className="close_window" onClick={() => appContainer.closeWindow()}></div>
					<div className="min_window" onClick={() => appContainer.miniumWindow()}></div>
					<div className="max_window" onClick={() => appContainer.maxiumWindow()}></div>
				</div>
				{
					online &&
					<div className="online_status">
						<span>online</span>
					</div>
				}
			</div>
		)
	}
}

export default Toolbar;
