import ReactModal from 'react-modal';
import useKeyPressDownListener from '../../hooks/useKeyPressDownListener';
ReactModal.setAppElement('#root');

const customStyles = {
	overlay: {
		backgroundColor: 'rgba(0, 0, 0, 0.15)',
	},
	content: {
		top: '50%',
		left: '50%',
		right: 'auto',
		bottom: 'auto',
		marginRight: '-50%',
		transform: 'translate(-50%, -50%)',
		width: '80vw',
		height: '90%',
	},
};

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
		<ReactModal
			isOpen={modalIsOpen}
			onRequestClose={closeModal}
			style={customStyles}
			contentLabel='Example Modal'
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
		</ReactModal>
	);
};

export default FurnaceModal;
