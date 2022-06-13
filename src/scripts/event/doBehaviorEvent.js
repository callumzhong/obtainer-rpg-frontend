import { clone } from 'ramda';
import allocateEvent from './allocateEvent';
const doBehaviorEvent = async (
	setEventState,
	isCutscenePlaying,
	layer,
	gameObject,
) => {
	const state = {
		gameObjects: clone(layer.gameObjects),
		walls: { ...layer.walls },
	};
	let behaviorLoopIndex = gameObject.behaviorLoopIndex;
	if (
		isCutscenePlaying ||
		gameObject.behaviorLoop.length === 0 ||
		gameObject.isStanding
	) {
		return state;
	}

	//Setting up our event with relevant info
	let eventConfig = gameObject.behaviorLoop[behaviorLoopIndex];
	eventConfig.who = gameObject.id;

	//Create an event instance out of our next event config
	const updated = await allocateEvent(setEventState, {
		state,
		event: eventConfig,
	});
	console.log(updated);
	//Setting the next event to fire
	behaviorLoopIndex += 1;
	if (behaviorLoopIndex === gameObject.behaviorLoop.length) {
		behaviorLoopIndex = 0;
	}
	return {
		gameObject: {
			behaviorLoopIndex,
			...updated.gameObject,
		},
		walls: updated.walls,
	};
};

export default doBehaviorEvent;
