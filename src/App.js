import Loading from 'components/loading/Loading';
import SwitchScene from 'modules/switchScene/SwitchScene';
import StartPage from 'pages/Start';
import { useContext } from 'react';
import { Route, Routes } from 'react-router-dom';
import LoadContext from 'store/loadContext';

const App = () => {
  const loadCtx = useContext(LoadContext);
  return (
    <>
      <Routes>
        <Route path='/' element={<StartPage />} />
      </Routes>
      {loadCtx.isLoading && <Loading />}
      {true && <SwitchScene />}
    </>
  );
};

export default App;
