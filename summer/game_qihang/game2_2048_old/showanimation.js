// JavaScript Document
function showNumberWithAnimation(i,j,number){
	var numberCell=$('#number-cell-'+i+'-'+j);
	numberCell.css('background-color',getNumberBackGroundColor( number ));
	numberCell.css('color',getNumberColor( number ));
	numberCell.text( number );
	
	numberCell.animate({
		width:cellSideLength,
		height:cellSideLength,
		top:getPosTop(i,j),
		left:getPosLeft(i,j)
	},50);
}

function showMoveAnimation(formx,formy,tox,toy){
	var numberCell=$('#number-cell-'+formx+'-'+formy);
	numberCell.animate({
		top:getPosTop(tox,toy),
		left:getPosLeft(tox,toy)
	},200);
}