import clsx from 'clsx';

const Character = ({ className, isAnimate, src, size }) => {
  return (
    <div
      style={{
        height: `${20 * size}px`,
        width: `${16 * size}px`,
      }}
      className={`relative overflow-hidden ${className || ''}`}
    >
      <img
        style={{
          width: `${64 * size}px`,
        }}
        className={clsx('absolute max-w-none  rendering-pixelated', {
          'animate-character': isAnimate,
        })}
        src={src}
        alt='character'
      />
    </div>
  );
};

export default Character;
