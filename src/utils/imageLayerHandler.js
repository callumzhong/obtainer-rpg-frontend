const imageLayerHandler = (src, callback) => {
	const image = new Image();
	image.onload = () => {
		callback(image);
	};
	image.src = src;
};

export default imageLayerHandler;
