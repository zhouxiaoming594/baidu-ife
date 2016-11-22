// JavaScript Document
documentWidth=window.screen.availWidth;
gridContainerWidth=0.92*documentWidth;
cellSideLength=0.18*documentWidth;
cellSpace=0.04*documentWidth;

function getPosTop(i,j){
	return cellSpace+(cellSpace+cellSideLength)*i;
}

function getPosLeft(i,j){
	return cellSpace+(cellSpace+cellSideLength)*j;
}

function getNumberBackGroundColor(number){
	switch( number ){
		case 2:return 'url(2.jpg)';break;
        case 4:return 'url(4.jpg)';break;
        case 8:return "url(8.jpg)";break;
        case 16:return "url(16.jpg)";break;
        case 32:return "url(32.jpg)";break;
        case 64:return "url(64.jpg)";break;
        case 128:return "url(128.jpg)";break;
        case 256:return "url(256.jpg)";break;
        case 512:return "url(512.jpg)";break;
        case 1024:return "url(1024.jpg)";break;
        case 2048:return "url(2048.jpg)";break;
        case 4096:return "url(4096.jpg)";break;
        case 8192:return "#93c";break;
	}
	
	 return "black";
}

function getNumberColor( number ){
	if( number <= 4 )
        return "#776e65";

    return "white";
}

function nospace(board){
	for(var i = 0;i < 4;i++)
		for(var j = 0;j < 4;j++){
			if(board[i][j]==0)
			return false;
	}
	return true;
}

function canMoveLeft(board){
	for(var i = 0;i < 4;i++)
		for(var j = 1;j < 4;j++){
			if(board[i][j]!=0)
				if(board[i][j-1]==0||board[i][j-1]==board[i][j])
					return true;
	}
	return false;
}

function canMoveUp(board){
	for(var j = 0;j < 4;j++)
		for(var i = 1;i < 4;i++){
			if(board[i][j]!=0)
				if(board[i-1][j]==0||board[i-1][j]==board[i][j])
				return true;
	}
	return false;
}

function canMoveRight(board){
	for(var i = 0;i < 4;i++)
		for(var j = 2;j>=0;j--){
			if(board[i][j]!=0)
				if(board[i][j+1]==0||board[i][j+1]==board[i][j])
					return true;
	}
	return false;
}

function canMoveDown(board){
	for(var j = 0;j < 4;j++)
		for(var i = 2;i>=0;i--){
			if(board[i][j]!=0)
				if(board[i+1][j]==0||board[i+1][j]==board[i][j])
				return true;
	}
	return false;
}

function noBlockHorizontal(row,col1,col2,board){
	for(var i=col1+1;i<col2;i++){
		if(board[row][i]!=0)
			return false;
	}
	return true;
}

function noBlockVertical(col,row1,row2,board){
	for(var i=row1+1;i<row2;i++){
		if(board[i][col]!=0)
			return false;
	}
	return true;
}

function nomove (board){
	if(canMoveLeft(board)||canMoveUp(board)||canMoveRight(board)||canMoveDown(board)){
		return false;	
	}
	return true;
}
function updateScore(score){
	$('#score').text(score);
}

function isLevelUp(board){
	for(var j = 0;j < 4;j++)
		for(var i = 1;i < 4;i++){
			if(board[i][j]>maxNumber){
				maxNumber=board[i][j];
			}
	}
	switch(maxNumber){
		case 2:level=0;break;
        case 4:level=1;break;
        case 8:level=2;break;
        case 16:level=3;break;
        case 32:level=4;break;
        case 64:level=5;break;
        case 128:level=6;break;
        case 256:level=7;break;
        case 512:level=8;break;
        case 1024:level=9;break;
        case 2048:level=10;break;
        case 4096:level=11;break;
        case 8192:level=12;break;
		default:break;
	}
	$('#level').text(level);
	return true;
}

