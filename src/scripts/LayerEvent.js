import emitter, { eventName } from 'emitter';
import oppositeDirection from 'utils/oppositeDirection';
class LayerEvent {
  constructor({ map, event }) {
    this.map = map;
    this.event = event;
  }

  stand(resolve) {
    const who = this.map.gameObjects[this.event.who];
    who.startBehavior(
      {
        map: this.map,
      },
      {
        type: 'stand',
        direction: this.event.direction,
        time: this.event.time,
      },
    );

    const completeHandler = (e) => {
      if (e.whoId === this.event.who) {
        emitter.off(eventName.stand, completeHandler);
        resolve();
      }
    };
    emitter.on(eventName.stand, completeHandler);
  }

  walk(resolve) {
    const who = this.map.gameObjects[this.event.who];
    who.startBehavior(
      {
        map: this.map,
      },
      {
        type: 'walk',
        direction: this.event.direction,
        retry: true,
      },
    );

    const completeHandler = (e) => {
      if (e.whoId === this.event.who) {
        emitter.off(eventName.walk, completeHandler);
        resolve();
      }
    };
    emitter.on(eventName.walk, completeHandler);
  }

  conversation(resolve, setEvent) {
    if (this.event.faceHero) {
      const obj = this.map.gameObjects[this.event.faceHero];
      obj.direction = oppositeDirection(this.map.gameObjects['hero'].direction);
    }
    setEvent({
      type: this.event.type,
      who: this.event.who,
      onComplete: () => {
        resolve();
        setEvent({});
      },
    });
  }

  changeMap(resolve, setEvent) {
    setEvent({
      type: this.event.type,
      text: this.event.map,
      onComplete: () => {
        resolve();
        setEvent({});
      },
    });
  }

  init(setEvent) {
    return new Promise((resolve) => {
      this[this.event.type](resolve, setEvent);
    });
  }
}

export default LayerEvent;
