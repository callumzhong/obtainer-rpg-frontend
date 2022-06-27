import FoldArrow from 'modules/arrow/FoldArrow';
import Bookmark from 'modules/bookmark/Bookmark';
import Button from 'modules/button/Button';
import Container from 'modules/container/Container';
import Header from 'modules/header/Header';

const SignInPage = (props) => {
  return (
    <div className='flex flex-col items-center gap-2 pt-5'>
      <Button className='text-5xl'>12</Button>
      <Bookmark>12</Bookmark>
      <Bookmark mode={'action'}>12</Bookmark>
      <FoldArrow>設置</FoldArrow>
      <Header>角色資訊大平台</Header>
      <Header mode='reverse'>角色資訊大平台</Header>
      <Container className='w-1/2'>
        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Cumque iure accusantium, at
        eveniet expedita officiis molestias nulla rem voluptatibus hic non error, temporibus, cum
        laboriosam ratione eius laborum. Iste, sunt.
      </Container>
    </div>
    // <Layout>

    //   <SignIn></SignIn>
    // </Layout>
  );
};

export default SignInPage;
