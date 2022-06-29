import clsx from 'clsx';
import PropTypes from 'prop-types';
import React from 'react';
import styles from './Input.module.css';

const Input = React.forwardRef(({ label, className, ...props }, ref) => {
  return (
    <>
      <div className='relative w-full'>
        <input
          className={clsx(
            'w-full pl-3 pr-[15%] leading-none outline-none rendering-pixelated',
            styles.input,
            className,
          )}
          ref={ref}
          {...props}
        />
        <label />
      </div>
    </>
  );
});

Input.propTypes = {
  className: PropTypes.string,
};

export default Input;
