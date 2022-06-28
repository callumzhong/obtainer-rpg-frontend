import clsx from 'clsx';
import PropTypes from 'prop-types';
import styles from './Input.module.css';
const Input = ({ label, className, ...props }) => {
  return (
    <div className='relative'>
      <input
        className={clsx(
          'inline-block pr-6 leading-none outline-none rendering-pixelated',
          styles.input,
          className,
        )}
        {...props}
      />
      <label />
    </div>
  );
};

Input.propTypes = {
  className: PropTypes.string,
};

export default Input;
