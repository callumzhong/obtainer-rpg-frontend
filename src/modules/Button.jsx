import clsx from 'clsx';
import PropTypes from 'prop-types';
import styles from './Button.module.css';
const Button = (props) => {
	return (
		<button
			className={clsx(
				styles['rpgui-button'],
				styles[props.mode],
				props.className,
			)}
		>
			{props.children}
		</button>
	);
};

Button.propTypes = {
	mode: PropTypes.oneOf(['golden']),
	className: PropTypes.string,
};

export default Button;
