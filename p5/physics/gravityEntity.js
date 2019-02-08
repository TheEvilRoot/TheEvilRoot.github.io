class GravityEntity {
	constructor (x,y,f) {
		this.x = x;
		this.y = y;
		this.force = f;
	}

	draw() {
		push();

		noStroke();
		fill(255,0,255, 100);
		ellipse(this.x, this.y, 10, 10);

		pop();
	}
}