import nextPosition from '../utils/nextPosition';
import withGrid from '../utils/withGrid';
import OverworldEvent from './OverworldEvent';

class OverworldMap {
	constructor(params) {
		this.gameObjects = params.gameObjects;
		this.walls = params.walls || {};

		this.lowerImage = new Image();
		this.lowerImage.src = params.lowerSrc;
		this.upperImage = new Image();
		this.upperImage.src = params.upperSrc;
		this.isCutscenePlaying = false; // 過場時設為 true
	}

	drawLowerImage(ctx, cameraPerson) {
		ctx.drawImage(
			this.lowerImage,
			withGrid(10.5) - cameraPerson.x,
			withGrid(6) - cameraPerson.y,
		);
	}

	// 建築物用
	drawUpperImage(ctx, cameraPerson) {
		ctx.drawImage(
			this.upperImage,
			withGrid(10.5) - cameraPerson.x,
			withGrid(6) - cameraPerson.y,
		);
	}
	isSpaceTake(currentX, currentY, direction) {
		const { x, y } = nextPosition(currentX, currentY, direction);
		return this.walls[`${x},${y}`] || false;
	}

	mountObjects() {
		Object.keys(this.gameObjects).forEach((key) => {
			let object = this.gameObjects[key];
			object.id = key;
			// 目的是加入角色碰撞前驗證是否已掛載
			object.mount(this);
		});
	}

	async startCutscene(events) {
		this.isCutscenePlaying = true;

		for (let i = 0; i < events.length; i++) {
			const eventHandler = new OverworldEvent({
				event: events[i],
				map: this,
			});
			await eventHandler.init();
		}

		this.isCutscenePlaying = false;
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

export default OverworldMap;
