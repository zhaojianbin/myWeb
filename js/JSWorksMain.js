$(function(){
	//选取元素
	var oDiv = document.getElementById('imgListBox');
	var oUl = oDiv.children[0];
	var aLi = oUl.children;
	var aBtn = oDiv.children[1].children;
	//页面左上角的图片
	var now = 0;
	var ready = true;
	
	for(var i=0; i<aLi.length; i++){
		aLi[i].style.left = aLi[i].offsetLeft+'px';
		//从第四排图片开始，统一都把高度变成400
		//前三排每一排的高度都是对应的排数乘以一排的高度
		if(i>=12){
			aLi[i].style.top = '400px';
		}
		else{
			aLi[i].style.top = parseInt(i/4)*200+'px';
		}
	}
	//确定位置之后，把所有的li转换成绝对定位
	for(var i=0; i<aLi.length; i++){
		aLi[i].style.position = 'absolute';
	}
	//让第二排以下的图片先隐藏掉
	for(var i=8; i<aLi.length; i++){
		aLi[i].style.filter = 'alpha(opacity:0)';
		aLi[i].style.opacity = 0;
	}
	//所有的透明度都变成了0，不再需要overflow为hidden了
	oUl.className = 'list';
	//给上一个按钮添加点击事件‘
	aBtn[0].onclick = function(){
		//如果已经是第一排了，就不能再向上走了
		if(now == 0){
			return;
		}
		if(!ready)return;
		ready=false;
		var i = now+8-1;
		//点击的时候操作的是从第now+8个开始向上的12个
		//也就是页面能看到的两排和上面的一排要注意这里小复杂
		var timer = setInterval(function(){
			if(i<now){
				if(i==now-4)
				{
					startMove(aLi[i], {top: 0, opacity: 100}, function (){
						ready=true;
					});
				}
				else
				{
					startMove(aLi[i], {top: 0, opacity: 100});
				}
			}
			else if(i<now+4){
				//现在页面中的第一行移动到现在第二行的位置
				startMove(aLi[i],{top:200});
			}
			else{
				//现在页面中的第二行从下面移动出去
				startMove(aLi[i],{top:400,opacity:0});
			}
			i--;
			if(i == now-5){
				now-=4;
				clearInterval(timer);
			}
		},38);
		
	};
	//给下一个按钮添加点击事件
	aBtn[1].onclick = function(){
		//如果已经是最后两排了，就不能再向下走了
		if(now >= aLi.length-8){
			return;
		}
		var i = now;
		//点击的时候操作的是从第now个开始的12个
		var timer = setInterval(function(){
			if(i<now+4){
				//第一行从0移动到-200，并且opacity变成0,消失
				startMove(aLi[i],{top:-200,opacity:0});
			}
			else if(i<now+8){
				//第二行从200移动到0
				startMove(aLi[i],{top:0});
			}
			else{
				if(i==now+11)
				{
					startMove(aLi[i], {top: 200, opacity: 100}, function (){
						ready=true;
					});
				}
				else
				{
					startMove(aLi[i], {top: 200, opacity: 100});
				}
			}
			i++;
			if(i == now+12){
				
				//点击一下的过程结束了，前三排运动完了，让now+4,向下滚动一排
				now+=4;
				clearInterval(timer);
			}
		},38);
		
	};
	
	//左侧分享到侧边栏
	var oShareTitle = document.getElementById('shareTitle');
	var oShare = document.getElementById('share');
	var oShareUl = oShare.getElementsByTagName('ul')[0];
	$('#shareBtn').click(function(){
		startMove(oShareTitle,{left:0},function(){
			startMove(oShare,{left:0},function(){
				startMove(oShare,{bottom:0});
			});
		})
		
		
		
	});
	$('#share .close').click(function(){
		$(oShare).animate({bottom:-210},800,function(){
			startMove(oShare,{left:-190},function(){
				startMove(oShareTitle,{left:-190})
			});
		});
	});
	
	
	
	
	
	
	
	
	
	
	
	
	
});