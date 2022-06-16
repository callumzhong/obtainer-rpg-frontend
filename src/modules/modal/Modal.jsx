import clsx from 'clsx';
import PropTypes from 'prop-types';
import ReactModal from 'react-modal';
import styles from 'styles';

ReactModal.setAppElement('#root');
const Modal = ({
	className,
	isOpen,
	onRequestClose,
	onAfterOpen,
	contentLabel,
	...props
}) => {
	return (
		<ReactModal
			isOpen={isOpen}
			onAfterOpen={onAfterOpen}
			onRequestClose={onRequestClose}
			contentLabel={contentLabel}
			className={clsx('overflow-auto', className)}
			overlayClassName='fixed top-0 bottom-0 left-0 right-0 bg-[rgba(0,0,0,.15)]'
		>
			{props.children}
		</ReactModal>
	);
};

Modal.propTypes = {
	className: PropTypes.oneOf(Object.keys(styles)),
};

export default Modal;
