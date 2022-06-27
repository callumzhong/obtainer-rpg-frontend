import clsx from 'clsx';
import PropTypes from 'prop-types';
import styles from './Button.module.css';

const Button = ({ mode, className, onClick, children }) => {
  return (
    <button
      onClick={onClick}
      className={clsx(
        'inline-block leading-tight rendering-pixelated',
        styles.border,
        styles[mode],
        className,
      )}
    >
      {children}
    </button>
  );
};

Button.propTypes = {
  className: PropTypes.string,
  onClick: PropTypes.func.isRequired,
  children: PropTypes.any,
};

export default Button;
