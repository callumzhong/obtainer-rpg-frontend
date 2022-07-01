import clsx from 'clsx';
const opacities = {
  10: 'bg-opacity-10',
  70: 'bg-opacity-70',
};

const Overlay = ({ opacity }) => {
  return (
    <div
      className={clsx('absolute top-0 bottom-0 left-0 right-0 z-50 bg-black', opacities[opacity])}
    ></div>
  );
};

export default Overlay;
