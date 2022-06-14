import { Route, Routes } from 'react-router-dom';
import BlacksmithPage from './pages/Blacksmith';
import VillagePage from './pages/Village';
const App = () => {
	return (
		<Routes>
			<Route path='/' element={<VillagePage />} />
			<Route path='/blacksmith' element={<BlacksmithPage />} />
		</Routes>
	);
};

export default App;
