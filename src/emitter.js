import mitt from 'mitt';

export const eventName = {
	stand: 'PersonStandComplete',
	walk: 'PersonWalkingComplete',
};
const emitter = mitt();
export default emitter;
