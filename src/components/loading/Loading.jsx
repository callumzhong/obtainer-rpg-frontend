import Overlay from 'modules/Overlay';
import ReactDOM from 'react-dom';
import { AiOutlineLoading } from 'react-icons/ai';

const transitionElement = document.getElementById('transition');
const overlayElement = document.getElementById('overlay');

const Loading = () => {
  return (
    <>
      {ReactDOM.createPortal(<Overlay opacity={70} />, overlayElement)}
      {ReactDOM.createPortal(
        <AiOutlineLoading className='absolute top-8 right-10 z-50 h-8 w-auto animate-spin text-white' />,
        transitionElement,
      )}
    </>
  );
};

export default Loading;
