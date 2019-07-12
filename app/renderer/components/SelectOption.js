import React from 'react';
import PropTypes from 'prop-types';
import {classNames, Image} from 'react-extras';
import './SelectOption.scss';

const SelectOption = ({
	className,
	label,
	value,
	image,
	fallbackImage,
	imageRenderer,
	selectType,
	...props
}) => {
	const hasImage = Boolean(image || imageRenderer);

	const containerClassName = classNames(
		'SelectOption',
		{
			'SelectOption--image': hasImage,
		},
		className
	);
	return (
		<div {...props} className={containerClassName}>
			{hasImage &&
				<span className="SelectOption__image-wrap">
					{imageRenderer ?
						imageRenderer({label, value}) :
						(
							<Image
								className="SelectOption__image"
								url={image}
								fallbackUrl={fallbackImage}
							/>
						)
					}
				</span>
			}
			{
				!selectType && (
				<span className="SelectOption__label">
					{label}
				</span>)
			}
			{
				selectType === 'currencySetting' && (
					<div className="currency-setting">
						<p>{value}</p>
						<p>{label}</p>
					</div>
				)
			}
		</div>
	);
};

SelectOption.propTypes = {
	className: PropTypes.string,
	label: PropTypes.string.isRequired,
	value: PropTypes.string,
	image: PropTypes.string,
	fallbackImage: PropTypes.string,
	imageRenderer: PropTypes.func,
};

SelectOption.defaultProps = {
	className: '',
	value: '',
	image: undefined,
	fallbackImage: undefined,
	imageRenderer: undefined,
};

export default SelectOption;
