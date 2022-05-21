const Camera = (props) => {
	let height = `${window.innerHeight}px`;
	return (
		<div className='bg-white' style={{ height: height }}>
			{props.children}
		</div>
	);
};

export default Camera;
