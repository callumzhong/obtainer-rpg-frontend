import BlacksmithPage from './pages/Blacksmith';

const App = () => {
	// const [directions, setDirections] = useState([]);
	// const keyDownHandler = useCallback(
	// 	(event) => {
	// 		const dir = keyCodeMap[event.code];
	// 		if (dir && directions.indexOf(dir) === -1) {
	// 			setDirections((val) => {
	// 				val.unshift(dir);
	// 				return val;
	// 			});
	// 		}
	// 	},
	// 	[directions],
	// );

	// const keyUpHandler = useCallback(
	// 	(event) => {
	// 		const dir = keyCodeMap[event.code];
	// 		const index = directions.indexOf(dir);
	// 		if (index > -1) {
	// 			setDirections((val) => {
	// 				val.splice(index, 1);
	// 				return val;
	// 			});
	// 		}
	// 	},
	// 	[directions],
	// );
	// useEffect(() => {
	// 	document.addEventListener('keydown', keyDownHandler);
	// 	document.addEventListener('keyup', keyUpHandler);

	// 	return () => {
	// 		document.removeEventListener('keydown', keyDownHandler);
	// 		document.removeEventListener('keyup', keyUpHandler);
	// 	};
	// }, [keyDownHandler, keyUpHandler]);

	return <BlacksmithPage />;
};

export default App;
