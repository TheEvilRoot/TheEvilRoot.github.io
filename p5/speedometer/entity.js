class Entity {

	constructor (x, y, radius) {
		this.pos = createVector(x, y);
		this.vel = createVector();
		this.acc = createVector();
		this.maxVel = 10;
		this.maxF = 2;

		this.radius = radius ? radius : 10;
	}

	update() {
		this.pos.add(this.vel);
		this.vel.add(this.acc);
		if (this.speedometer) { 
			this.vel.limit(this.speedometer.max);
			this.speedometer.cur = this.vel.mag();
		}
		// console.log(this.vel.mag());

		this.acc.mult(0);
		this.vel.mult(0.99);
	}

	draw() {
		push();

		noStroke();
		fill(255);

		ellipse(this.pos.x, this.pos.y, this.radius * 2);

		pop();
	}

	applyForce(force) {
		// force.limit(this.maxF);
		this.acc.add(force);
	}

	isPoked(x, y) {
		let d = dist(this.pos.x, this.pos.y, x, y);

		return d < this.radius;
	}

	edges() {

		if (
				this.pos.x < this.radius ||
				this.pos.x > width - this.radius ||
				this.pos.y < this.radius ||
				this.pos.y > height - this.radius
			) {
			this.vel.mult(-1);
		}

	}

	attach(speedometer) {
		this.speedometer = speedometer;
	}

}