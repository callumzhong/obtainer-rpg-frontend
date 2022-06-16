import useKeyPressDownListener from 'hooks/useKeyPressDownListener';
import Card, { CardPosition } from 'modules/card/Card';

const Conversation = ({ event }) => {
	const { element: Element } = event;
	useKeyPressDownListener('Enter', event.onComplete);
	return (
		<Card
			position={CardPosition.bottom}
			className='container mx-auto min-h-[20%]  p-6'
		>
			{<Element />}
		</Card>
	);
};

export default Conversation;
