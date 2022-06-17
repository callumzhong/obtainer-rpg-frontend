import clsx from 'clsx';
import PropTypes from 'prop-types';
import styles from 'styles';

const Select = (props) => {
	return (
		<select
			className={clsx(
				'w-full bg-black py-1 px-2',
				styles.border,
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
