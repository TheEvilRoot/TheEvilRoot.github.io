class Speedometer {

	constructor (x, y) {
		this.x = x;
		this.y = y;

		this.radius = 100;
		this.max = 30;
		this.cur = 0;
	}

	draw() {
		push();

		noFill();
		stroke(color(255,255,255,100));
		strokeWeight(3);

		arc(this.x, this.y, this.radius * 2, this.radius * 2,PI, 0);

		noStroke();
		fill(255);
		textAlign(CENTER, CENTER);
		text('0', this.x - this.radius, this.y + 10);
		text(this.max.toString(), this.x + this.radius, this.y  + 10);
		text(round(this.cur).toString(), this.x, this.y + 10);

		let angle = map(this.cur, 0, this.max, 0, PI);

		let x = this.radius * cos(angle);
		let y = this.radius * sin(angle);

		// console.log(angle);
		let col = lerpColor(color(255,255,255), color(255,0,0), this.cur/this.max);
		stroke(col);
		noFill();
		strokeWeight(2);
 		line (this.x,this.y, this.x - x,this.y - y);

		pop();
	}

}