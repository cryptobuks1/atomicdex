import React from 'react';
import appContainer from 'containers/App';
import './Toolbar.scss';

class Toolbar extends React.Component {
	render() {
		const { online } = this.props;
		return (
			<div className="header_toolbar">
				<div className="toolbar">
					<img className="close_window" src="/assets/toolbar/close.png" width="15" height="15" onClick={() => appContainer.closeWindow()} />
					<img className="min_window" src="/assets/toolbar/min.png" width="15" height="15" onClick={() => appContainer.miniumWindow()}/>
					<img className="max_window" src="/assets/toolbar/max.png" width="15" height="15" onClick={() => appContainer.maxiumWindow()}/>
				</div>
				<div className="drag_area">
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
