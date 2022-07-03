import transitionScene01 from 'assets/images/ui/transition-scene01.gif';
import Progress from 'modules/Progress';

const Transition = () => {
  return (
    <>
      <div className='absolute top-0 left-0 right-0 z-50 h-[85vh]'>
        <img
          className='h-full w-full object-cover'
          src={transitionScene01}
          alt=''
        />
      </div>
      <div className='absolute left-0 right-0 bottom-0 z-50 h-[15vh] text-white'>
        <Progress />
        <p className='text-start absolute top-1/2 left-2 right-2 -translate-y-1/2 text-sm md:text-center'>
          {`小知識：打怪有可能掉落變身娃娃 (時效性)，使用娃娃可改變角色外觀。`}
        </p>
      </div>
    </>
  );
};

export default Transition;
