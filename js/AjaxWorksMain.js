$(function(){
	//弹出层开始
	var oWin = document.getElementById("littlelay");
	var oLay = document.getElementById("overlay");	
	var oBtn = document.getElementById('popBtn');
	var oClose = document.getElementById("closelay");
	oBtn.onclick = function (){
		oLay.style.display = "block";
		oWin.style.display = "block"	
	};
	oClose.onclick = function (){
		oLay.style.display = "none";
		oWin.style.display = "none";
	}
	//弹出层的拖拽开始
	$('#littlelay').bind('mousedown',function(oEvent){
		var _this = this;
		//计算鼠标和元素的距离，用鼠标的位置减去元素的位置
		var disX = oEvent.clientX - $(this).offset().left;
		var disY = oEvent.clientY - $(this).offset().top;
		//鼠标移动事件要用这种绑定方式，否则移除事件之后最下面选择菜单效果就出不来了
		document.onmousemove = function(ev){
			var oEvent = ev || window.event;
			//l和t表示元素的实际位置，用鼠标的位置减去鼠标元素之间的距离
			var l = oEvent.clientX - disX;
			var t = oEvent.clientY - disY;
			//防止把元素从左面拖出去,当l<0的时候让l=0。
			//从l<20就让l=0是为了产生吸附效果
			if(l<20){l=0;}
			//防止把div从右面拖出去
			else if(l>$(window).width()-$(_this).outerWidth() - 30){
				l = $(window).width()-$(_this).outerWidth()
			}
			//防止把div从上面拖出去,提前等于0也是为了产生吸附效果
			if(t<20){t=0;}
			//防止把div从下面拖出去
			else if(t>$(window).height()-$(_this).outerHeight() - 30){
				t = $(window).height()-$(_this).outerHeight();
			}
			$(_this).offset({top:t,left:l});
		};
		$(document).bind('mouseup',function(){
			document.onmousemove = null;
			$(document).unbind('mouseup');
		});
		return false;
	});
	
	//中间图片拖拽开始
	var oUl = $('#dragImg').get(0);
	var aLi = oUl.getElementsByTagName('li');
	var iMinZindex = 2;
	var aPos = [];
	//布局转换
	for(var i=0;i<aLi.length;i++){
		aPos[i] = {left: aLi[i].offsetLeft, top:aLi[i].offsetTop};
	}
	for(var i=0;i<aLi.length;i++){
		aLi[i].style.left = aPos[i].left+'px';
		aLi[i].style.top = aPos[i].top+'px';
		
		aLi[i].style.position = 'absolute';
		aLi[i].style.margin = '0';
		aLi[i].index = i;
	}
	
	//拖拽
	for(var i=0; i<aLi.length; i++){
		setDrag(aLi[i]);
	}
	function setDrag(obj){
		obj.onmousedown = function(ev){
			obj.style.zIndex = iMinZindex++;
			var oEvent = ev || window.event;
			var disX = oEvent.clientX - obj.offsetLeft;
			var disY = oEvent.clientY - obj.offsetTop;
			
			document.onmousemove = function(ev){
				var oEvent = ev || window.event;
				obj.style.left = oEvent.clientX - disX +'px';
				obj.style.top = oEvent.clientY - disY +'px';
				//先让所有li的class变成空的
				for(var i=0; i<aLi.length; i++){
					aLi[i].className = '';
				}
				var oNear = findNearest(obj);
				if(oNear){
					oNear.className = 'active';
				}
			};
			document.onmouseup = function(){
				document.onmousemove = null;
				document.onmouseup = null;
				//鼠标抬起的时候看看有没有离的最近的li
				var oNear = findNearest(obj);
				if(oNear){
					oNear.className = '';
					oNear.style.zIndex = iMinZindex++;
					obj.style.zIndex = iMinZindex++;
					
					startMove(oNear,aPos[obj.index]);
					startMove(obj,aPos[oNear.index]);
					var temp = 0;
					tem = obj.index;
					obj.index = oNear.index;
					oNear.index = tem;
				}
				else{
					startMove(obj,aPos[obj.index])
				}
			};
			clearInterval(obj.timer);
			return false;
		};
	}
	
	//碰撞检测
	function cdText(obj1,obj2){
		var l1 = obj1.offsetLeft;
		var r1 = obj1.offsetLeft + obj1.offsetWidth;
		var t1 = obj1.offsetTop;
		var b1 = obj1.offsetTop + obj1.offsetHeight;
		
		var l2 = obj2.offsetLeft;
		var r2 = obj2.offsetLeft + obj2.offsetWidth;
		var t2 = obj2.offsetTop;
		var b2 = obj2.offsetTop + obj2.offsetHeight;
		//碰不上的情况
		if(r1<l2 || l1>r2 || b1<t2 || t1>b2){
			return false;
		}
		//碰上的情况
		else{
			return true;
		}
	}
	
	//计算距离
	function getDis(obj1,obj2){
		var a = obj1.offsetLeft - obj2.offsetLeft;
		var b = obj1.offsetTop - obj2.offsetTop;
		
		return Math.sqrt(a*a+b*b);
	}
	
	//找到碰上的并且最近的
	function findNearest(obj){
		var iMin = 999999;
		var iMinIndex = -1;
		for(var i=0; i<aLi.length; i++){
			//如果发现当前被拖拽的就是第i个li，那就跳过，自己不跟自己比位置
			if(obj == aLi[i])continue;
			if(cdText(obj,aLi[i])){
				var dis = getDis(obj,aLi[i]);
				//如果比现在最小的距离还小,那就保存更小的距离和索引值
				if(iMin > dis){
					iMin = dis;
					iMinIndex = i;
				}
			}
		}
		//没改变最初的索引值，那就是没碰上
		if(iMinIndex == -1){
			return null;
		}
		//碰上了就返回距离最近的那个li
		else{
			return aLi[iMinIndex];
		}
	}
	
	//底部菜单栏开始
	/*图片的x代表图片中心点到屏幕左边的距离,计算公式：
	图片左边距+图片自身宽度的一半
	图片的y表示图片的中心点到屏幕顶部的距离,计算公式：
	图片上边距+图片自身高度的一半*/
	$(document).mousemove(function(oEvent){
		var oMenu = $('#menu');
		var aImg = $('#menu img');
		aImg.each(function(i, element) {
            var xPos = $(this).offset().left + $(this).outerWidth()/2;
			var yPos = $(this).offset().top + $(this).outerWidth()/2;
			
			//dis就是鼠标跟图片中心的距离
			var a = xPos - oEvent.clientX;
			var b = yPos - oEvent.clientY;
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
});