import clsx from 'clsx';
import PropTypes from 'prop-types';
import styles from './Container.module.css';

const Container = ({ mode, className, children }) => {
  return (
    <div
      className={clsx(
        'container rendering-pixelated',
        styles.container,
        styles[mode],
        className,
      )}
    >
      {children}
    </div>
  );
};

Container.propTypes = {
  className: PropTypes.string,
  children: PropTypes.any,
};

export default Container;
