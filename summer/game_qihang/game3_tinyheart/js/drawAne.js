// JavaScript Document
var aneObj = function(){
	this.rootx = [];
	this.headx = [];
	this.heady = [];
	this.alpha = 0;
	this.amp = [];
}
aneObj.prototype.num=30;
aneObj.prototype.init=function(){
	for(var i=0;i<this.num;i++){
		this.rootx[i]=i*26+Math.random()*20;
		this.headx[i]=this.rootx[i];
		this.heady[i]=canHeight-270+Math.random()*50;
		this.amp[i]=Math.random()*50+30;
	}
}
aneObj.prototype.draw=function(){
	this.alpha+=detle*0.002;
	var l=Math.sin(this.alpha);
	cxt2.save();
	cxt2.lineWidth=20;
	cxt2.strokeStyle="#009966";
	cxt2.globalAlpha=0.6;
	cxt2.lineCap = "round";
	for(var i=0;i<this.num;i++){
		cxt2.beginPath();
		cxt2.moveTo(this.rootx[i],canHeight);
		this.headx[i] = this.rootx[i] + l*this.amp[i]*0.6;
		cxt2.quadraticCurveTo(this.rootx[i],canHeight-100,this.headx[i],this.heady[i]);
		cxt2.stroke();
		cxt2.closePath();
	}
	cxt2.restore();
}