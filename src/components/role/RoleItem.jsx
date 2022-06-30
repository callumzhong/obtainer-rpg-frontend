import clsx from 'clsx';
import Character from 'modules/Character';
import React from 'react';
const pixelSize = 3;
const RoleItem = React.forwardRef(
  (
    {
      name,
      className,
      isHover,
      isAnimate = false,
      isDisabled,
      src,
      size,
      ...props
    },
    ref,
  ) => {
    return (
      <label
        className={clsx({
          'hover:shadow-border hover:shadow-green-500': true,
        })}
      >
        <input
          className='relative hidden'
          value={src}
          type='radio'
          name={name}
          ref={ref}
          {...props}
        />
        <Character isAnimate={false} src={src} size={size || pixelSize} />
      </label>
    );
  },
);

export default RoleItem;
