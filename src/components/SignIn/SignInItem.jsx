const SignInItem = (props) => {
  return (
    <ul className='inline-block text-center text-3xl '>
      {['登入', '註冊'].map((item) => (
        <li className='leading-[2] text-gray-400 hover:text-white' key={item}>
          {item}
        </li>
      ))}
    </ul>
  );
};

export default SignInItem;
