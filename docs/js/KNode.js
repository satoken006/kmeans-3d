function KNode( x, y, z ){
	this.pos = createVector(x, y, z);
	this.belongTo = -1;
	this.newBelongTo = -1;
	this.hueValue = 0;
	this.newHueValue = 0;
}

KNode.prototype.draw = function(){
	var vec_g = new GravityPoint(-1, 0, 0, 0);
	specularMaterial(this.hueValue, 100, 100);
	var h = this.hueValue;
	if( isAnimating && !updateGPoints ){
		var oldGPos = gravity[this.belongTo].pos;
		var newGPos = gravity[this.newBelongTo].pos;
		vec_g.pos.x = ((FRAME_MAX-frame)*oldGPos.x + frame*newGPos.x)/FRAME_MAX;
		vec_g.pos.y = ((FRAME_MAX-frame)*oldGPos.y + frame*newGPos.y)/FRAME_MAX;
		vec_g.pos.z = ((FRAME_MAX-frame)*oldGPos.z + frame*newGPos.z)/FRAME_MAX;
		h = ((FRAME_MAX-frame)*this.hueValue + frame*this.newHueValue)/FRAME_MAX;
		specularMaterial(h, 100, 100);
	}else{
		vec_g = gravity[this.belongTo];
	}

	push();
	translate(this.pos.x, this.pos.y, this.pos.z);
	sphere(5);
	pop();
	
	fill(h, 100, 100);
	beginShape(LINES);
	vertex(this.pos.x, this.pos.y, this.pos.z);
	vertex(vec_g.pos.x+1, vec_g.pos.y, vec_g.pos.z);
	vertex(vec_g.pos.x-1, vec_g.pos.y, vec_g.pos.z);
	vertex(vec_g.pos.x, vec_g.pos.y+1, vec_g.pos.z);
	vertex(vec_g.pos.x, vec_g.pos.y-1, vec_g.pos.z);
	vertex(vec_g.pos.x, vec_g.pos.y, vec_g.pos.z+1);
	vertex(vec_g.pos.x, vec_g.pos.y, vec_g.pos.z-1);
	endShape();
}

KNode.prototype.updateBelongTo = function(){
	var gIndex;
	var dist_min = DIST_MAX;
	for( var i = 0 ; i < gravity.length ; i ++ ){
		var vec_g = gravity[i];
		var distToGPoint = dist(this.pos.x, this.pos.y, this.pos.z, vec_g.pos.x, vec_g.pos.y, vec_g.pos.z);
		if( distToGPoint < dist_min ){
			dist_min = distToGPoint;
			gIndex = i;
		}
	}
	this.newBelongTo = gIndex;
	this.newHueValue = gravity[this.newBelongTo].hueValue
}