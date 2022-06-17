import clsx from 'clsx';
import useKeyPressDownListener from 'hooks/useKeyPressDownListener';
import Card from 'modules/card/Card';
import styles from 'styles';

const Conversation = ({ event }) => {
	const { element: Element } = event;
	useKeyPressDownListener('Enter', event.onComplete);
	return (
		<Card
			className={clsx(
				'container mx-auto min-h-[20%]  p-6',
				styles.position_bottom,
			)}
		>
			{<Element />}
		</Card>
	);
};

export default Conversation;
