import nextPosition from 'utils/nextPosition';
import withGrid from 'utils/withGrid';
import LayerEvent from './LayerEvent';
class LayerMap {
	constructor(config) {
		this.gameObjects = config.gameObjects;
		this.cutsceneSpaces = config.cutsceneSpaces || {};
		this.walls = config.walls || {};

		this.lowerImage = new Image();
		this.lowerImage.src = config.lowerSrc;
		this.upperImage = new Image();
		this.upperImage.src = config.upperSrc;

		this.isCutscenePlaying = false;
	}

	drawLowerImage(ctx, cameraPerson) {
		ctx.drawImage(
			this.lowerImage,
			withGrid(10.5) - cameraPerson.x,
			withGrid(6) - cameraPerson.y,
		);
	}

	drawUpperImage(ctx, cameraPerson) {
		ctx.drawImage(
			this.upperImage,
			withGrid(10.5) - cameraPerson.x,
			withGrid(6) - cameraPerson.y,
		);
	}

	isSpaceTaken(currentX, currentY, direction) {
		const { x, y } = nextPosition(currentX, currentY, direction);
		return this.walls[`${x},${y}`] || false;
	}

	mountObjects(setEventState, navigate) {
		Object.keys(this.gameObjects).forEach((key) => {
			let object = this.gameObjects[key];
			object.id = key;
			object.mount(this, setEventState, navigate);
		});
	}

	async startCutscene(events, setEventState, navigate) {
		this.isCutscenePlaying = true;

		for (let i = 0; i < events.length; i++) {
			const eventHandler = new LayerEvent({
				event: events[i],
				map: this,
			});
			await eventHandler.init(setEventState, navigate);
		}

		this.isCutscenePlaying = false;

		Object.values(this.gameObjects).forEach((object) =>
			object.doBehaviorEvent(this),
		);
	}

	checkForActionCutscene(setEventState, navigate) {
		const hero = this.gameObjects['hero'];
		const nextCoords = nextPosition(hero.x, hero.y, hero.direction);
		const match = Object.values(this.gameObjects).find((object) => {
			return `${object.x},${object.y}` === `${nextCoords.x},${nextCoords.y}`;
		});
		if (!this.isCutscenePlaying && match && match.talking.length) {
			this.startCutscene(match.talking[0].events, setEventState, navigate);
		}
	}

	checkForFootstepCutscene(setEventState, navigate) {
		const hero = this.gameObjects['hero'];
		const match = this.cutsceneSpaces[`${hero.x},${hero.y}`];
		if (!this.isCutscenePlaying && match) {
			this.startCutscene(match[0].events, setEventState, navigate);
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

export default LayerMap;
