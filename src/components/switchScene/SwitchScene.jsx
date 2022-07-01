import Overlay from 'modules/Overlay';
import ReactDOM from 'react-dom';
import Transition from './Transition';
const transitionElement = document.getElementById('transition');
const overlayElement = document.getElementById('overlay');

const SwitchScene = () => {
  return (
    <>
      {ReactDOM.createPortal(<Overlay />, overlayElement)}
      {ReactDOM.createPortal(<Transition />, transitionElement)}
    </>
  );
};

export default SwitchScene;
