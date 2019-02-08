
var ge;
var entities = [];

function setup() {
	createCanvas(600, 600);
	ge = new GravityEntity(width / 2, height / 2, 10);

	for (var i = 0; i < 15; i++) {
		entities.push(new Entity(random(width), random(height)));
	}
}

function draw() {
	background(51);

	for (var e of entities) {
		e.draw();
		e.update();
		e.edges();
		e.gravityBehavour(ge);
		// e.applyForce(p5.Vector.random2D());
	}

	ge.draw();

}