import SignIn from 'components/signIn/SignIn';
import SignUp from 'components/signUp/SignUp';
import { useState } from 'react';

const StartPage = (props) => {
  const [isSignUp, setIsSignUp] = useState(false);
  const handleIsSignUp = () => {
    setIsSignUp((val) => !val);
  };

  return (
    <div className='relative flex h-screen w-full items-center bg-hero bg-cover rendering-pixelated before:absolute before:left-3 before:top-3 before:h-[80px] before:w-[calc(80px*4.5)] before:bg-logo before:bg-contain before:bg-no-repeat'>
      <div className='mx-auto -mt-20 flex w-1/4 flex-col'>
        {!isSignUp && <SignIn handleIsSignUp={handleIsSignUp} />}
        {isSignUp && <SignUp handleIsSignUp={handleIsSignUp} />}
      </div>
    </div>
  );
};

export default StartPage;
