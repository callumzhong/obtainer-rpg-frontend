import doBehaviorEvent from './event/doBehaviorEvent';
/**
 * @param {object} sourceLayer 圖層資料 (依賴參考更新)
 */
const mountEventLoop = (sourceLayer, gameObject) => {
	setTimeout(() => {
		doBehaviorEvent(sourceLayer, gameObject);
	}, 10);
};

export default mountEventLoop;
