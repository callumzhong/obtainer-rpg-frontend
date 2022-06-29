import transitionScene01 from 'assets/images/ui/transition-scene01.gif';
import Progress from 'modules/Progress';
import ReactDOM from 'react-dom';
const transitionElement = document.getElementById('transition');
const overlayElement = document.getElementById('overlay');

const Overlay = () => {
  return <div className='absolute top-0 bottom-0 left-0 right-0 z-50 bg-black'></div>;
};

const Transition = () => {
  return (
    <>
      <div className='absolute top-0 left-0 right-0 z-50 h-[85vh]'>
        <img className='h-full w-full object-cover' src={transitionScene01} alt='' />
      </div>
      <div className='absolute left-0 right-0 bottom-0 z-50 h-[15vh] text-white'>
        <Progress />
        <p className='text-start absolute bottom-5 left-2 right-2 text-sm md:text-center'>
          小知識：打怪有可能掉落變身娃娃，使用娃娃的可變身為指定怪物。
        </p>
      </div>
    </>
  );
};

const SwitchScene = () => {
  return (
    <>
      {ReactDOM.createPortal(<Overlay />, overlayElement)}
      {ReactDOM.createPortal(<Transition />, transitionElement)}
    </>
  );
};

export default SwitchScene;
