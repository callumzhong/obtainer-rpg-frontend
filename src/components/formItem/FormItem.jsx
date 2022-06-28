import Input from 'modules/input/Input';
import React from 'react';
const FormItem = React.forwardRef(
  ({ IconElement, placeholder, type, onChange, className, error, ...props }, ref) => {
    return (
      <>
        <div className={`flex ${className || 'gap-5'}`}>
          {IconElement}
          <Input
            onChange={onChange}
            placeholder={placeholder}
            className='flex-1'
            type={type}
            ref={ref}
            {...props}
          />
        </div>
        <p className='-mt-1 pl-10 text-xs text-red-500'>{error}</p>
      </>
    );
  },
);

export default FormItem;
