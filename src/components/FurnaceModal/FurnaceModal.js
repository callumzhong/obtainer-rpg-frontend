import clsx from 'clsx';
import useKeyPressDownListener from 'hooks/useKeyPressDownListener';
import Modal from 'modules/modal/Modal';
import ReactModal from 'react-modal';
import styles from 'styles';

ReactModal.setAppElement('#root');

const FurnaceModal = ({ event, modalIsOpen, openModal, closeModal }) => {
	useKeyPressDownListener('KeyQ', () => {
		if (event.type !== 'conversation') return;
		openModal();
		event.onComplete();
	});

	useKeyPressDownListener('KeyEsc', () => {
		if (!modalIsOpen) return;
		closeModal();
	});

	return (
		<Modal
			className={clsx(styles.position_fullscreen, 'bg-white p-4')}
			isOpen={modalIsOpen}
			onRequestClose={closeModal}
			contentLabel='Furnace Modal'
		>
			<button onClick={closeModal}>close</button>
			<div>I am a modal</div>
			<form>
				<input />
				<button>tab navigation</button>
				<button>stays</button>
				<button>inside</button>
				<button>the modal</button>
			</form>
		</Modal>
	);
};

export default FurnaceModal;
