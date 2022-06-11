import Card, { CardPosition } from '../../modules/card/Card';

const Conversation = ({ content, onComplete }) => {
	return (
		<Card position={CardPosition.bottom} className='p-6 text-2xl '>
			<p className='mb-5'>{content}</p>
			<button
				className='absolute bottom-2 right-2 w-max'
				onClick={onComplete}
				type='button'
			>
				下一頁
			</button>
		</Card>
	);
};

export default Conversation;
