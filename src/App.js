import StartPage from 'pages/Start';
import { Route, Routes } from 'react-router-dom';

const App = () => {
  return (
    <Routes>
      <Route path='/' element={<StartPage />} />
    </Routes>
  );
};

export default App;
