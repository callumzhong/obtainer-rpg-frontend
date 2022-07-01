import mitt from 'mitt';
const emitter = mitt();

export const eventName = {
  stand: 'PersonStandComplete',
  walk: 'PersonWalkingComplete',
};
export default emitter;
