$(function(){
	
	//数字时钟开始
	/*思路：用Date对象获取日期和时间，然后都转换成两位数赋值给字符串，
	循环遍历所有的图片，改变它们的路径。图片路径对应的是字符串中的位置。*/
	
	//这个函数用来把从系统获取到的年月日等数字转化成两位的字符串
	function toDouble(n){
		return n<10 ? '0'+n : ''+n;
	}
	var aImg = document.getElementsByTagName('img');
    //定义一个start函数，然后把整个函数放进定时器中
	//每过一秒就重新获取一下时间对象，得到它里面最新的数据
	function start(){
		var oDate = new Date(); 
		 
		var str = oDate.getFullYear()+ 
				//月份默认从零开始，需要加一
				toDouble(oDate.getMonth()+1)+ 
				toDouble(oDate.getDate())+
				toDouble(oDate.getHours())+ 
				toDouble(oDate.getMinutes())+
				toDouble(oDate.getSeconds());
		 
		for(var i=0; i<aImg.length; i++){
			//字符串中的数字就对应要显示的图片的下标，字符串中是几，显示出来的图片就是几
			//charAt()相当于str[i],charAt兼容性更好
			aImg[i].src = '../images/HTML5WorksMain/'+str.charAt(i)+'.png';
			
		} 
	}
	setInterval(start,1000);
	//直接执行是为了开始的时候就显示出数字，而不是开始时全是零，直到1秒后才显示。
	start();
	
	//主要列表区域开始  选取元素
	var oWrap = document.getElementById('wrap');
	var oSelect = oWrap.children[0];
	var oCollect = oWrap.children[1];
	var oUl = oWrap.getElementsByTagName('ul')[0];
	var aLi = oUl.children;
	
	
	//改变li的初始位置，左边到左边，右边的到右边
	for(var i=0; i<aLi.length; i++){
		if(i%2 == 0){
			aLi[i].style.left = -aLi[i].offsetWidth-10+'px';
		}
		else{
			aLi[i].style.left = aLi[i].offsetWidth+10+'px';
		}
	}
	
	//展开菜单按钮的点击事件
	oSelect.onclick = function(){
		var i = 0;
		var timer = setInterval(function(){
			if(i%2 == 0){
				startMove(aLi[i],{left:0,opacity:100});
			}
			else{
				startMove(aLi[i],{left:0,opacity:100});
			}
			i++;
			if(i == aLi.length){
				clearInterval(timer);
			}
		},45);
	};
	//收起菜单按钮点击事件,与展开的时候顺序相反
	oCollect.onclick = function(){
		var i = aLi.length-1;
		var timer = setInterval(function(){
			if(i%2 == 0){
				startMove(aLi[i],{left:-aLi[i].offsetWidth-10,opacity:0});
			}
			else{
				startMove(aLi[i],{left:aLi[i].offsetWidth+10,opacity:0});
			}
			i--;
			if(i == -1){
				clearInterval(timer);
			}
		},45);
	};
		
});
	
