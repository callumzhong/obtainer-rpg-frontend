import clsx from 'clsx';
import PropTypes from 'prop-types';
import utilsStyles from 'utilsStyles';

const Select = (props) => {
	return (
		<select
			className={clsx(
				'w-full bg-black py-1 px-2',
				utilsStyles.border,
				props.className,
			)}
		>
			{props.children}
		</select>
	);
};

Select.propTypes = {
	className: PropTypes.string,
};

export default Select;
