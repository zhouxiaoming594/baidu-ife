// JavaScript Document
function momFuritCollision(){
	if(!data.gameOver){
		for(var i=0;i<fruit.num;i++){
			if(fruit.alive[i]){
				var l = calLength2(fruit.x[i], fruit.y[i], mum.x, mum.y);
				if(l<400){
					fruit.dead(i);
					if(fruit.fruitType[i]=="black"){
						wave.born(fruit.x[i],fruit.y[i],"black");
						data.lifeNum--;
						if(data.lifeNum==0){
							data.gameOver=true;
						}
						data.fruitNum=0;
						mum.mumbodyCount=0;
						data.double=1;
					}else{
						data.fruitNum++;
						mum.mumbodyCount++;
						if(mum.mumbodyCount>7){
							mum.mumbodyCount=7;
						}
						if(fruit.fruitType[i]=="blue"){
							data.double=2;
							wave.born(fruit.x[i],fruit.y[i],"blue");
						}else{
							wave.born(fruit.x[i],fruit.y[i],"org");
						}
					}	
				}
			}	
		}
	}
}
function mombabycollision(){
	if(!data.gameOver){
		if(mum.mumbodyCount){
			var l=calLength2(baby.x, baby.y, mum.x, mum.y);
			if(l<400){
				wave.born(baby.x,baby.y,"red");
				baby.babyBodyCount=0;
				mum.mumbodyCount=0;
				data.addScore();
			}	
		}
	}
}