import clsx from 'clsx';
import PropTypes from 'prop-types';
import styles from './Top.module.css';

const Top = ({ className, children }) => {
  return (
    <div className={clsx('inline-block rendering-pixelated', styles.top, className)}>
      {children}
    </div>
  );
};

Top.propTypes = {
  className: PropTypes.string,
  children: PropTypes.any,
};

export default Top;
