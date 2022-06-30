import useAuth from 'apis/useAuth';
import SwitchScene from 'components/switchScene/SwitchScene';

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
