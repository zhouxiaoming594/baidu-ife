// JavaScript Document
var dustObj=function(){
	this.x=[];
	this.y=[];
	this.alpha = 0;
	this.amp = [];
	this.rand=[];
}
dustObj.prototype.num=30;
dustObj.prototype.init=function(){
	for(var i=0;i<this.num;i++){
		this.x[i]=Math.random()*canWidth;
		this.y[i]=Math.random()*canHeight;
		this.rand[i]=Math.floor(Math.random()*7);
		this.amp[i]=Math.random()*50+30;
	}
}
dustObj.prototype.draw=function(){
	this.alpha+=detle*0.002;
	var l=Math.sin(this.alpha);
	for(var i=0;i<this.num;i++){
		var ImgNum=this.rand[i];
		var x = this.x[i] + l*this.amp[i]*0.6;
		cxt1.drawImage(dustImg[ImgNum],x,this.y[i],-dustImg[ImgNum].width,-dustImg[ImgNum].height);
	}
}