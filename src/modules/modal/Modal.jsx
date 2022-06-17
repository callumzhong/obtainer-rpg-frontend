import clsx from 'clsx';
import PropTypes from 'prop-types';
import ReactModal from 'react-modal';

ReactModal.setAppElement('#root');
const Modal = (props) => {
	return (
		<ReactModal
			isOpen={props.isOpen}
			onAfterOpen={props.onAfterOpen}
			onRequestClose={props.onRequestClose}
			contentLabel={props.contentLabel}
			className={clsx('overflow-auto', props.className)}
			overlayClassName='fixed top-0 bottom-0 left-0 right-0 bg-[rgba(0,0,0,.15)]'
		>
			{props.children}
		</ReactModal>
	);
};

Modal.propTypes = {
	className: PropTypes.string,
	isOpen: PropTypes.bool.isRequired,
	onRequestClose: PropTypes.func,
	onAfterOpen: PropTypes.func,
	contentLabel: PropTypes.string.isRequired,
};

export default Modal;
