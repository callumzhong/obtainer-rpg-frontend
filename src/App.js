import List from 'modules/List';

const App = () => {
	return (
		// <Routes>
		// 	{/* <Route path='/' element={<BlacksmithPage />} />
		// 	<Route path='/village' element={<VillagePage />} /> */}
		// </Routes>
		<div className='rpgui-content mx-5 mt-5'>
			<List items={['你好嗎', '我不好']} />
		</div>
	);
};

export default App;
