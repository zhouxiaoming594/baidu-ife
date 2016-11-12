<?php
	header("Content-Type:text/plain;charset=utf-8");
$keywords = array
	(
		array("title" => "adobe flash player","url" =>'https://get2.adobe.com/cn/flashplayer/?no_redirect'),
		array("title" => "acfun","url" =>"http://www.acfun.tv/"),
		array("title" => "abc","url" =>"http://www.abchina.com/cn/"),
		array("title" => "abcfsdfsf","url" =>"http://www.abchina.com/cn/"),
		array("title" => "adsfsdf","url" =>"http://www.abchina.com/cn/"),
		array("title" => "afasdfec","url" =>"http://www.abchina.com/cn/"),
		array("title" => "aasfasfc","url" =>"http://www.abchina.com/cn/")
	);
	
if($_SERVER['REQUEST_METHOD'] == "GET"){
	search();
}

function search(){
	if(!isset($_GET["title"])||empty($_GET["title"])){
		return;
	}
	global $keywords;
	$title = $_GET["title"];
	foreach($keywords as $value){	
		if(strstr($value["title"],$title)!=null){
			echo $result[] ='{"title":"'.$value["title"].'","url":"'.$value["url"].'"},';
		}
	}
}	
?>
