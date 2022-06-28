import styles from './Camera.module.css';
const Camera = (props) => {
	return (
		<div
			className={`${styles.camera} outline outline-1 outline-white`}
			children={props.children}
		/>
	);
};

export default Camera;
