import Loading from 'modules/loading/Loading';
import StartPage from 'pages/Start';
import { useContext } from 'react';
import { Route, Routes } from 'react-router-dom';
import LoadingContext from 'store/loadingContext';

const App = () => {
  const loadingCtx = useContext(LoadingContext);
  return (
    <>
      <Routes>
        <Route path='/' element={<StartPage />} />
      </Routes>
      {loadingCtx.isLoading && <Loading />}
    </>
  );
};

export default App;
