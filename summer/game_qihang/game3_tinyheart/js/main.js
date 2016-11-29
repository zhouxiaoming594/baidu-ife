// JavaScript Document
var can1;
var cxt1;
var can2;
var cxt2;

var canWidth; 	//画布宽度
var canHeight;	//画布高度

var mx;			//鼠标坐标位置
var my;

var lastTime;	//时间
var detle;		//每帧相隔时间
var bgPic = new Image(); //背景图片
var ane;      	//海葵
var dust;
var fruit;		//果实
var mum;		//大鱼
var baby;		//小鱼
var wave;		//水纹
var data;		//分数
//小鱼图片资源
var babyeyes=[];
var babybody=[];
var babytail=[];
//大鱼图片资源
var mumeyes=[];
var mumbodyOra=[];
var mumbodyBlue=[];
var mumtail=[];
//漂浮物图片资源
var dustImg=[];
document.body.onload = game;
function game(){
	init();
	lastTime=Date.now();
	detle=0;
	gameloop();
}

function init(){
	can1 = document.getElementById('canvas1');
	cxt1 = can1.getContext("2d");
	
	can2 = document.getElementById('canvas2');
	cxt2 = can1.getContext("2d");
	
	can1.width=800;
	can1.height=600;
	can2.width=800;
	can2.height=600;
	
	canWidth = can1.width;
	canHeight = can1.height;
	
	cxt2.font="40px";
	cxt2.textAlign="center";
	
	can1.addEventListener("mousemove",onMouseMove,false);
	mx = canWidth * 0.5;
	my = canHeight * 0.5; 
	
	bgPic.src="./img/background.jpg";
	
	for(var i=0;i<2;i++){
		babyeyes[i]=new Image();
		babyeyes[i].src="./img/babyEye"+i+".png";
		
		mumeyes[i]=new Image();
		mumeyes[i].src="./img/bigEye"+i+".png";
	}
	for(var i=0;i<20;i++){
		babybody[i]=new Image();
		babybody[i].src="./img/babyFade"+i+".png";
	}
	for(var i=0;i<8;i++){
		babytail[i]=new Image();
		babytail[i].src="./img/babyTail"+i+".png";
		
		mumtail[i]=new Image();
		mumtail[i].src="./img/bigTail"+i+".png";
		
		mumbodyOra[i]=new Image();
		mumbodyOra[i].src="./img/bigSwim"+i+".png";
		
		mumbodyBlue[i]=new Image();
		mumbodyBlue[i].src="./img/bigSwimBlue"+i+".png";
	}
	for(var i=0;i<7;i++){
		dustImg[i]=new Image();
		dustImg[i].src="./img/dust"+i+".png";
	}
	ane = new aneObj();
	ane.init();
	
	dust = new dustObj();
	dust.init();
	
	fruit= new fruitObj();
	fruit.init();
	
	mum = new mumObj();
	mum.init();
	
	baby=new babyObj();
	baby.init();
	
	wave=new waveObj();
	
	data=new dataObj();
	data.init();
}
function gameloop(){
	window.requestAnimFrame(gameloop);
	var now=Date.now();
	detle=now-lastTime;
	lastTime=now;
	if(detle>50) detle=50;
	drawBackground();
	ane.draw();
	dust.draw();
	
	fruitMonitor();
	fruit.draw();
	wave.draw();
	
	mum.draw();
	baby.draw();
	data.draw();
	momFuritCollision();
	mombabycollision();
}
function onMouseMove(ev){
	if(!data.gameOver){
		if(ev.offSetX || ev.layerX){
			mx = ev.offSetX === undefined ? ev.layerX :ev.offSetX;
			my = ev.offSetY === undefined ? ev.layerY :ev.offSetY;
		}
	}
}