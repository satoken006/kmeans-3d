function GravityPoint( id, x, y, z, hue ){
	this.id = id;
	this.pos = createVector(x, y, z);
	this.oldPos = createVector(x, y, z);
	this.newPos = createVector(x, y, z);
	this.hueValue = hue;
}

GravityPoint.prototype.draw = function(){
	specularMaterial(this.hueValue, 100, 100);
	if( isAnimating && updateGPoints ){
		this.pos.x = ((FRAME_MAX-frame)*this.oldPos.x + frame*this.newPos.x)/FRAME_MAX;
		this.pos.y = ((FRAME_MAX-frame)*this.oldPos.y + frame*this.newPos.y)/FRAME_MAX;
		this.pos.z = ((FRAME_MAX-frame)*this.oldPos.z + frame*this.newPos.z)/FRAME_MAX;
	}
	push();
	translate(this.pos.x, this.pos.y, this.pos.z);
	sphere(15);
	pop();
}

GravityPoint.prototype.setNewPosition = function(){
	this.oldPos = this.pos;
	this.newPos = createVector(0, 0, 0);
	var count = 0;

	for( var i = 0 ; i < node.length ; i ++ ){
		if( node[i].belongTo != this.id ){ continue; }

		this.newPos.add( node[i].pos );
		count ++;
	}

	this.newPos.div(count);
}