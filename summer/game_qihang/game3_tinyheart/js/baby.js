// JavaScript Document
var babyObj=function(){
	this.x;
	this.y;
	this.angle;
	//babyEye
	this.eyesCount=0;
	this.eyesTimer=0;
	this.eyeInterval=1000;
	//babyTail
	this.tailCount=0;
	this.tailTimer=0;
	//babyBody
	this.babyBodyCount=0;
	this.babyBodyTimer=0;
}
babyObj.prototype.init=function(){
	this.x=canWidth/2-50;
	this.y=canHeight/2+50;
	this.angle=0;
}
babyObj.prototype.draw=function(){
	this.x = lerpDistance(mum.x+30, this.x, 0.96);
	this.y = lerpDistance(mum.y+30, this.y, 0.96);
	
	var deltaX=mum.x-this.x;
	var deltaY=mum.y-this.y;
	var beta=Math.atan2(deltaY, deltaX) + Math.PI; 
	this.angle=lerpAngle(beta, this.angle, 0.7);
	//小鱼眨眼
	this.eyesTimer+=detle;
	if(this.eyesTimer>this.eyeInterval){
		this.eyesCount=(this.eyesCount+1)%2;
		this.eyesTimer%=this.eyeInterval;
		if(this.eyesCount==0){
			this.eyeInterval=Math.random()*1000+1000;
		}else {
			this.eyeInterval=200;
		}
	}
	//小鱼摇尾
	this.tailTimer+=detle;
	if(this.tailTimer>50){
		this.tailCount=(this.tailCount+1)%8;
		this.tailTimer%=50;
	}
	//小鱼褪色
	this.babyBodyTimer+=detle;
	if(this.babyBodyTimer>200){
		this.babyBodyCount=(this.babyBodyCount+1);
		if(this.babyBodyCount==20){
			this.babyBodyCount=19;
			data.gameOver=true;
		}
		this.babyBodyTimer%=200;
	}
	
	cxt1.save();
	cxt1.translate(this.x,this.y);
	cxt1.rotate(this.angle);
	var babyBodyCount=this.babyBodyCount;
	cxt1.drawImage(babybody[babyBodyCount],-babybody[babyBodyCount].width/2,-babybody[babyBodyCount].height/2);
	var eyesCount=this.eyesCount;
	cxt1.drawImage(babyeyes[eyesCount],-babyeyes[eyesCount].width/2,-babyeyes[eyesCount].height/2);
	var tailCount=this.tailCount;
	cxt1.drawImage(babytail[tailCount],-babytail[tailCount].width/2+25,-babytail[tailCount].height/2);
	cxt1.restore();
}