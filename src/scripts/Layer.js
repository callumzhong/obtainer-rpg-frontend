import nextPosition from 'utils/nextPosition';
import withGrid from 'utils/withGrid';
import LayerEvent from './LayerEvent';
class Layer {
  constructor(config) {
    this.gameObjects = config.gameObjects;
    this.cutsceneSpaces = config.cutsceneSpaces || {};
    this.walls = config.walls || {};
    this.isCutscenePlaying = false;
  }

  drawLowerImage(ctx, lower, cameraPerson, centerPoint) {
    lower.isLoaded &&
      ctx.drawImage(
        lower.image,
        withGrid(centerPoint.x) - cameraPerson.x,
        withGrid(centerPoint.y) - cameraPerson.y,
      );
  }

  drawUpperImage(ctx, upper, cameraPerson, centerPoint) {
    upper.isLoaded &&
      ctx.drawImage(
        upper.image,
        withGrid(centerPoint.x) - cameraPerson.x,
        withGrid(centerPoint.y) - cameraPerson.y,
      );
  }

  isSpaceTaken(currentX, currentY, direction) {
    const { x, y } = nextPosition(currentX, currentY, direction);
    return this.walls[`${x},${y}`] || false;
  }

  mountObjects(setEvent) {
    Object.keys(this.gameObjects).forEach((key) => {
      const object = this.gameObjects[key];
      object.id = key;
      object.mount(this, setEvent);
    });
  }

  async startCutscene(events, setEvent) {
    this.isCutscenePlaying = true;

    for (let i = 0; i < events.length; i++) {
      const eventHandler = new LayerEvent({
        event: events[i],
        map: this,
      });
      await eventHandler.init(setEvent);
    }

    this.isCutscenePlaying = false;

    Object.values(this.gameObjects).forEach((object) =>
      object.doBehaviorEvent(this),
    );
  }

  checkForActionCutscene(setEvent) {
    const hero = this.gameObjects['hero'];
    let nextCoords = nextPosition(hero.x, hero.y, hero.direction);
    let match = Object.values(this.gameObjects).find((object) => {
      return `${object.x},${object.y}` === `${nextCoords.x},${nextCoords.y}`;
    });

    if (!this.isCutscenePlaying && match && match.talking.length) {
      this.startCutscene(match.talking[0].events, setEvent);
      return;
    }

    const matchWalls = Object.keys(this.walls).includes(
      `${nextCoords.x},${nextCoords.y}`,
    );
    if (!matchWalls) return;

    nextCoords = nextPosition(nextCoords.x, nextCoords.y, hero.direction);
    match = Object.values(this.gameObjects).find((object) => {
      return `${object.x},${object.y}` === `${nextCoords.x},${nextCoords.y}`;
    });
    if (!this.isCutscenePlaying && match && match.talking.length) {
      this.startCutscene(match.talking[0].events, setEvent);
      return;
    }
  }

  checkForFootstepCutscene(setEvent) {
    const hero = this.gameObjects['hero'];
    const match = this.cutsceneSpaces[`${hero.x},${hero.y}`];
    if (!this.isCutscenePlaying && match) {
      this.startCutscene(match[0].events, setEvent);
    }
  }

  addWall(x, y) {
    this.walls[`${x},${y}`] = true;
  }
  removeWall(x, y) {
    delete this.walls[`${x},${y}`];
  }
  moveWall(wasX, wasY, direction) {
    this.removeWall(wasX, wasY);
    const { x, y } = nextPosition(wasX, wasY, direction);
    this.addWall(x, y);
  }
}

export default Layer;
