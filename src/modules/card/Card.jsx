import clsx from 'clsx';
import PropTypes from 'prop-types';

const Card = ({ className, ...props }) => {
	return (
		<div
			className={clsx(
				'border-4 border-double border-sandal bg-karry p-5',
				className,
			)}
			children={props.children}
		/>
	);
};

Card.propTypes = {
	className: PropTypes.string,
	children: PropTypes.any,
};

export default Card;
