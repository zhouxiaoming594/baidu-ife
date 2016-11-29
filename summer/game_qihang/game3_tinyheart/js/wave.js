// JavaScript Document
var waveObj=function(){
	this.x;
	this.y;
	this.alive=false;
	this.r;
	this.color;
}
waveObj.prototype.draw=function(){
	if(this.alive){
		if(this.r<80){
			this.r+=0.05*detle;
			var alpha = 1 - this.r/80;
			cxt1.save();
			cxt1.beginPath();
			cxt1.arc(this.x,this.y,this.r,0,Math.PI*2);
			switch(this.color){
				case "black":cxt1.strokeStyle="rgba(0,0,0," + alpha + ")";break;
				case "org":cxt1.strokeStyle="rgba(255,255,0," + alpha + ")";break;
				case "blue":cxt1.strokeStyle="rgba(0,255,255," + alpha + ")";break;
				case "red":cxt1.strokeStyle="rgba(255,0,0," + alpha + ")";break;
				default:break;
			}
			cxt1.lineWidth=2;
			cxt1.stroke();
			cxt1.closePath();
			cxt1.restore();
		}else{
			this.alive=false;	
		}	
	}
}
waveObj.prototype.born=function(x,y,color){
	this.x=x;
	this.y=y;
	this.r=10;
	this.alive=true;
	this.color=color;
}