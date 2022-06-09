const emitEvent = (name, detail) => {
	const event = new CustomEvent(name, {
		detail,
	});
	document.dispatchEvent(event);
};

export default emitEvent;
