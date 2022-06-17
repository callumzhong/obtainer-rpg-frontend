import clsx from 'clsx';
import PropTypes from 'prop-types';
import styles from './Input.module.css';
const Input = ({ className, ...props }) => {
	return <input className={clsx(styles.text, className)} {...props} />;
};

Input.propTypes = {
	className: PropTypes.string,
};

export default Input;
