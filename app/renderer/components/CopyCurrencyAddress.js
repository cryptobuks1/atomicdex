import React from 'react';
import PropTypes from 'prop-types';
import Input from 'components/Input';
import CopyIconButton from 'components/CopyIconButton';
import './CopyCurrencyAddress.scss';

const CopyCurrencyAddress = ({value, onCopied}) => (
	<Input
		className="CopyCurrencyAddress"
		value={value}
		button={() => <CopyIconButton value={value} onCopied={onCopied} />}
	/>
);

CopyCurrencyAddress.propTypes = {
	value: PropTypes.string.isRequired,
};

export default CopyCurrencyAddress;
