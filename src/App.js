import { Route, Routes } from 'react-router-dom';
import BlacksmithPage from './pages/Blacksmith';
import VillagePage from './pages/Village';
const App = () => {
	return (
		<Routes>
			<Route path='/' element={<BlacksmithPage />} />
			<Route path='/village' element={<VillagePage />} />
		</Routes>
	);
};

export default App;
