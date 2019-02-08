


class Node {

	constructor (data) {
		this.data = data;
		this.next = null;
		this.radius = 20;
	}

	push(data) {
		if (this.next == null) {
			this.next = new Node(data);
		} else {
			this.next.push(data);
		}
	}

	draw(x, y) {

		push();

		noStroke();
		fill(255);
		ellipse(x, y, this.radius * 2);
		
		noStroke();
		fill(0);
		textAlign(CENTER, CENTER);
		text(this.data, x, y);


		if (this.next != null) {
			let newY = y + this.radius * 3;

			stroke(255);
			strokeWeight(3);
			noFill();
			line(x, y + this.radius, x, newY - this.radius);
			pop();

			this.next.draw(x, newY);
		} else {
			pop();
		}
	}

	clickNode(x,y, myX, myY, i) {
		let d = dist(x, y, myX, myY);

		if (d < this.radius) {
			return {node: this, level: i};
		}

		if (this.next == null) {
			return null;
		}

		return this.next.clickNode(x, y, myX, myY + this.radius * 3, i + 1);
	}

	copy(withChilds) {
		let newNode = new Node(this.data);
		newNode.radius = this.radius;
		if (withChilds && this.next != null) {
			newNode.next = this.next.copy(withChilds);
		}

		return newNode;
	}

}

class Stack {

	constructor (x, y) {
		this.root = null;
		this.pos = createVector(x, y);
	}

	empty() {
		return this.root == null;
	}

	push(data) {
		let newNode = new Node(data);

		newNode.next = this.root;
		this.root = newNode;
	}

	pop() {

		if (this.empty()) {
			return null;
		}

		let data = this.root.data;

		this.root = this.root.next;

		return data;
	}

	peek() {

		if (this.empty()) {
			return null;
		}

		return this.root.data;
	}

	draw() {

		if (this.empty()) {
			return;
		}

		this.root.draw(this.pos.x, this.pos.y);
	}

	clickNode(x, y) {
		if (this.empty())  {
			return null;
		}

		return this.root.clickNode(x, y, this.pos.x, this.pos.y, 1);
	}

}

var stack;

var picked = [];

function setup() {
	createCanvas(600, 900);
	stack = new Stack(width/2, 20);
	for (var i = 0; i < 15; i++) {
		stack.push(i);
	}
}

function keyPressed() {
	if (!isNaN(key)) {
		stack.push(key - 0);
	}
}

function mousePressed() {
	let result = stack.clickNode(mouseX, mouseY);

	if (result != null) {

		let node = result.node;
		let level = result.level;

		picked.push(node.copy(false));

		for (var i = 0; i < level; i++) {
			stack.pop();
		}

	} else {
		for (var i = picked.length - 1; i >= 0; i--) {
			let p = picked[i];
			let pickedY = p.radius * 3 * i + p.radius;

			result = p.clickNode(mouseX, mouseY, 20, pickedY);
			if (result != null) {
				stack.push(p.data);
				picked.splice(i, 1);
			}
		}
	}
}


function draw() {
	background(51);
	stack.draw();

	for (var i = 0; i < picked.length; i++) {

		let p = picked[i];

		p.draw(20, p.radius * 3 * i + p.radius);

	}
}













