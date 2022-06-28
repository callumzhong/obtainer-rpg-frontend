import Container from 'modules/container/Container';
import SignInItem from './SignInItem';

const SignIn = (props) => {
  return (
    <Container className='w-1/3'>
      <SignInItem />
    </Container>
    // <div className='w-1/3 rounded-2xl border-4 border-white bg-black bg-opacity-60 px-2 py-1 text-center shadow-[0_0_1px_1px_black]'>
    // </div>
  );
};

export default SignIn;
