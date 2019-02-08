var entity;
var speedometer;

function setup() {
	createCanvas(600,600);
	entity = new Entity(width/2, height/2);
	speedometer = new Speedometer(width/2, height/2);
	entity.attach(speedometer);
}

function mousePressed() {
	if (entity.isPoked(mouseX, mouseY)) {
		entity.applyForce(p5.Vector.random2D());
	}
}

function draw() {
	background(51);

	entity.draw();
	entity.update();
	entity.edges();
	entity.applyForce(p5.Vector.random2D());

	speedometer.draw();

}