$(function(){
	var oUl = $('#mainNav .pagesNav').get(0);
	var aA = oUl.getElementsByTagName('a');
	//这是滑块最后将要到达的位置，根据当前在哪个页面决定
	//实现方式是在html中给当前页面的那个li加了一个叫做current的id
	var finalPos = Math.floor($('#current').offset().left);
	//页面刚刷新的时候先设置一下滑块的位置
	$('#mainNavBtn').offset({left:finalPos,top:0});
	for(var i=0; i<aA.length; i++){
		aA[i].onmouseover = function(){
			//看看鼠标移入了哪个a链接，让滑块走到相应的位置
			var l = Math.floor($(this).offset().left);
			startMove($('#mainNavBtn').get(0),{left:l});
		};
		aA[i].onmouseout = function(){
			//鼠标移出的时候让滑块回到当前页面的位置
			startMove($('#mainNavBtn').get(0),{left:finalPos});
		};
	}
});