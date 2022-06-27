import FoldArrow from 'modules/arrow/FoldArrow';
import Bookmark from 'modules/bookmark/Bookmark';
import Button from 'modules/button/Button';
import Header from 'modules/header/Header';

const SignInPage = (props) => {
  return (
    <div className='flex flex-col items-center gap-2 pt-5 pl-5'>
      <Button>12</Button>
      <Bookmark>12</Bookmark>
      <Bookmark mode={'action'}>12</Bookmark>
      <FoldArrow>設置</FoldArrow>
      <Header>角色資訊大平台</Header>
      <Header mode='reverse'>角色資訊大平台</Header>
    </div>
    // <Layout>

    //   <SignIn></SignIn>
    // </Layout>
  );
};

export default SignInPage;
