import clsx from 'clsx';
import PropTypes from 'prop-types';
import styles from './Bookmark.module.css';
const Bookmark = ({ mode, className, children }) => {
  return (
    <div
      className={clsx(
        'inline-block leading-none rendering-pixelated',
        styles.border,
        styles[mode],
        className,
      )}
    >
      {children}
    </div>
  );
};

Bookmark.propTypes = {
  className: PropTypes.string,
  children: PropTypes.any,
};

export default Bookmark;
