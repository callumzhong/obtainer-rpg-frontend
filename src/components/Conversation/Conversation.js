import clsx from 'clsx';
import useKeyPressDownListener from 'hooks/useKeyPressDownListener';
import Card from 'modules/card/Card';

const Conversation = ({ event }) => {
  const { element: Element } = event;
  useKeyPressDownListener('Enter', event.onComplete);
  return (
    <Card className={clsx('absolute bottom-0 left-0 right-0', 'container mx-auto min-h-[20%] p-6')}>
      {<Element />}
    </Card>
  );
};

export default Conversation;
