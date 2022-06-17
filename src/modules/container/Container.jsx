import clsx from 'clsx';
import PropTypes from 'prop-types';
import styles from './Container.module.css';

const Container = ({ mode, className, children }) => {
	return (
		<div
			className={clsx(
				styles['rpgui-container'],
				styles[mode],
				'text-white',
				className,
			)}
		>
			{children}
		</div>
	);
};

Container.defaultProps = {
	mode: 'framed',
};

Container.propTypes = {
	mode: PropTypes.oneOf(Object.keys(styles)),
	className: PropTypes.string,
};

export default Container;
