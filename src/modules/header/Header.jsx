import clsx from 'clsx';
import PropTypes from 'prop-types';
import styles from './Header.module.css';

const Header = ({ mode, className, children }) => {
  return (
    <header
      className={clsx(
        'inline-block leading-none rendering-pixelated',
        styles.border,
        styles[mode],
        className,
      )}
    >
      {children}
    </header>
  );
};

Header.propTypes = {
  className: PropTypes.string,
  children: PropTypes.any,
};

export default Header;
