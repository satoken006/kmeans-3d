$(document).ready(function(){
	$('#stepButton').on( 'click', function(){
		if(  !isAnimating ){
			if( updateGPoints ){
				for( var i = 0 ; i < gravity.length ; i ++ ){
					gravity[i].setNewPosition();
				}
			}else{
				for( var i = 0 ; i < NODE_NUM ; i ++ ){
					node[i].updateBelongTo();
				}
			}
			isAnimating = true;
			frame = 0;
		}
	});

	$('#updateButton').on( 'click', function(){
		if( $('#nodeNum').val() > 1000 ){
			$('#nodeNum').val( 1000 );
		}else if( $('#nodeNum').val() < 10 ){
			$('#nodeNum').val( 10 );
		}
		if( $('#gravityNum').val() > 50 ){
			$('#gravityNum').val( 50 );
		}else if( $('#gravityNum').val() < 2 ){
			$('#gravityNum').val( 2 );
		}
		NODE_NUM = $('#nodeNum').val();
		GRAVITY_NUM = $('#gravityNum').val();
		init();
	} );

});


function init(){
	node = [];
	gravity = [];
	updateGPoints = true;
	NODE_NUM = $('#nodeNum').val();
	GRAVITY_NUM = $('#gravityNum').val();

	for( var i = 0 ; i < GRAVITY_NUM ; i ++ ){
		var rx = random(-box_x/2, box_x/2);
		var ry = random(-box_y/2, box_y/2);
		var rz = random(-box_z/2, box_z/2);
		var g = new GravityPoint(i, rx, ry, rz, 100/GRAVITY_NUM * i);
		gravity.push(g);
	}
	// ノードの位置設定
	for( var i = 0 ; i < NODE_NUM ; i ++ ){
		var n = new KNode(random(-box_x/2, box_x/2), random(-box_y/2, box_y/2), random(-box_z/2, box_z/2));
		node.push(n);
	}
	// ノードと重心を結ぶ
	for( var i = 0 ; i < NODE_NUM ; i ++ ){
		node[i].updateBelongTo();
		node[i].hueValue = gravity[node[i].newBelongTo].hueValue;
		node[i].belongTo = node[i].newBelongTo;
	}
}