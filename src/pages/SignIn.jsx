import FoldArrow from 'modules/arrow/FoldArrow';
import Bookmark from 'modules/bookmark/Bookmark';

const SignInPage = (props) => {
  return (
    <div className='flex flex-col items-center pt-5 pl-5'>
      <Bookmark>12</Bookmark>
      <Bookmark className='mt-5' mode={'action'}>
        12
      </Bookmark>
      <FoldArrow>設置</FoldArrow>
    </div>
    // <Layout>

    //   <SignIn></SignIn>
    // </Layout>
  );
};

export default SignInPage;
