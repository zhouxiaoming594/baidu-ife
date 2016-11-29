// JavaScript Document
var fruitObj=function(){
	this.alive=[];
	this.x=[];
	this.y=[];
	this.aneNO=[];
	this.l=[];
	this.spd=[];
	this.fruitType=[];
	this.orange=new Image();
	this.blue=new Image();
	this.black=new Image();
}
fruitObj.prototype.num=30;
fruitObj.prototype.init=function(){
	for(var i=0;i<this.num;i++){
		this.alive[i]=false;
		this.x[i]=0;
		this.y[i]=0;
		this.aneNO[i]=0;
		this.l[i]=0;
		this.spd[i]=Math.random()*0.1+0.1;
		this.fruitType[i]="";
	}
	this.orange.src="./img/fruit.png";
	this.blue.src="./img/blue.png";
	this.black.src="./img/black.png";
}
fruitObj.prototype.draw=function(){
	cxt2.save();
	for(var i=0;i<this.num;i++){
		var img;
		if(this.alive[i]){
			if(this.fruitType[i]=="orange"){
				 img=this.orange;
			}else{
				if(this.fruitType[i]=="blue"){
					 img=this.blue;
				}else{
					 img=this.black;
				}
			}
			if(this.l[i]<15){
				this.l[i]+=this.spd[i]*detle*0.1;
				this.x[i]=ane.headx[this.aneNO[i]]-this.l[i]/2;
				this.y[i]=ane.heady[this.aneNO[i]]-this.l[i]/2;
				
				cxt2.drawImage(img,this.x[i],this.y[i],this.l[i],this.l[i]);
			}else{
				this.y[i]-=this.spd[i]*detle;
				cxt2.drawImage(img,this.x[i],this.y[i],this.l[i],this.l[i]);
				}
			if(this.y[i]<0){
				fruit.dead(i);
			}
		}
	}
	cxt2.restore();
}
fruitObj.prototype.born=function(i){
	this.l[i]=0;
	this.aneNO[i]=Math.floor(Math.random()*ane.num);
	this.alive[i]=true;
	var fruRand=Math.random();
	if(fruRand<0.2){
		this.fruitType[i]="black";
	}else{
		if(fruRand>0.8){
			this.fruitType[i]="blue";	
		}else{
		this.fruitType[i]="orange";
		}
	}
}
fruitObj.prototype.dead=function(i){
	this.alive[i]=false;
}
function fruitMonitor(){
	var num=0;
	for(var i=0;i<fruit.num;i++){
		if(fruit.alive[i]){
			num++;
		}
	}
	if(num<15){
		sendFruit();
		return;
	}
	
}
function sendFruit(){
	for(var i=0;i<fruit.num;i++){
		if(!fruit.alive[i]){
			fruit.born(i);
			return;
		}
	}	
}