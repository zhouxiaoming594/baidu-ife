// JavaScript Document
var board = new Array();
var score = 0;
var hasConflicted = new Array();

var startx=0;
var starty=0;
var endx=0;
var endy=0;
$(document).ready(function(){
	prepareForMobile();
	newgame();					
});

function prepareForMobile(){

	if(documentWidth>500){
		gridContainerWidth = 500;
		cellSideLength = 100; 
		cellSpace =20;
	}
	console.log(cellSideLength);
	$('#grid-container').css('width',gridContainerWidth);
	$('#grid-container').css('height',gridContainerWidth);
	$('#grid-container').css('border-radius',0.02*gridContainerWidth);
	
	$('.grid-cell').css('width',cellSideLength);
	$('.grid-cell').css('height',cellSideLength);
	$('.grid-cell').css('border-radius',0.02*cellSideLength);
			
}
//新游戏
function newgame(){
	//初始化棋盘格
	init();
	//随机两个格子生成数字
	generateOneNumber();
	generateOneNumber();
	//分数清零
	score = 0;
}

//初始化棋盘格
function init(){
	for(var i = 0;i < 4;i++)
		for(var j = 0;j < 4;j++){
			var gridCell=$('#grid-cell-'+i+'-'+j);
			//console.log(gridCell);
			gridCell.css('top',getPosTop(i,j));
			gridCell.css('left',getPosLeft(i,j));
		}
	for(var i = 0;i < 4;i++){
		board[i] = new Array();
		hasConflicted[i] = new Array();
		for(var j = 0;j < 4;j++){
			board[i][j] = 0;
			hasConflicted[i][j] = false;
		}
	}
	updateBoardView();
}

//更新棋盘显示
function updateBoardView(){
	$('.number-cell').remove()	
	for(var i = 0;i < 4;i++)
		for(var j = 0;j < 4;j++){
			$('#grid-container').append('<div class="number-cell" id="number-cell-'+i+'-'+j+'"></div>');	
			var numberCell=$('#number-cell-'+i+'-'+j);
			//console.log(numberCell);
		if(board[i][j]==0){
			numberCell.css('width','0px');
			numberCell.css('height','0px');
			numberCell.css('top',getPosTop(i,j)+cellSideLength/2);
			numberCell.css('left',getPosLeft(i,j)+cellSideLength/2);
		}else{
			numberCell.css('width',cellSideLength);
			numberCell.css('height',cellSideLength);
			numberCell.css('top',getPosTop(i,j));
			numberCell.css('left',getPosLeft(i,j));
			numberCell.css('background-color',getNumberBackGroundColor( board[i][j] ));
			numberCell.css('color',getNumberColor( board[i][j] ));
			numberCell.text( board[i][j] );
			}
		hasConflicted[i][j] = false;
	}
    $('.number-cell').css('line-height',cellSideLength+'px');
    $('.number-cell').css('font-size',0.6*cellSideLength+'px');
	$('.number-cell').css('border-radius',0.02*cellSideLength);
}

//随机生成一个数字
function generateOneNumber(){
	if( nospace (board))
		return false;
	
	//随机一个位子
	var randx=parseInt(Math.floor(Math.random()*4));
	var randy=parseInt(Math.floor(Math.random()*4));
	
	var times=0;
	while( times<50 ){
		if( board[randx][randy]== 0)
		 	break;
		randx=parseInt(Math.floor(Math.random()*4));
		randy=parseInt(Math.floor(Math.random()*4));
		
		times ++;
	}
	if(times==50){
		 for( var i = 0 ; i < 4 ; i ++ )
            for( var j = 0 ; j < 4 ; j ++ ){
                if( board[i][j] == 0 ){
                    randx = i;
                    randy = j;
                }
            }
	}
	//随机一个数字2或4
	var randNumber=Math.random()<0.8?2:4;
	
	//在随机位置显示数字
	board[randx][randy]=randNumber;
	showNumberWithAnimation(randx,randy,randNumber);
	
	return true;
}

//监听键盘按下
$(document).keydown(function( event ){
	switch( event.keyCode ){
		case 37: //left
			if( moveLeft() ){
				setTimeout(generateOneNumber(),210);
				setTimeout(isgameover(),300);
				break;
			}else{break;}
		case 38: //up
			event.preventDefault();
			if( moveUp() ){
				setTimeout(generateOneNumber(),210);
				setTimeout(isgameover(),300);
				break;
			}else{break;}
		case 39: //right
			if( moveRight() ){
				setTimeout(generateOneNumber(),210);
				setTimeout(isgameover(),300);
				break;
			}else{break;}
		case 40: //down
			event.preventDefault();
			if( moveDown() ){
				setTimeout(generateOneNumber(),210);
				setTimeout(isgameover(),300);
				break;
			}else{break;}
		default:
			break;
	}
});
//触摸事件
document.addEventListener('touchstart',function(event){
	startx=event.touches[0].pageX;
	starty=event.touches[0].pageY;
});
document.addEventListener('touchmove',function(event){
	event.preventDefault();
});
document.addEventListener('touchend',function(event){
	endx=event.changedTouches[0].pageX;
	endy=event.changedTouches[0].pageY;
	
	var deltax=endx-startx;
	var deltay=endy-starty;
	if(Math.abs(deltax)<0.2*documentWidth && Math.abs(deltay)<0.2*documentWidth)
		return;
	
	if(Math.abs(deltax) >= Math.abs(deltay)){
		if(deltax >0){	
			//向右
			if( moveRight() ){
				setTimeout(generateOneNumber(),210);
				setTimeout(isgameover(),300);
			}
	}else{
		//向左
		if( moveLeft() ){
				setTimeout(generateOneNumber(),210);
				setTimeout(isgameover(),300);
			}
		}
	}else{
		if(deltay >0){	
			//向下
			if( moveDown() ){
				setTimeout(generateOneNumber(),210);
				setTimeout(isgameover(),300);
			}
		}else{
			//向上
			if( moveUp() ){
				setTimeout(generateOneNumber(),210);
				setTimeout(isgameover(),300);
			}
		}
	}
	
});

//判定游戏是否结束
function isgameover(){
	if(nospace(board) && nomove (board)){
		gameOver();	
	}
}
//游戏结束
function gameOver(){
	alert("gameOver");
}
//左移函数
function moveLeft(){
	//判定是否可以向左移动
	if(!canMoveLeft(board))
		return false;
	
	for(var i = 0;i < 4;i++)
		for(var j = 1;j < 4;j++){
			if(board[i][j]!=0){
				for(var k=0;k<j;k++){
					if(board[i][k]==0&&noBlockHorizontal(i,k,j,board)){
						showMoveAnimation(i,j,i,k);
						board[i][k]=board[i][j];
						board[i][j]=0;
						continue;
					}else if(board[i][k]==board[i][j]&&noBlockHorizontal(i,k,j,board)&&!hasConflicted[i][k]){
							showMoveAnimation(i,j,i,k);
							board[i][k]+=board[i][j];
							board[i][j]=0;
							
							score+=board[i][k];
							updateScore(score);
							
							hasConflicted[i][k]=true;
							continue;
						}	
				}
			
			}
	}
	setTimeout("updateBoardView()",200);
	return true;
}
//上移函数
function moveUp(){
	//判定是否可以向上移动
	if(!canMoveUp(board))
		return false;
	
	for(var j = 0;j < 4;j++)
		for(var i = 1;i < 4;i++){
			if(board[i][j]!=0){
				for(var k=0;k<i;k++){
					if(board[k][j]==0&&noBlockVertical(j,k,i,board)){
						showMoveAnimation(i,j,k,j);
						board[k][j]=board[i][j];
						board[i][j]=0;
						continue;
					}else if(board[k][j]==board[i][j]&&noBlockVertical(j,k,i,board)&&!hasConflicted[k][j]){
							showMoveAnimation(i,j,k,j);
							board[k][j]+=board[i][j];
							board[i][j]=0;
							
							score+=board[k][j];
							updateScore(score);
							hasConflicted[k][j] = true;
							continue;
						}	
				}
			
			}
	}
	setTimeout("updateBoardView()",200);
	return true;
}
//右移函数
function moveRight(){
	//判定是否可以向右移动
	if(!canMoveRight(board))
		return false;
	
	for(var i = 0;i < 4;i++)
		for(var j = 2;j >=0;j--){
			if(board[i][j]!=0){
				for(var k=3;k>j;k--){
					if(board[i][k]==0&&noBlockHorizontal(i,j,k,board)){
						showMoveAnimation(i,j,i,k);
						board[i][k]=board[i][j];
						board[i][j]=0;
						continue;
					}else if(board[i][k]==board[i][j]&&noBlockHorizontal(i,j,k,board)&&!hasConflicted[i][k]){
							showMoveAnimation(i,j,i,k);
							board[i][k]+=board[i][j];
							board[i][j]=0;
							
							score+=board[i][k];
							updateScore(score);
							
							hasConflicted[i][k] = true;
							continue;
						}	
				}
			
			}
	}
	setTimeout("updateBoardView()",200);
	return true;
}
//下移函数
function moveDown(){
	//判定是否可以向下移动
	if(!canMoveDown(board))
		return false;
	
	for(var j = 0;j < 4;j++)
		for(var i = 2;i >=0;i--){
			if(board[i][j]!=0){
				for(var k=3;k>i;k--){
					if(board[k][j]==0&&noBlockVertical(j,i,k,board)){
						showMoveAnimation(i,j,k,j);
						board[k][j]=board[i][j];
						board[i][j]=0;
						continue;
					}else if(board[k][j]==board[i][j]&&noBlockVertical(j,i,k,board)&&!hasConflicted[k][j]){
							showMoveAnimation(i,j,k,j);
							board[k][j]+=board[i][j];
							board[i][j]=0;
							
							score+=board[k][j];
							updateScore(score);
							hasConflicted[k][j] = true;
							continue;
						}	
				}
			
			}
	}
	setTimeout("updateBoardView()",200);
	return true;
}




	
	