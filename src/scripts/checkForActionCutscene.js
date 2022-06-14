import nextPosition from './calc/nextPosition';
import allocateEvent from './event/allocateEvent';
import doBehaviorEvent from './event/doBehaviorEvent';
const startCutscene = async (setEventState, sourceLayer, events) => {
	sourceLayer.isCutscenePlaying = true;

	for (let i = 0; i < events.length; i++) {
		await allocateEvent(sourceLayer, { ...events[i], setEventState });
	}

	sourceLayer.isCutscenePlaying = false;

	Object.values(sourceLayer.gameObjects).forEach((object) => {
		doBehaviorEvent(sourceLayer, object);
	});
};

const checkForActionCutscene = (setEventState, sourceLayer) => {
	const hero = sourceLayer.gameObjects['hero'];
	const nextCoords = nextPosition(hero.x, hero.y, hero.direction);
	const match = Object.values(sourceLayer.gameObjects).find(
		(object) => `${object.x},${object.y}` === `${nextCoords.x},${nextCoords.y}`,
	);
	if (
		!sourceLayer.isCutscenePlaying &&
		match &&
		match.talking.length &&
		match.talking[0].events
	) {
		startCutscene(setEventState, sourceLayer, match.talking[0].events);
	}
};

export default checkForActionCutscene;
