class Sprite {
	constructor({ box, position, velocity, image }) {
		this.box = box;
		this.position = position;
		this.image = image;
	}

	left() {
		this.position.x -= 16;
	}
	right() {
		this.position.x += 16;
	}
	top() {
		this.position.y -= 16;
	}
	down() {
		this.position.y += 16;
	}
}
export default Sprite;
