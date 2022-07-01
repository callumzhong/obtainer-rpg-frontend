import ErrorMessage from 'modules/ErrorMessage';
import Input from 'modules/Input';
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
        <ErrorMessage className='-mt-1 pl-10'>{error}</ErrorMessage>
      </>
    );
  },
);

export default FormItem;
