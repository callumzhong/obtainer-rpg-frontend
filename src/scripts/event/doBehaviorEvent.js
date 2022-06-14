import allocateEvent from './allocateEvent';

/**
 * @param {object} sourceLayer 圖層資料(需異動狀態)(依賴參考)
 */
const doBehaviorEvent = async (sourceLayer, gameObject) => {
	if (
		sourceLayer.isCutscenePlaying ||
		gameObject.behaviorLoop.length === 0 ||
		gameObject.isStanding
	) {
		return;
	}
	let behaviorLoopIndex = gameObject.behaviorLoopIndex;
	const eventConfig = gameObject.behaviorLoop[behaviorLoopIndex];
	eventConfig.who = gameObject.id;
	await allocateEvent(sourceLayer, eventConfig);

	behaviorLoopIndex += 1;
	if (behaviorLoopIndex === gameObject.behaviorLoop.length) {
		behaviorLoopIndex = 0;
	}
	sourceLayer.gameObjects[eventConfig.who].behaviorLoopIndex =
		behaviorLoopIndex;

	doBehaviorEvent(sourceLayer, sourceLayer.gameObjects[eventConfig.who]);
};

export default doBehaviorEvent;
