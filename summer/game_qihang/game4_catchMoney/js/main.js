// JavaScript Document
documentWidth=window.screen.availWidth;
documentHeight=window.screen.availHeight;

var loader;

var params = {
	timeSet:60,
	maxGolds:10,
	maxBombs:3,
	catSpeed:20,
	goldSpeed:10,
	bombSpeed:10,
	manifest:undefined
}

var gameinfo = {
	stage:undefined,
	cat:{	
		catImage:undefined,
		MoveLeft:false,
		MoveRight:false,
		},
	gold:{
		goldImage:undefined,
		goldNumber:0
		},
	goldContainer:undefined,
	bomb:{
		bombImage:undefined,
		bombNumber:0
		},
	bombContainer:undefined,
	gameOverContainer:undefined,
	start:true,
	score:0,
	scoreText:undefined,
	timeText:undefined,
	remainTime:params.timeSet *1000
}

document.body.onload = function(){
	init();
};

function init(){
	var canvas=document.getElementById("canvas");
	if(documentWidth>600){
		documentWidth=800;
		documentHeight=600;
	}
	canvas.width = documentWidth;
	canvas.height = documentHeight;
	gameinfo.stage = new createjs.Stage("canvas");
	gameinfo.scoreText = new createjs.Text("score:0", "20px Arial", "#ff7700");
	gameinfo.scoreText.x = 20;
	gameinfo.scoreText.y = 20;
	gameinfo.stage.addChild(gameinfo.scoreText);
	gameinfo.timeText = new createjs.Text("Time:"+gameinfo.remainTime/1000, "20px Arial", "#ff7700");
	gameinfo.timeText.x = canvas.width -gameinfo.timeText.getMeasuredWidth()-20;
	gameinfo.timeText.y = 20;
	gameinfo.stage.addChild(gameinfo.timeText);
	gameinfo.stage.width = canvas.width;
	gameinfo.stage.height = canvas.height;
	gameinfo.goldContainer = new createjs.Container();
	gameinfo.bombContainer = new createjs.Container();
	
	//图片预加载
	params.manifest=[
		{
			id:'cat',
			src:'cat.png'
		},
		{
			id:'gold',
			src:'diamond-spritesheet.png'
		},
		{
			id:'bomb',
			src:'bomb.png'
		}	
	];
	loader = new createjs.LoadQueue();
	loader.on("complete", handleComplete);
	loader.loadManifest(params.manifest,true,'./img/');
	
	createjs.Ticker.setFPS(30);
	createjs.Ticker.addEventListener("tick", handleTick);
 	
}
//图片加载完成处理
function handleComplete(event){
	//init cat 
	gameinfo.cat.catImage = new createjs.Bitmap(loader.getResult("cat"));
	initCat();
	gameinfo.stage.addChild(gameinfo.cat.catImage);
	
	//init gold
	spriteSheet = new createjs.SpriteSheet({
			framerate: 30,
			images: [loader.getResult("gold")],
			frames: {"regX":0, "regY":0, "width":90,"height":90,"count":5},
			animations:{run:[0,4]}
		});
	gameinfo.gold.goldImage = new createjs.Sprite(spriteSheet,"run");
	gameinfo.stage.addChild(gameinfo.goldContainer);
	//init bomb
	gameinfo.bomb.bombImage = new createjs.Bitmap(loader.getResult("bomb"));
	gameinfo.stage.addChild(gameinfo.bombContainer);
}
function initCat(){
	gameinfo.cat.catImage.x=documentWidth/2-gameinfo.cat.catImage.image.width/2;
	gameinfo.cat.catImage.y=documentHeight-gameinfo.cat.catImage.image.height;
}
//增加硬币
function addGold(){
	var newGold = new createjs.Sprite(spriteSheet,"run");
	newGold.x = Math.random()*(gameinfo.stage.width-newGold.getBounds().width/2);
	newGold.y = 0;
	newGold.scaleX = 0.5;
	newGold.scaleY = 0.5;
	gameinfo.goldContainer.addChild(newGold);
}
//增加炸弹
function addBomb(){
	var newBomb = new createjs.Bitmap(loader.getResult("bomb"));
	newBomb.x = Math.random()*(gameinfo.stage.width-gameinfo.bomb.bombImage.image.width);
	newBomb.y = 0;
	gameinfo.bombContainer.addChild(newBomb);
}
//游戏结束
function gameOver(){
	createjs.Ticker.setPaused(true);
	drawOver();
}
//结束画面绘制
function drawOver(){
	gameinfo.gameOverContainer = new createjs.Container();
	gameinfo.stage.addChild(gameinfo.gameOverContainer);
	var rect = new createjs.Shape();
	rect.graphics.setStrokeStyle(1)
		.beginStroke("#000")
		.beginFill("#fff68f")
		.drawRoundRect(gameinfo.stage.width / 4, gameinfo.stage.height / 4, gameinfo.stage.width / 2, gameinfo.stage.height / 2, 30);
	gameinfo.gameOverContainer.addChild(rect);
	
	var scoreText = new createjs.Text("你的分数:"+gameinfo.score,'30px Arial', '#000');
	scoreText.textAlign="center";
	scoreText.x = gameinfo.stage.width /2 ;
	scoreText.y = gameinfo.stage.height /2 ;
	gameinfo.gameOverContainer.addChild(scoreText);
	
	var restarText = new createjs.Text("点击面板重新开始");
	restarText.textAlign="center";
	restarText.x = gameinfo.stage.width /2 ;
	restarText.y = gameinfo.stage.height /2 + 50;
	gameinfo.gameOverContainer.addChild(restarText);
	
	rect.on("click",restart);
	gameinfo.stage.update();
	
}
function restart(){
	createjs.Ticker.setPaused(false);
	gameinfo.gameOverContainer.removeAllChildren();
	gameinfo.goldContainer.removeAllChildren();
	gameinfo.bombContainer.removeAllChildren();
	gameinfo.remainTime =createjs.Ticker.getTime(true)+params.timeSet*1000;
	gameinfo.score = 0;
	initCat();
}
//绘图更新
function handleTick(event) {
		if(createjs.Ticker.getPaused()){
			return ;
		}
		if(gameinfo.remainTime<createjs.Ticker.getTime(true)){
			gameOver();
			return ;
		}
		//更新时间
		gameinfo.timeText.text="Time:"+Math.floor((gameinfo.remainTime-createjs.Ticker.getTime(true))/1000);
		
		if(gameinfo.cat.MoveLeft){
			if(gameinfo.cat.catImage.x>0){
				gameinfo.cat.catImage.x-=params.catSpeed;
			}
		}
		if(gameinfo.cat.MoveRight){
			if(gameinfo.cat.catImage.x<documentWidth-gameinfo.cat.catImage.image.width){
				gameinfo.cat.catImage.x+=params.catSpeed;
			}
		}
		
		//增加硬币
		var goldNumber = gameinfo.goldContainer.getNumChildren();
		if(goldNumber < params.maxGolds && Math.random() < 0.05){
			addGold();
			goldNumber++;
		}
		//增加炸弹
		var bombNumber = gameinfo.bombContainer.getNumChildren();
		if(bombNumber < params.maxBombs && Math.random() < 0.02){
			addBomb();
			bombNumber++;
		}
		
		// 硬币掉落
		var thisGold;
		for(var i=0;i<goldNumber;i++){
			thisGold=gameinfo.goldContainer.getChildAt(i)
			thisGold.y+=params.goldSpeed;
			//cat与gold碰撞检测
			if(thisGold.y+thisGold.getBounds().height/2>gameinfo.cat.catImage.y && thisGold.x+thisGold.getBounds().width/2>gameinfo.cat.catImage.x &&  thisGold.x<gameinfo.cat.catImage.x+gameinfo.cat.catImage.image.width){
				gameinfo.goldContainer.removeChild(thisGold);
				goldNumber--;
				gameinfo.score++;
			}
			//掉出屏幕
			if(thisGold.y>gameinfo.stage.height){
				gameinfo.goldContainer.removeChild(thisGold);
				goldNumber--;
			}
		}
		
		// 炸弹掉落
		var thisBomb;
		for(var i=0;i<bombNumber;i++){
			thisBomb=gameinfo.bombContainer.getChildAt(i)
			thisBomb.y+=params.bombSpeed;
			//cat与bomb碰撞检测
			if(thisBomb.y+thisBomb.image.height>gameinfo.cat.catImage.y && thisBomb.x+thisBomb.image.width>gameinfo.cat.catImage.x &&  thisBomb.x<gameinfo.cat.catImage.x+gameinfo.cat.catImage.image.width){
				gameinfo.bombContainer.removeChild(thisBomb);
				bombNumber--;
				gameinfo.score-=10;
				if(gameinfo.score<0){
					gameinfo.score=0;
				}
			}
			//掉出屏幕
			if(thisBomb.y>gameinfo.stage.height){
				gameinfo.bombContainer.removeChild(thisBomb);
				bombNumber--;
			}
		}
		//更新分数
		gameinfo.scoreText.text="score:"+gameinfo.score;
	 	gameinfo.stage.update();
 	}
//键盘按下监听
document.addEventListener("keydown",function(e){
	switch(e.keyCode){
		case 37: 
			gameinfo.cat.MoveLeft=true;
			break;
		case 39:
			gameinfo.cat.MoveRight=true;
			break;
	}
});
//键盘松开监听
document.addEventListener("keyup",function(e){
	switch(e.keyCode){
		case 37: 
			gameinfo.cat.MoveLeft=false;
			break;
		case 39:
			gameinfo.cat.MoveRight=false;
			break;
	}
});
document.addEventListener("touchstart",function(e){								
	if (event.touches.length == 1) {
		if(e.touches[0].clientX > gameinfo.cat.catImage.x){
			gameinfo.cat.MoveRight=true;
		}
		if(e.touches[0].clientX < gameinfo.cat.catImage.x){
			gameinfo.cat.MoveLeft=true;	
		}
	}
});
document.addEventListener("touchend",function(e){
	gameinfo.cat.MoveLeft=false;	
	gameinfo.cat.MoveRight=false;
});
document.addEventListener("touchmove",function(e){
	 e.preventDefault();
});
