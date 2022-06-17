import Dropdown from 'modules/Dropdown';
import List from 'modules/List';

const App = () => {
	return (
		// <Routes>
		// 	{/* <Route path='/' element={<BlacksmithPage />} />
		// 	<Route path='/village' element={<VillagePage />} /> */}
		// </Routes>
		<div className='rpgui-content mx-5 mt-5'>
			<List items={[15, 15, 151, 51, 51, 51]}></List>
			<Dropdown items={[15, 151, 1351, 3511]}></Dropdown>
		</div>
	);
};

export default App;
