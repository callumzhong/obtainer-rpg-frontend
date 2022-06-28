import clsx from 'clsx';
import PropTypes from 'prop-types';
import styles from './Hr.module.css';
const Hr = ({ mode }) => {
	return <hr className={clsx(styles[mode])} />;
};

Hr.defaultProps = {
	mode: 'hr',
};

Hr.propTypes = {
	mode: PropTypes.oneOf(Object.keys(styles)),
};

export default Hr;
