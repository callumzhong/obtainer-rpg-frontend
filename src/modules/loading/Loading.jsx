import ReactDOM from 'react-dom';
import { AiOutlineLoading } from 'react-icons/ai';

const portalElement = document.getElementById('loading');

const Overlay = () => {
  return <div className='absolute top-0 bottom-0 left-0 right-0 z-50 bg-black bg-opacity-70'></div>;
};

const Loading = () => {
  return (
    <>
      {ReactDOM.createPortal(
        <>
          <Overlay />
          <AiOutlineLoading className='absolute top-8 right-10 z-50 h-8 w-auto animate-spin text-white' />
        </>,
        portalElement,
      )}
    </>
  );
};

export default Loading;
