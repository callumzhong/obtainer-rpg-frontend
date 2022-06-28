import clsx from 'clsx';
import PropTypes from 'prop-types';
import styles from './Checkbox.module.css';
const Checkbox = ({ id, label, mode, className, labelClassName, ...props }) => {
	return (
		<>
			<input
				id={id}
				type='checkbox'
				className={clsx(styles['rpgui-checkbox'], styles[mode], className)}
			/>
			<label className={labelClassName} htmlFor={id}>
				{label}
			</label>
		</>
	);
};

Checkbox.propTypes = {
	mode: PropTypes.oneOf(['golden']),
	className: PropTypes.string,
};

export default Checkbox;
