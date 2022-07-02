import LayerEvent from 'scripts/LayerEvent';

const doBehaviorEvent = async ({ updateState, isCutscenePlaying, map }) => {
  //Don't do anything if there is a more important cutscene or I don't have config to do anything
  //anyway.
  if (isCutscenePlaying || this.behaviorLoop.length === 0 || this.isStanding) {
    return;
  }

  //Setting up our event with relevant info
  let eventConfig = this.behaviorLoop[this.behaviorLoopIndex];
  eventConfig.who = this.id;

  //Create an event instance out of our next event config
  const eventHandler = new LayerEvent({ map, event: eventConfig });
  await eventHandler.init();

  //Setting the next event to fire
  this.behaviorLoopIndex += 1;
  if (this.behaviorLoopIndex === this.behaviorLoop.length) {
    this.behaviorLoopIndex = 0;
  }

  //Do it again!
  this.doBehaviorEvent(map);
};

const useDoBehaviorEvent = () => {};
