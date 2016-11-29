// JavaScript Document
var dataObj=function(){
	this.fruitNum=0;
	this.double=1;
	this.score=0;
	this.alpha=0;
	this.life=new Image();
	this.lifeNum=3;
	this.gameOver=false;
}
dataObj.prototype.init=function(){
	this.lifeNum=3;
	this.life.src="./img/life.png";
}
dataObj.prototype.draw=function(){
	cxt2.save();
	cxt2.fillStyle="#fff";
	cxt2.font="20px Verdana";
	cxt2.shadowColor="white";
	cxt2.shadowBlur=5;
	cxt2.fillText('score:'+this.score,canWidth/2,canHeight-130);
	cxt2.restore();
	cxt2.save();
	cxt2.font="50px Verdana";
	cxt2.shadowColor="white";
	cxt2.shadowBlur=10;
	if(this.gameOver){
		this.alpha+=detle*0.0002;
		if(this.alpha>1){
			this.alpha=1;	
		}
		cxt2.fillStyle="rgba(255,255,255,"+this.alpha+")";
		cxt2.fillText("GAME OVER",canWidth/2,canHeight/2);	
	}
	cxt2.restore();
	for(var i=1;i<=this.lifeNum;i++){
		cxt2.drawImage(this.life,30+i*this.life.width,50,-this.life.width,-this.life.height);
	}
}
dataObj.prototype.addScore=function(){
	this.score+=this.fruitNum*10*this.double;
	this.fruitNum=0;
	this.double=1;
}