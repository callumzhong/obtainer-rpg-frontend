import styles from './Layout.module.css';

const Layout = (props) => {
	return (
		<div
			className={`${styles.layout} flex justify-center`}
			children={props.children}
		/>
	);
};

export default Layout;
