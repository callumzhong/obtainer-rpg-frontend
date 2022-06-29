import clsx from 'clsx';
import PropTypes from 'prop-types';
import styles from './Button.module.css';

const Button = ({ className, onClick, children, type = 'button' }) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={clsx('inline-block leading-tight rendering-pixelated', styles.button, className)}
    >
      {children}
    </button>
  );
};

Button.propTypes = {
  className: PropTypes.string,
  children: PropTypes.any,
};

export default Button;
