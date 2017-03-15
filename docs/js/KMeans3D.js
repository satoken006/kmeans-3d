var box_x = 800;
var box_y = 800;
var box_z = 800;
var DIST_MAX;

var NODE_NUM, GRAVITY_NUM;
var node, gravity;
// true: 重心の位置設定、false: ノードの再振り分け
var updateGPoints;

var isAnimating = false;
var frame = 0;
var FRAME_MAX = 40;

function setup(){
	createCanvas(700, 700, WEBGL);
	DIST_MAX = sqrt( sq(box_x) + sq(box_y) + sq(box_z) );
	noStroke();
	colorMode(HSB, 100);
	init();
}

function draw(){
	background(51);
	ambientLight(51);

	rotateX(frameCount * PI/2700);
	rotateY(frameCount * PI/5400);
	rotateZ(frameCount * PI/8100);
	//rotate(frameCount * PI/2700, [1, 0, 0]);
	//rotate(frameCount * PI/5400, [0, 1, 0]);
	//rotate(frameCount * PI/8100, [0, 0, 1]);

	push();
	translate(box_x, 0, 0);
	box(box_x, 1, 1);
	pop();

	push();
	translate(0, box_y, 0);
	box(1, box_y, 1);
	pop();

	push();
	translate(0, 0, box_z);
	box(1, 1, box_z);
	pop();

	if( isAnimating ){
		frame += updateGPoints ? 1 : 2;
		if( frame >= FRAME_MAX ){
			for( var i = 0 ; i < GRAVITY_NUM ; i ++ ){
				gravity[i].oldPos = gravity[i].newPos;
			}
			for( var i = 0 ; i < NODE_NUM ; i ++ ){
				node[i].belongTo = node[i].newBelongTo;
				node[i].hueValue = node[i].newHueValue;
			}
			isAnimating = false;
			updateGPoints ^= true;
		}
	}
	
	for( var i = 0 ; i < node.length ; i ++ ){
		node[i].draw();
	}
	directionalLight(0, 0, 255, 0.5, 0.25, 0.25);
	
	for( var i = 0 ; i < gravity.length ; i ++ ){
		gravity[i].draw();
	}
	
}