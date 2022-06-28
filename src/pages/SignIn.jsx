import Input from 'modules/input/Input';

const SignInPage = (props) => {
  return (
    <div className='flex flex-col items-center gap-2 pt-5'>
      <Input label='name' type='text' />
    </div>
  );
};

export default SignInPage;
