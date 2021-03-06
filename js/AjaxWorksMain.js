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
	
});