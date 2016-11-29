// JavaScript Document
var mumObj=function(){
	this.x;
	this.y;
	this.angle;
	//mumeys
	this.mumeysCount=0;
	this.mumeysTimer=0;
	this.mumeysInterVal=1000;
	//mumtail
	this.mumtailCount=0;
	this.mumtailTimer=0;
	//mumBody
	this.mumbodyCount=0;
}
mumObj.prototype.init=function(){
	this.x=canWidth/2;
	this.y=canHeight/2;
	this.angle=0;
}
mumObj.prototype.draw=function(){
	this.x = lerpDistance(mx, this.x, 0.9);		//向鼠标当前位置平滑移动
	this.y = lerpDistance(my, this.y, 0.9);
	
	var deltaX=mx-this.x;
	var deltaY=my-this.y;
	var beta=Math.atan2(deltaY, deltaX) + Math.PI; 
	this.angle=lerpAngle(beta, this.angle, 0.7);
	
	this.mumeysTimer+=detle;
	if(this.mumeysTimer>this.mumeysInterVal){
		this.mumeysCount=(this.mumeysCount+1)%2;
		this.mumeysTimer%=this.mumeysInterVal;
		if(this.mumeysCount==0){
			this.mumeysInterVal=Math.random()*1000+1000;
		}else{
			this.mumeysInterVal=200;
		}
	}
	
	this.mumtailTimer+=detle;
	if(this.mumtailTimer>50){
		this.mumtailCount=(this.mumtailCount+1)%8;
		this.mumtailTimer%=50;
	}
	cxt1.save();
	cxt1.translate(this.x,this.y);
	cxt1.rotate(this.angle);
	var mumbodyCount=this.mumbodyCount;
	if(data.double==1){
		cxt1.drawImage(mumbodyOra[mumbodyCount],-mumbodyOra[mumbodyCount].width/2,-mumbodyOra[mumbodyCount].height/2);
	}else{
		cxt1.drawImage(mumbodyBlue[mumbodyCount],-mumbodyBlue[mumbodyCount].width/2,-mumbodyBlue[mumbodyCount].height/2);
	}
	var mumeysCount=this.mumeysCount;
	cxt1.drawImage(mumeyes[mumeysCount],-mumeyes[mumeysCount].width/2,-mumeyes[mumeysCount].height/2);
	var mumtailCount=this.mumtailCount
	cxt1.drawImage(mumtail[mumtailCount],-mumtail[mumtailCount].width/2+30,-mumtail[mumtailCount].height/2);
	cxt1.restore();
}