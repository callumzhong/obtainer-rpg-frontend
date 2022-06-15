import clsx from 'clsx';
import PropTypes from 'prop-types';

export const CardPosition = {
	bottom: 'absolute bottom-0 left-0 right-0',
};

Object.freeze(CardPosition);

const Card = ({ className, position, mode, ...props }) => {
	return (
		<div
			className={clsx(
				'border-4 border-double border-sandal bg-karry p-5',
				position,
				mode,
				className,
			)}
			children={props.children}
		/>
	);
};

Card.propTypes = {
	position: PropTypes.oneOf(Object.values(CardPosition)),
	className: PropTypes.string,
	children: PropTypes.any,
};

export default Card;
