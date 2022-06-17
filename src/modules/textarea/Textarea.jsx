import clsx from 'clsx';
import styles from './Textarea.module.css';

const Textarea = ({ className, ...props }) => {
	return (
		<textarea
			className={clsx(styles.textarea, className)}
			{...props}
		></textarea>
	);
};

export default Textarea;
