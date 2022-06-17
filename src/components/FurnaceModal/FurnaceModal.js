import clsx from 'clsx';
import useKeyPressDownListener from 'hooks/useKeyPressDownListener';
import Modal from 'modules/modal/Modal';
import {
	GiAbdominalArmor,
	GiAmericanShield,
	GiCrestedHelmet,
	GiFragmentedSword,
} from 'react-icons/gi';
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
			className={clsx(
				styles['position-fullscreen'],
				'bg-[url(assets/images/ui/pixel_art_blacksmith.png)] bg-cover bg-center bg-no-repeat',
				'flex gap-6 p-10 text-white',
			)}
			isOpen={modalIsOpen}
			onRequestClose={closeModal}
			contentLabel='Furnace Modal'
		>
			<div className='basis-1/5 p-3'>
				<h3 className='mb-6 text-xl font-bold'>工作台</h3>
				<ul className='mb-4 flex gap-4'>
					<li className={clsx('bg-gray-500 bg-opacity-50 p-1', styles.border)}>
						<GiFragmentedSword className='h-6 w-6' />
					</li>
					<li className={clsx('bg-gray-500 bg-opacity-50 p-1', styles.border)}>
						<GiAbdominalArmor className='h-6 w-6' />
					</li>
					<li className={clsx('bg-gray-500 bg-opacity-50 p-1', styles.border)}>
						<GiCrestedHelmet className='h-6 w-6' />
					</li>
					<li className={clsx('bg-gray-500 bg-opacity-50 p-1', styles.border)}>
						<GiAmericanShield className='h-6 w-6' />
					</li>
				</ul>
				<ul className='flex flex-col gap-4 bg-black bg-opacity-50'>
					<li className='flex gap-4 border-b border-gray-500 px-2 py-1 hover:shadow-border'>
						<img
							className='bottom-9 block basis-12 object-contain'
							src='https://i.imgur.com/Q1tfRmM.png'
							alt=''
						/>
						<div className='flex-auto'>
							<div>頭盔</div>
							<div className='flex justify-between'>
								<div>需要等級: 20</div>
								<div>體積: 1</div>
							</div>
						</div>
					</li>
				</ul>
			</div>
			<div className='flex basis-4/5 flex-col'>
				<div className='flex basis-1/2 items-center'>
					<img
						className='mx-auto w-80 rendering-pixelated'
						src='https://i.imgur.com/Q1tfRmM.png'
						alt=''
					/>
				</div>
				<div className='flex basis-1/2 border-t border-gray-500'>
					<ul className='basis-1/2 border-r border-gray-500 pr-12 pt-6'>
						<li className={clsx('inline-block p-1')}>
							<div
								className={clsx(
									'mr-4 inline-block bg-gray-500 bg-opacity-50 align-middle',
									styles.border,
								)}
							>
								<GiAmericanShield className='h-6 w-6' />
							</div>
							<span>100/200</span>
						</li>
					</ul>
					<div className='basis-1/2 pl-12 pt-6'>
						等級需求: 1
						<br />
						$400
					</div>
				</div>
				<div className='text-center'>
					<button className='bg-red-500 px-3 py-1'>開始生產</button>
				</div>
			</div>
		</Modal>
	);
};

export default FurnaceModal;
