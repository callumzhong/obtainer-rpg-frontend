import Loading from 'components/loading/Loading';
import SwitchScene from 'components/switchScene/SwitchScene';
import HomePage from 'pages/HomePage';
import RolePage from 'pages/RolePage';
import StartPage from 'pages/StartPage';
import { useContext } from 'react';
import { Route, Routes } from 'react-router-dom';
import LoadContext from 'store/loadContext';

const App = () => {
  const loadCtx = useContext(LoadContext);
  return (
    <>
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/login' element={<StartPage />} />
        <Route path='/create-role' element={<RolePage />} />
      </Routes>
      {loadCtx.isLoading && <Loading />}
      {loadCtx.isSwitchScene && <SwitchScene />}
    </>
  );
};

export default App;
