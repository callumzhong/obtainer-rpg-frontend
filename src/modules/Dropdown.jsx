import clsx from 'clsx';
import PropTypes from 'prop-types';
import styles from './Dropdown.module.css';

const Dropdown = ({ mode, className, children }) => {
	return (
		<select className={clsx(styles['rpgui-dropdown'])}>
			<option value=''></option>
		</select>
	);
};

Dropdown.defaultProps = {
	mode: 'framed',
};

Dropdown.propTypes = {
	mode: PropTypes.oneOf(Object.keys(styles)),
	className: PropTypes.string,
};

export default Dropdown;
