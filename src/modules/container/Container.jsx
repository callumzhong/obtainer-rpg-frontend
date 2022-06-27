import clsx from 'clsx';
import PropTypes from 'prop-types';
import styles from './Container.module.css';
const Container = ({ mode, className, children }) => {
  return (
    <div className={clsx('container rendering-pixelated', styles.border, styles[mode], className)}>
      {children}
    </div>
  );
};

Container.defaultProps = {
  mode: 'top-left-bottom-right',
};

Container.propTypes = {
  mode: PropTypes.oneOf(Object.keys(styles).filter((key) => key !== 'border')),
  className: PropTypes.string,
  children: PropTypes.any,
};

export default Container;
