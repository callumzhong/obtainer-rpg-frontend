const Card = ({ className, ...props }) => {
	return (
		<div
			className={`border border-black ${className || ''}`}
			children={props.children}
		/>
	);
};

export default Card;
