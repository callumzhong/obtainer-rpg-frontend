const ErrorMessage = ({ className, children }) => {
  return <p className={`text-xs text-red-500 ${className || ''} `}>{children}</p>;
};

export default ErrorMessage;
