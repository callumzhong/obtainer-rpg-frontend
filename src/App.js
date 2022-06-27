import SignInPage from 'pages/SignIn';
import { Route, Routes } from 'react-router-dom';

const App = () => {
  return (
    <Routes>
      <Route path='/' element={<SignInPage />} />
    </Routes>
  );
};

export default App;
