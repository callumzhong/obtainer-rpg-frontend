import { useEffect } from 'react';
import Camera from './layouts/Camera';
import HomePage from './pages/Home';

const actions = {
	w: 'top',
	a: 'left',
	s: 'down',
	d: 'right',
};

const animations = [];
const App = () => {
	useEffect(() => {
		window.addEventListener('keydown', (e) => {
			const action = actions[e.key];
			if (action && animations.indexOf(action) === -1) {
				animations.unshift(action);
			}
		});
		window.addEventListener('keyup', (e) => {
			const action = actions[e.key];
			const index = animations.indexOf(action);
			if (index > -1) {
				animations.splice(index, 1);
			}
		});
	}, []);

	return (
		<Camera>
			<HomePage animations={animations} />
		</Camera>
	);
};

export default App;
