let walls = [];
let ray;
let particle;
let xoff = 0;
let yoff = 1000;
let sliderFOV;
var sceneW;
var sceneH;

function setup() {
    sceneW = windowWidth/2;
    sceneH = windowHeight - 50;

    for (let i = 0; i < 5; i++) {
        x1 = random(sceneW);
        y1 = random(sceneH);
        x2 = random(sceneW);
        y2 = random(sceneH);

        walls[i] = new Boundary(x1, y1, x2, y2);
    }

    walls.push(new Boundary(-1, -1, sceneW, -1));
    walls.push(new Boundary(-1, -1, -1, height));
    walls.push(new Boundary(sceneW, height, sceneW, -1));
    walls.push(new Boundary(sceneW, height, -1, sceneW));

    particle = new Particle();

    sliderFOV = createSlider(0, 360, 60);
    sliderFOV.input(changeFOV);

}

function changeFOV() {
    const fov = sliderFOV.value();
    particle.updateFOV(fov);
}

function draw() {
    var cnv = createCanvas(windowWidth, windowHeight - 50);
    cnv.style('display', 'block');

    var sceneW = windowWidth/2;
    var sceneH = windowHeight;

    if (keyIsDown(LEFT_ARROW)) {
        particle.rotate(-0.1);
    } else if (keyIsDown(RIGHT_ARROW)) {
        particle.rotate(0.1);
    } else if (keyIsDown(UP_ARROW)) {
        particle.move(1);
    } else if (keyIsDown(DOWN_ARROW)) {
        particle.move(-1);
    }

    background(20);

    for (let wall of walls) {
        wall.show();
    }

    //particle.update(noise(xoff) * sceneW, noise(yoff) * sceneH);
    //particle.update(mouseX, mouseY);

    particle.show();

    const scene = particle.look(walls);
    const w = sceneW/scene.length;

    push();
    translate(sceneW, 0);

    for (let i = 0; i < scene.length; i++) {
        noStroke();
        const sq = scene[i] * scene[i];
        const wSq = sceneW * sceneW;
        const b = map(sq, 0, wSq, 255, 0);
        const h = map(scene[i], 0, sceneW, sceneH, 0);
        fill(b);
        rectMode(CENTER);
        rect(i * w + w/2, sceneH/2, w + 1 , h);
    }
    pop();

    xoff += 0.01;
    yoff +=0.01;

}
