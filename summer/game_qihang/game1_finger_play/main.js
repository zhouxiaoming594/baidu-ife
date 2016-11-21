// JavaScript Document
var src=["shitou.png","jiandao.png","bu.png"];
var totle=0;
window.onload=function(){
	var choose=document.getElementById('choose');
	var answer=document.getElementById('answer');
	var user=document.getElementById('user');
	var computer=document.getElementById('computer');
	var result=document.getElementById('result');
}
function makeResult(ev){
		var wintime=answer.getElementsByTagName('span')[0];
		choose.style.display='none';
		answer.style.display='block';
		user_index=ev.getAttribute('index');
		user.src=ev.src;
		
		computer_index = Math.floor(Math.random()*3);
		computer.src = src[computer_index];
		
		if(computer_index==user_index){
			result.innerHTML="Draw Game";
			totle=0;
		}else if(((user_index==0)&&(computer_index==1))||((user_index==1)&&(computer_index==2))||((user_index==2)&&(computer_index==0))){
			result.innerHTML="you Win";
			totle++;
			}else{
				result.innerHTML="you Lose";
				totle=0;
			}
		wintime.innerHTML=totle;
	}
function playAgain(){
	choose.style.display='block'
	answer.style.display='none';
}