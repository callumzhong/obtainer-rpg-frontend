import SignIn from 'components/signIn/SignIn';
import SignUp from 'components/signUp/SignUp';
import { useState } from 'react';

const StartPage = (props) => {
  const [isSignUp, setIsSignUp] = useState(false);
  const handleIsSignUp = () => {
    setIsSignUp((val) => !val);
  };

  return (
    <div className='relative flex h-screen w-full items-center bg-hero bg-cover bg-bottom bg-no-repeat rendering-pixelated '>
      <div className='mx-auto -mt-20 flex w-1/4 flex-col'>
        {!isSignUp && <SignIn handleIsSignUp={handleIsSignUp} />}
        {isSignUp && <SignUp handleIsSignUp={handleIsSignUp} />}
      </div>
    </div>
  );
};

export default StartPage;
