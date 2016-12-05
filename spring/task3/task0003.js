// JavaScript Document
var cate;
var childCate;
var task;
var cateText='['
			+'{'
				+'"id":0,'
				+'"name":"默认分类",'
				+'"child":[0]'
			+'},'
			+'{'
				+'"id":1,'
				+'"name":"百度IFE项目",'
				+'"child":[1,2]'
			+'}'
			+']';

var childCateText='['
				+'{'
					+'"id":0,'
					+'"name":"默认分类1",'
					+'"child":[],'
					+'"father":0'
				+'},'
				+'{'
					+'"id":1,'
					+'"name":"task001",'
					+'"child":[0,1,2],'
					+'"father":1'  
			   +'},{'
					+'"id":2,'
					+'"name":"task002",'
					+'"child":[3],'
					+'"father":1 ' 	
				+'}'
				+']';

var taskText='['
				+'{'
					+'"id":0,'
					+'"name":"任务1-1",'
					+'"finish":true,'
					+'"date":"2016-11-14",'
					+'"content":"开始任务1-1",'
					+'"father":1'
				+'},{'
					+'"id":1,'
					+'"name":"任务1-2",'
					+'"finish":true,'
					+'"date":"2016-10-15",'
					+'"content":"开始任务1-2",'
					+'"father":1'  
				+'},{'
					+'"id":2,'
					+'"name":"任务1-3",'
					+'"finish":false,'
					+'"date":"2016-11-16",'
					+'"content":"开始任务1-3",'
					+'"father":1'
				+'},{'
					+'"id":3,'
					+'"name":"任务2-1",'
					+'"finish":false,'
					+'"date":"2016-11-14",'
					+'"content":"开始任务2-1",'
					+'"father":2'	
				+'}]';

//生成任务分类列表
function makeCate(){
	setNum();
	var oldChoose=$('.cate-wrap .choose');
	var taskAllNum=$('#taskAll');
	taskAllNum.innerHTML='<span>所有任务</span>('+task.length+')';
	var html='';
	for(var i=0,len=cate.length;i<len;i++){
		html+='<li>'
			+	'<h2 onclick="cateClick(this)">'
			+	'<span>'
			+		cate[i].name+'</span>('+cate[i].num+')'
			+	'<b class="delete" onClick="deleteTask(this)">&times;</b>'
			+	'</h2>'
			+ 	'<ul id="itemchild">';
			for(var j=0,lens=cate[i].child.length;j<lens;j++){
				var childNode= getObjByKey(childCate,'id',cate[i].child[j]);
				html+='<li>'
					+      '<h3 onclick="cateClick(this)">'
					+	   '<span>'
					+			childNode.name+'</span>('+childNode.child.length+')'
					+		'<b class="delete" onClick="deleteTask(this)">&times;</b>'
					+	   '</h3>'
					+ '</li>';
			}
		html+='</ul>'
			+ '</li>';
			
	}
	html=html.replace(/<b class="delete" onClick="deleteTask\(this\)">&times;<\/b>/,'');
	html=html.replace(/<b class="delete" onClick="deleteTask\(this\)">&times;<\/b>/,'');
	$('#item-wrap').innerHTML=html;
	
	if(oldChoose){
		var tag=oldChoose.tagName.toLowerCase();
		var name=oldChoose.getElementsByTagName('span')[0].innerHTML;
		switch(tag){
			case 'h1':
				$('h1').click();
				break;
			case 'h2':
				var cateObj=document.getElementsByTagName('h2');
				for(var i=0;i<cateObj.length;i++){
					if(cateObj[i].getElementsByTagName('span')[0].innerHTML===name){
						cateObj[i].click();
						break;
					}
				}
			case 'h3':
				var childCateObj=document.getElementsByTagName('h3');
				for(var i=0;i<childCateObj.length;i++){
					if(childCateObj[i].getElementsByTagName('span')[0].innerHTML===name){
						childCateObj[i].click();
						break;
					}
				}
		}
	}
	else{
		$('h1').click();
	}
}

//生成任务分类列表
function makeTask(){
	var oldChoose=$('.task-wrap .choose');
	var ele=$('.cate-wrap .choose');
	var eleTag=ele.tagName.toLowerCase();
	var taskIdArr=[];
	var name=ele.getElementsByTagName('span')[0].innerHTML;
	switch(eleTag){
		case 'h1':			//选中所有任务
			for(var i=0;i<task.length;i++){
				taskIdArr.push(task[i].id);
			}
			makeTaskById(taskIdArr);
			break;
		case 'h2':			//选中分类任务
			var cateObj=getObjByKey(cate,'name',name);
			for(var i=0;i<cateObj.child.length;i++){
				var	childObj=getObjByKey(childCate,'id',cateObj.child[i])
				for(var j=0;j<childObj.child.length;j++){
					taskIdArr.push(childObj.child[j]);
				}
			}
			makeTaskById(taskIdArr);
			break;
		case 'h3':			//选中子分类任务
			var childObj=getObjByKey(childCate,'name',name);
			for(var i=0;i<childObj.child.length;i++){
					taskIdArr.push(childObj.child[i]);
				}
			makeTaskById(taskIdArr);
			break;
		}
		
		if(oldChoose){
			//console.log(oldChoose);
		}else if($('.task-wrap p')){
			$('.task-wrap p').click();
		}
}
//按ID名生成任务列表
function makeTaskById(taskIdArr){
	var html='';
	var date=[];
	for(var i=0;i<taskIdArr.length;i++){
		taskObj=getObjByKey(task,'id',taskIdArr[i]);
		date.push(taskObj.date);
	}
	
	date = uniqArray(date);	//	日期去重
	date = sortDate(date);	//日期排序
	
	for(var i=0;i<date.length;i++){
		html+='<div><h4>'
			+	date[i]
			+'</h4>'
		for(var j=0;j<taskIdArr.length;j++){
			taskObj=getObjByKey(task,'id',taskIdArr[j]);
			if(taskObj.date===date[i]){
				html+='<p onClick="taskClick(this)">';
				if(taskObj.finish===true){
					html+= '<i class="istrue">&radic;</i>'
				}else{
					html+='<i>&nbsp;</i>'
				}
					html+='<span>'
						+ taskObj.name
						+ '</span>'
						+ '<b class="delete" onClick="deleteTask(this)">&times;</b>'
						+ '</p>';
			}	
			
		}html+='</div>';
	}
	$('.task-wrap').innerHTML=html;
	$('.status').getElementsByTagName('li')[0].click();
	
}
//任务分类列表点击效果
function cateClick(ev){
	var otherChoose = ev.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.getElementsByTagName('*');
    for (var i = 0; i < otherChoose.length; i++) {
        if (otherChoose[i].className === 'choose') {
            otherChoose[i].className = '';
            break;
        }
    }
	ev.className='choose';
	makeTask();
}
//任务列表点击效果
function taskClick(ev){
	var otherChoose=$('.task-wrap').getElementsByTagName('p');
	for(var i=0;i<otherChoose.length;i++){
		if(otherChoose[i].className === 'choose'){
			otherChoose[i].className='';
			break;
		}
	}
	ev.className='choose';
	makeDetails(ev);
}
//任务筛选栏点击效果
function taskStatus(ev){
	ele=ev.innerHTML;
	if($('.status .choose')){
		$('.status .choose').className='';
	}
	ev.className='choose';
	var alldiv=$('.task-wrap').getElementsByTagName('div');
	var allTitle=$('.task-wrap').getElementsByTagName('p');
	var allDate=$('.task-wrap').getElementsByTagName('h4');
	switch(ele){
		case '所有':
			for(var i=0;i<allTitle.length;i++){
				allTitle[i].style.display='block';
			}
			for(var i=0;i<allDate.length;i++){
				allDate[i].style.display='block';
			}
			for(var i=0;i<alldiv.length;i++){
				alldiv[i].style.display='block';	
			}
			break;
		case '未完成':
			for(var i=0;i<alldiv.length;i++){
				alldiv[i].style.display='none';	
				var istrue=alldiv[i].getElementsByTagName('i');
				for(var j=0;j<istrue.length;j++){
					if(istrue[j].className===''){
						istrue[j].parentNode.style.display='block';
						alldiv[i].style.display='block';
					}else{
						istrue[j].parentNode.style.display='none';
					}
				}
			}
			break;
		case '已完成':
			for(var i=0;i<alldiv.length;i++){
				alldiv[i].style.display='none';	
				var istrue=alldiv[i].getElementsByTagName('i');
				for(var j=0;j<istrue.length;j++){
					if(istrue[j].className==='istrue'){
						istrue[j].parentNode.style.display='block';
						alldiv[i].style.display='block';
					}else{
						istrue[j].parentNode.style.display='none';
					}
				}
			}
			break;
	}
	//默认选中第一项显示的任务
	for(var i=0;i<allTitle.length;i++){
		if(allTitle[i].style.display!=='none'){
			allTitle[i].click();
			break;
		}	
	}
}
//任务完成按钮
function taskcomplete(){
	if(confirm('是否设置任务已经完成状态？')){
		var taskObjName=$('.task-wrap .choose').getElementsByTagName('span')[0].innerHTML;
		var taskObj=getObjByKey(task,'name',taskObjName);
		var status=$('.status .choose');
		taskObj.finish=true;
		save();
		makeTask();
		status.click();
	}
}
//任务编辑
function taskEdit(){
	var titleText=$('.title span');
	var titleInput=$('#title');
	
	var dateText=$('.date span');
	var dateInput=$('#date');
	
	var descriptionText=$('.description span');
	var descriptionTextarea=$('#description');
	
	var button=$('.button');
	var button2=$('.button2');
	titleText.style.display="none";
	titleInput.style.display="inline-block";
	
	dateText.style.display="none";
	dateInput.style.display="inline-block";
	
	descriptionText.style.display="none";
	descriptionTextarea.style.display="inline-block";
	
	button.style.display="none";
	button2.style.display="block";
	
	$('.edit').style.display="none";
	
	titleInput.value=titleText.innerHTML;
	dateInput.value=dateText.innerHTML;
	descriptionTextarea.value=descriptionText.innerHTML;
}
//任务编辑保存
function saveEdit(){
	var name=$('#title').value;
	var date=$('#date').value;
	var content=$('#description').value;
	var taskObjName=$('.task-wrap .choose').getElementsByTagName('span')[0].innerHTML;
	var taskObj=getObjByKey(task,'name',taskObjName);
	if(name.length!=0){
		if(date.length!=0){
			if(date.match(/^\d{4}-\d{2}-\d{2}$/)){
				taskObj.name = name;
				taskObj.date = date;
				taskObj.content = content;
			}else{
					alert('日期格式错误');
				}
		}else{
			alert('日期不能为空');
		}
	}else{
		alert('标题不能为空');
	}
	save();
	makeCate();	
}
//详细内容栏显示
function makeDetails(ev){
	var name=ev.getElementsByTagName('span')[0].innerHTML;
	var taskObj=getObjByKey(task,'name',name); 
	
	var titleText=$('.title span');
	var titleInput=$('#title');
	
	var dateText=$('.date span');
	var dateInput=$('#date');
	
	var descriptionText=$('.description span');
	var descriptionTextarea=$('#description');
	
	var button=$('.button');
	var button2=$('.button2');
	
	titleText.style.display="inline-block";
	titleInput.style.display="none";
	
	dateText.style.display="inline-block";
	dateInput.style.display="none";
	
	descriptionText.style.display="inline-block";
	descriptionTextarea.style.display="none";
	
	button.style.display="none";
	button2.style.display="none";
	
	$('.edit').style.display="block";
	
	titleText.innerHTML=taskObj.name;
	dateText.innerHTML=taskObj.date;
	descriptionText.innerHTML=taskObj.content;
	titleInput.value='';
	dateInput.value='';
	descriptionTextarea.value='';
}
//增加任务按钮
function createTask(){
	var titleText=$('.title span');
	var titleInput=$('#title');
	
	var dateText=$('.date span');
	var dateInput=$('#date');
	
	var descriptionText=$('.description span');
	var descriptionTextarea=$('#description');
	var button=$('.button');
	var button2=$('.button2');
	
	titleText.style.display="none";
	titleInput.style.display="inline-block";
	
	dateText.style.display="none";
	dateInput.style.display="inline-block";
	
	descriptionText.style.display="none";
	descriptionTextarea.style.display="inline-block";
	button.style.display="block";
	button2.style.display="none";
	
	$('.edit').style.display="none";
	titleInput.value='';
	dateInput.value='';
	descriptionTextarea.value='';
}
//确定增加任务
function addTask(){
	var name=$('#title').value;
	var date=$('#date').value;
	var content=$('#description').value;
	var cateChoose=$('.cate-wrap .choose');
	var eleTag=cateChoose.tagName.toLowerCase();
	if(name.length!=0){
		if(date.length!=0){
			if(date.match(/^\d{4}-\d{2}-\d{2}$/)){
				switch(eleTag){
					case 'h1':      //选中所有任务
						var id=task[task.length-1].id+1;
						var father=0;
						childCate[0].child.push(id);
						break;
					case 'h2':	//	选中分类任务
						var cateName=cateChoose.getElementsByTagName('span')[0].innerHTML;
						var obj=getObjByKey(cate,'name',cateName);
						var childId=obj.child[0];
						var childObj=getObjByKey(childCate,'id',childId);
						
						var id=task[task.length-1].id+1;
						father=childId;
						childObj.child.push(id);
						break;
					case 'h3':  //选中子分类
						var childName=cateChoose.getElementsByTagName('span')[0].innerHTML;
						var childObj=getObjByKey(childCate,'name',childName);
						
						var id=task[task.length-1].id+1;
						father=childObj.id;
						childObj.child.push(id);
						break;
				}
				var newTask={"id":id,"name":name,"finish":false,"date":date,"content":content,"father":father};
				task.push(newTask);
				save();
				makeCate();
				}else{
					alert('日期格式错误');
				}
		}else{
			alert('日期不能为空');
		}
	}else{
		alert('标题不能为空');
	}
}
//放弃保存任务
function giveuptask(){
	oldTask=$('.task-wrap .choose');
	makeDetails(oldTask);
}
//删除任务
function deleteTask(ev){
	window.event ? window.event.cancelBubble = true : ev.stopPropagation();//阻止事件冒泡
	 
	var con=confirm('确定要删除任务吗？操作不可逆。');
	if(!con){
		return;
	}
	deleteTag=ev.parentNode.tagName.toLowerCase();
	objName=ev.parentNode.getElementsByTagName('span')[0].innerHTML;
	switch(deleteTag){
		case 'h2':	//	选中分类任务
			cateIndex = getIndexByKey(cate,'name',objName);
			for (var i = 0; i < cate[cateIndex].child.length; i++) {       // 删除该子分类下的所有任务
				childCateIndex = getIndexByKey(childCate,'id',cate[cateIndex].child[i]);
				for(var j=0;j < childCate[childCateIndex].child.length;j++){	
					var taskIndex = getIndexByKey(task, 'id', childCate[childCateIndex].child[j]);
					task.splice(taskIndex, 1);
				}
				childCate.splice(childCateIndex,1);
			}
			cate.splice(cateIndex,1);
			break;
		case 'h3':  //选中子分类
			childCateIndex = getIndexByKey(childCate,'name',objName);
			for (var i = 0; i < childCate[childCateIndex].child.length; i++) {       // 删除该子分类下的所有任务
				var taskIndex = getIndexByKey(task, 'id', childCate[childCateIndex].child[i])
				task.splice(taskIndex, 1);
			}
			var fatherObj = getObjByKey(cate,'id',childCate[childCateIndex].father);
			fatherObj.child.splice(fatherObj.child.indexOf(childCate[childCateIndex].id),1);
			childCate.splice(childCateIndex,1);
			break;
		case "p":
			taskIndex = getIndexByKey(task,'name',objName);
			var fatherObj = getObjByKey(childCate,'id',task[taskIndex].father);
			fatherObj.child.splice(fatherObj.child.indexOf(task[taskIndex].id),1);
			task.splice(taskIndex,1);
			break;
	}
	save();
	makeCate();
}
//创建分类
function create_Cate(){
	$(".pop").style.display="block";
	$(".overlay").style.display="block";
	var html='';
	html = '<p>新分类名称:&nbsp;<input type="text" class="myText" placeholder="在此输入新分类的名称"><p>'
		+'<p>新分类父节点:<select class="mySelect">'
		+ '<option value="-1">无</option>';
	for(var i=0;i<cate.length;i++){
		html+='<option value='+i+'>'+cate[i].name+'</option>'
	}
	html+='</select></p>'
		+'<p class="error">&nbsp;</p>'
		+'<button class="myButton btn2" onclick="closePop()">取消</button>'
		+'<button class="myButton btn1" onclick="addCate()">确定</button>';	
	$('.pop-content').innerHTML=html;
}
//确定创建分类
function addCate(){
	var name = $('.myText').value;
    var fatherName = $('.mySelect').value;
    if (name.length === 0) {              // 检测输入合法性
        $('.error').innerHTML = '分类名称不能为空';
        return;
    }
    else if (name.length >= 15) {
        $('.error').innerHTML = '分类名称不能多于15个字符';
        return;
    }
    else if (getObjByKey(cate, 'name', name)) {
        $('.error').innerHTML = '检测到相同名称的分类已存在';
        return;
    }
    else if (getObjByKey(childCate, 'name', name)) {
        $('.error').innerHTML = '检测到相同名称的子分类已存在';
        return;
    }
    if (fatherName === '-1') {             // 添加分类
        var newCate = {
            "id": cate[cate.length - 1].id + 1,
            "name": name,
            "num": 0,
            "child": []
        };
        cate.push(newCate);
        save();
    }
    else {                                 // 添加子分类
        var newChild = {
            "id": childCate[childCate.length - 1].id + 1,
            "name": name,
            "child": [],
            "father": cate[$('.mySelect').value].id
        };
        var father = getObjByKey(cate, 'id', newChild.father)   // 父节点对象
        father.child.push(newChild.id);                       // 在父节点中登记
        childCate.push(newChild);
        save();
    }
    makeCate();
    closePop();
}
//取消创建分类
function closePop(){
	$(".pop").style.display="none";
	$(".overlay").style.display="none";
}
//根据某对象的某属性得到某对象
function getObjByKey(obj,key,value){
	for(var i=0;i<obj.length;i++){
		if(obj[i][key]==value)
			return obj[i];
		}	
}
// 根据某对象的某属性得到某对象的序号
function getIndexByKey(obj, key, value) {
    for (var i = 0; i < obj.length; i++) {
        if (obj[i][key] === value) {
            return i;
        }
    }
}
//日期排序
function sortDate(date){
	return date.sort(function (a, b) {
        return a.replace(/-/g, '') - b.replace(/-/g, '');
    });
}
//刷新任务数量
function setNum(){
	var sum;
	for(var i=0;i<cate.length;i++){
		sum=0;
		for(var j=0,lens=cate[i].child.length;j<lens;j++){
			var childNode= getObjByKey(childCate,'id',cate[i].child[j]);
			var num=childNode.child.length;
			sum+=num;
		}
			cate[i].num=sum;
	}
}
//数据保存
function save(){
	localStorage.cate = JSON.stringify(cate);
	localStorage.childCate = JSON.stringify(childCate);
    localStorage.task = JSON.stringify(task);
}
window.onload=function(){
	if(!localStorage.getItem('cate')){
		localStorage.cate=cateText;
		localStorage.childCate=childCateText;
		localStorage.task=taskText;
	}
		cate=JSON.parse(localStorage.cate);
		childCate=JSON.parse(localStorage.childCate);
		task=JSON.parse(localStorage.task);
		makeCate();
		
}