import React from 'react';
import Svg from 'components/Svg';

const Swap = props => (
	<Svg {...props} viewBox="0 0 35 35">
		<rect id="Rectangle" width="24" height="24" fill="none" />
		<g id="arrows" transform="translate(1 2)">
			<g id="Group_2" data-name="Group 2">
				<path id="Path" d="M0,.5H19.38" transform="translate(0.241 3.825)" fill="none" stroke="#fff" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" stroke-width="1" />
				<path id="Path_2" data-name="Path 2" d="M0,0,3.376,3.376,0,6.753" transform="translate(16.807 0.975)" fill="none" stroke="#fff" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" stroke-width="1" />
			</g>
			<g id="Group_2-2" data-name="Group 2" transform="translate(21 20) rotate(-180)">
				<path id="Path-2" data-name="Path" d="M0,.5H19.38" transform="translate(0.241 3.825)" fill="none" stroke="#fff" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" stroke-width="1" />
				<path id="Path_2-2" data-name="Path 2" d="M0,0,3.376,3.376,0,6.753" transform="translate(16.807 0.975)" fill="none" stroke="#fff" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" stroke-width="1" />
			</g>
		</g>
	</Svg>
);

export default Swap;
