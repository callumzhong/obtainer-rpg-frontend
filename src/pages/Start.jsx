import SignIn from 'components/signIn/SignIn';
import SignUp from 'components/signUp/SignUp';
import Container from 'modules/container/Container';
import Top from 'modules/top/Top';
import { useState } from 'react';

const StartPage = (props) => {
  const [isSignUp, setIsSignUp] = useState(false);
  const handleIsSignUp = () => {
    setIsSignUp((val) => !val);
  };
  return (
    <div className='relative flex h-screen w-full items-center bg-hero bg-cover pb-[150px] pt-[150px] rendering-pixelated before:absolute before:left-1/2 before:top-3 before:h-[150px] before:w-[calc(150px*4.5)] before:-translate-x-1/2 before:bg-logo before:bg-contain before:bg-no-repeat'>
      <div className='mx-auto flex w-1/4 flex-col'>
        <Top className='relative z-10 w-full text-center text-2xl font-bold text-cloud-burst'>
          {!isSignUp ? '歡迎' : '註冊'}
        </Top>
        <Container className='-mt-2 flex-1 py-12' mode='decorate-all'>
          {!isSignUp && <SignIn handleIsSignUp={handleIsSignUp} />}
          {isSignUp && <SignUp handleIsSignUp={handleIsSignUp} />}
        </Container>
      </div>
    </div>
  );
};

export default StartPage;
