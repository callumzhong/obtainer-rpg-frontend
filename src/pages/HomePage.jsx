import SwitchScene from 'components/switchScene/SwitchScene';
import useAuth from 'hooks/useAuthRoute';

const HomePage = () => {
  const { isDone, role } = useAuth();
  console.log(role);
  return (
    <>
      {!isDone && <SwitchScene />}
      <p>12</p>
    </>
  );
};

export default HomePage;
