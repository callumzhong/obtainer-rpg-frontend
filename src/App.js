import { Route, Routes } from 'react-router-dom';
import BlacksmithPage from './pages/Blacksmith';
const App = () => {
	return (
		<Routes>
			<Route path='/' element={<BlacksmithPage />} />
			{/* <Route path='/village' element={<VillagePage />} /> */}
		</Routes>
	);
};

export default App;
