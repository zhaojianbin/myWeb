$(function(){
	
	//数字时钟开始
	/*思路：用Date对象获取日期和时间，然后都转换成两位数赋值给字符串，
	循环遍历所有的图片，改变它们的路径。图片路径对应的是字符串中的位置。*/
	
	//这个函数用来把从系统获取到的年月日等数字转化成两位的字符串
	function toDouble(n){
		return n<10 ? '0'+n : ''+n;
	}
	var aImg = document.getElementById('wrapClock').getElementsByTagName('img');
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
	//仿苹果列表
	/*图片的x代表图片中心点到屏幕左边的距离,计算公式：
	图片左边距+图片自身宽度的一半
	图片的y表示图片的中心点到屏幕顶部的距离,计算公式：
	图片上边距+图片自身高度的一半*/
	$(document).mousemove(function(oEvent){
		var oMenu = $('#applemenu');
		var aImg = $('#applemenu img');
		aImg.each(function(i, element) {
            var xPos = $(this).offset().left + $(this).outerWidth()/2;
			var yPos = $(this).offset().top + $(this).outerWidth()/2;
			
			//dis就是鼠标跟图片中心的距离
			var a = xPos - oEvent.pageX;
			var b = yPos - oEvent.pageY;
			var dis = Math.sqrt(a*a+b*b);
			//把距离折合成比例,用1减去是为了中间比例高，两边比例低
			var scale = 1-dis/300;
			if(scale<0.5){
				scale = 0.5;
			}
			//设置每个图片的宽度
			var pos = scale*128;
			$(this).css('width',pos);
        });
	});
	
	//其他作品的导航条效果
	$("#list1 li").click(function (e) {

		// make sure we cannot click the slider
		if ($(this).hasClass('slider')) {
			return;
		}

		/*添加滑动效果*/

		//确定哪一个被点击了
		var whatTab = $(this).index();

		//计算滑动条应该走多少距离
		var howFar = 160 * whatTab;

		$(".slider").css({
			left: howFar + "px"
		});

		/*添加水波效果*/

		//先移除原来的
		$(".ripple").remove();

		//执行
		var posX = $(this).offset().left,
	  	posY = $(this).offset().top,
	  	buttonWidth = $(this).width(),
	  	buttonHeight = $(this).height();

		//添加元素
		$(this).prepend("<span class='ripple'></span>");

		//循环
		if (buttonWidth >= buttonHeight) {
			buttonHeight = buttonWidth;
		} else {
			buttonWidth = buttonHeight;
		}

		//获取元素的中点
		var x = e.pageX - posX - buttonWidth / 2;
		var y = e.pageY - posY - buttonHeight / 2;

		//添加水波的样式，开始动画
		$(".ripple").css({
			width: buttonWidth,
			height: buttonHeight,
			top: y + 'px',
			left: x + 'px'
		}).addClass("rippleEffect");
	});
		
});
	
