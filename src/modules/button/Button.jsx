import clsx from 'clsx';
import PropTypes from 'prop-types';
import styles from './Button.module.css';
const Button = ({ mode, className, onClick, children }) => {
	return (
		<button
			onClick={onClick}
			className={clsx(styles['rpgui-button'], styles[mode], className)}
		>
			{children}
		</button>
	);
};

Button.propTypes = {
	mode: PropTypes.oneOf(Object.keys(styles)),
	className: PropTypes.string,
	onClick: PropTypes.func.isRequired,
	children: PropTypes.any,
};

export default Button;
