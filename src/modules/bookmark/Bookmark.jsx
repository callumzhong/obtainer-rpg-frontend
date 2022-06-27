import clsx from 'clsx';
import PropTypes from 'prop-types';
import styles from './Bookmark.module.css';
const Bookmark = ({ mode, className, onClick, children }) => {
  return (
    <div
      onClick={onClick}
      className={clsx(
        'inline-block bg-cover bg-clip-padding bg-center bg-no-repeat bg-origin-padding leading-none rendering-pixelated',
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
