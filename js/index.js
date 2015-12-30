$(function(){
	
	//名字区域的鼠标移入移出效果
	$('#container .myName').mouseover(function(){
		$(this).animate({opacity:0});
		$('#container .coverName').animate({height:160},650);
	});
	$('#container .myName').mouseout(function(){
		$(this).animate({opacity:1});
		$('#container .coverName').animate({height:0},100);
	});
	//导航区的左右滑动
	var aLi = $('#container .nav li');
	var aA = $('#container .nav li');
	aLi.each(function(i, element) {
        $(element).mouseover(function(){
			startMove(this,{width:350,opacity:100});
		}).mouseout(function(){
			startMove(this,{width:200,opacity:50});
		});
    });
	//导航区控制页面滚动
	var bodyElem = $('html,body');
	function pageScroll(num){
		//这个变量存储离页面顶部的距离
		var disToTop = 0;
		if(num == 1){
			disToTop = $('#aboutMe').offset().top;
		}
		if(num == 2){
			disToTop = $('#mySkills').offset().top;
		}
		if(num == 3){
			disToTop = 0;
		}
		//这是控制页面滚动的核心语句
		bodyElem.animate({scrollTop:disToTop}, 800);
	}
	aLi.eq(1).click(function(){
		pageScroll(1);
	});
	aLi.eq(2).click(function(){
		pageScroll(2);
	});
	//回到顶部按钮的位置以及显示和隐藏
	function toTop(){
		var scrollTop = $(document).scrollTop();
		if(scrollTop>0){
			$('#backToTop').show();
		}
		else{
			$('#backToTop').hide();
		}
		//这个变量存储回到顶部按钮本身距离页面顶部的距离，然后给回到顶部按钮设置top值
		var backDis = scrollTop+$(window).height()-$('#backToTop').outerHeight()-20;
		$('#backToTop').css('top',backDis);
	};
	//滚动函数添加给网页滚动条，还有窗口尺寸变化，同样是控制回到顶部按钮的位置以及显示和隐藏
	window.onresize = window.onscroll = toTop;
	//给鼠标滚轮添加滚动事件，同样是控制回到顶部按钮的位置以及显示和隐藏
	if(document.addEventListener){
    	document.addEventListener('DOMMouseScroll',toTop,false);
	}
	window.onmousewheel=document.onmousewheel=toTop;//IE/Opera/Chrome
	
	//回到顶部按钮本身的点击事件
	$('#backToTop').click(function(){
		pageScroll(3);
	});
	
	//音乐播放器的控制
	var oAudio = $('#audio').get(0);
	var oProgress = $('#progress').get(0);
	var oSound = $('#sound').get(0);
	var oVolume = $('#volume').get(0);
	//存储调整音量的时候，鼠标按下的那一瞬间的音量按钮的位置
	var iPos = '';
	//判断播放还是停止从而控制播放停止按钮的函数
	function isPlay(){
		if(oAudio.paused){
			$('#playMp3').get(0).className = 'pause';
			oAudio.play();
		}
		else{
			$('#playMp3').get(0).className = 'playing';
			oAudio.pause();
		}
	}
	//播放暂停按钮
	$('#playMp3').click(function(){
		isPlay();
	});
	
	//当视频播放位置发生改变的时候，获取当前已经播放的时间与总时间的比例
	//让进度条刚开始的宽度是0%。然后让进度条当前的宽度等于进度条的总宽度乘以比例
	$(oAudio).bind('timeupdate',function(){
		var scale = oAudio.currentTime / oAudio.duration;
		var oBarWidth = $('#progress').outerWidth()*scale;
		var oProBtnlLeft = ($('#progress').outerWidth()-18)*scale;
		$('#progress .bar').css('width',oBarWidth);
		$('#progress .proBtn').css('left',oProBtnlLeft);
	});
	
	//进度条拖拽
	$('#progress .proBtn').mousedown(function(ev){
		//一点击控制按钮就暂停
		oAudio.pause();
		$('#playMp3').get(0).className = 'playing';
		
		document.onmousemove = function(ev){
			var leftVal = ev.clientX-$('#progress').offset().left-9;
			if(leftVal <=0){
				leftVal = 0;
			}
			if(leftVal>=oProgress.offsetWidth-18){
				leftVal=oProgress.offsetWidth-18;
			}
			$('#progress .proBtn').css('left',leftVal);
		};
		document.onmouseup = function(ev){
			var scale = $('#progress .proBtn').get(0).offsetLeft / oProgress.offsetWidth;
			oAudio.currentTime = oAudio.duration*scale;
			oAudio.play();
			$('#playMp3').get(0).className = 'pause';
			document.onmousemove = null;
			document.onmouseup = null;
		};
		
		return false;
	});
	//静音按钮的点击事件
	
	$('#sound').click(function(){
		if(oAudio.muted){
			oAudio.muted = false;
			$('#volumeBtn').css('left',iPos).css('background','#fff');
			oSound.className = 'soundon';
		}
		else{
			oAudio.muted  = true;
			$('#volumeBtn').css('left',0).css('background','#999');
			oSound.className = 'soundon soundoff';
		}
	})
	
	//音量大小的拖拽
	//初始化
	oAudio.volume = 1;
	var oVolBtnLeft = $('#volume').outerWidth()-15;
	$('#volumeBtn').css('left',oVolBtnLeft);
	iPos = $('#volume').outerWidth()-15;
	
	$('#volumeBtn').mousedown(function(ev){
		//一点击音量按钮，静音就不管用了
		oAudio.muted = false;
		//把按钮的静音样式取消
		$('#volumeBtn').css('background','#fff');
		
		if(oSound.className == 'soundon soundoff'){
			oSound.className = ' soundon';
		}
		document.onmousemove = function(ev){
			var leftVal = ev.clientX-$('#volume').offset().left-8;
			if(leftVal <=0){
				leftVal = 0;
			}
			if(leftVal>=oVolume.offsetWidth-15){
				leftVal=oVolume.offsetWidth-15;
			}
			$('#volumeBtn').css('left',leftVal);
		};
		document.onmouseup = function(){
			
			//记录弹起来的那一瞬间音量按钮的位置
			iPos = $('#volumeBtn').css('left');
			//计算松开播放控制按钮之后音量应该在什么地方
			var scale = $('#volumeBtn').get(0).offsetLeft / (oVolume.offsetWidth-15);
			oAudio.volume = 1*scale;
			var oVolBarWidth = oVolume.offsetWidth*scale;
			$('#volume .volumeBar').eq(0).css('width',oVolBarWidth);
			if(scale == 0){
				oSound.className = 'soundon soundoff';
				$('#volumeBtn').css('background','#999');
			}
			document.onmousemove = null;
			document.onmouseup = null;
		};
		return false;
	});
	//图片轮播
	
	//第一部分：选取元素
	
	//选出最外侧的div
	var oWrapImage = $('#playimages').get(0);
	//选出两个按钮，上一个和下一个
	var oBtnPrev = $('#playimages .prev').get(0);
	var oBtnNext = $('#playimages .next').get(0);
	//选出两个遮罩，定位鼠标移入了左边还是右边，哪个按钮应该显示出来
	var oMarkLeft = $('#playimages .markLeft').get(0);
	var oMarkRight = $('#playimages .markRight').get(0);
	//选出放大图的ul
	var oUlBig = $('#playimages .bigPic').get(0);
	//选出放大图的所有li
	var aLiBig = oUlBig.getElementsByTagName('li');
	//选出放小图的div
	var oDivSmall = $('#playimages .smallPic').get(0);
	//选出放小图的ul,下面的小图运动就靠它的left变化
	var oUlSmall = oDivSmall.getElementsByTagName('ul')[0];
	//选出放小图的每一个li
	var aLiSmall = oDivSmall.getElementsByTagName('li');
	//用一个变量存放大图的层级
	var nowZIndex = 2; 
	//小图的index是循环的时候用i赋值的，大图的索引由now确定
	//因为在给小图添加点击事件的时候，把小图的索引赋值给了now
	var now = 0;
	//这句用来设置包裹小图片的ul的宽度，让所有的小图排成一排
	oUlSmall.style.width = aLiSmall.length*aLiSmall[0].offsetWidth+'px';
	
	
	//存放图片文字说明的div
	var oTxt = document.getElementById('text');
	var Says = ["我的家乡张家口，一片大好河山", 
	"母校的一角" ,
	"一直都很喜欢的运动员，丁俊晖", 
	"偶像，他的歌曲带给我很多感动",
	"对生活，满怀敬意" ,
	"对未来，些许期待"];
	
	//计算图片数量的div
	var oNum = document.getElementById('length');
	
            
	
	
	/*第二部分，左右按钮淡入淡出
	由于按钮的层级比遮罩高，所以当移入按钮的时候，事实上是移出了遮罩。
	这时候有必要加上按钮和遮罩的移入移出都执行同样的东西。
	移入的时候不透明度变成100，移出的时候不透明度变成0,这段用原生的写更简单*/
	oBtnPrev.onmouseover = oMarkLeft.onmouseover = function(){
		startMove(oBtnPrev,{opacity:100});
	};
	oBtnPrev.onmouseout = oMarkLeft.onmouseout = function(){
		startMove(oBtnPrev,{opacity:0});
	};
	oBtnNext.onmouseover = oMarkRight.onmouseover = function(){
		startMove(oBtnNext,{opacity:100});
	};
	oBtnNext.onmouseout = oMarkRight.onmouseout = function(){
		startMove(oBtnNext,{opacity:0});
	};
	
	
	//第三部分，大图切换
	for(var i=0; i<aLiSmall.length; i++){
		//遍历所有的小图，给每一个小图加上索引,这样就可以确定跟小图对应的大图了
		aLiSmall[i].index = i;
		
		
		//给小图添加点击事件，如果不是重复点击就调用切换函数
		aLiSmall[i].onclick = function(){
			//如果重复点击就不理
			if(this.index === now)return;
			//不是重复点击就把now更新成当前图片的索引
			now = this.index;
			tabPic();
			
		};
		
		
		//给小图添加鼠标移入移出事件,移入就是不透明度100，移出透明度恢复默认
		//这个部分很容易
		aLiSmall[i].onmouseover = function(){
			startMove(this,{opacity:100});
		};
		//移出的时候要注意，只有小图不是当前小图的情况下才降低透明度
		//如果移出的小图就是当前的小图，那就不能降低透明度
		aLiSmall[i].onmouseout = function(){
			if(this.index !== now){
				startMove(this,{opacity:45});
			}
			
		};
	}
	
	//第四部分，切换函数,控制小图的不透明度和滚动位置，以及大图的层级和下拉效果，还有两侧的文字说明
	function tabPic(){
		//当小图被点击的时候，对应的大图的层级位于最上面，这就是切换的核心步骤
		aLiBig[now].style.zIndex = nowZIndex++;
		//先把大图的高度设置为0，然后运动到实际的高度，实现下拉效果
		aLiBig[now].style.height = 0;
		startMove(aLiBig[now],{height:360});
		
		//遍历小li，先让所有的不透明度都是初始值，再让当前的不透明度变成100.
		for(var i=0; i<aLiSmall.length; i++){
			startMove(aLiSmall[i],{opacity:45});
		}
		startMove(aLiSmall[now],{opacity:100});
		
		//处理下面小图的滚动位置，要特殊处理第一张图和最后两张图
		//now从0开始，now的最大值比aLiSmall的length小1
		if(now === 0){
			startMove(oUlSmall,{left:0});
		}
		//倒数第二张图跟最后一张图，包裹小图的ul的滑动位置是一样的
		else if(now === aLiSmall.length-2 || now === aLiSmall.length-1){
			startMove(oUlSmall,{left:-2*aLiSmall[0].offsetWidth});
		}
		else{ 
			startMove(oUlSmall,{left:-(now-1)*aLiSmall[0].offsetWidth});
		}
		
		
		//左侧的文字说明
		for (var i = 0; i < Says.length; i++) {
			if (i == now) {
				oTxt.innerHTML = Says[i];
			}
    	}
		//右侧的图片计数
		oNum.innerHTML = (now + 1) + "/" + aLiSmall.length;
	}
	
	//第五部分：左右按钮的点击事件
	oBtnPrev.onclick = function(){
		now--;
		//减到第一张就再跳到最后一张
		if(now === -1){
			now=aLiSmall.length-1;
		}
		
		tabPic();
	};
	oBtnNext.onclick = function(){
		now++;
		//如果已经是最后一张，那就到第一张
		if(now === aLiSmall.length){
			now=0;
		}
		
		tabPic();
	};
	
	//第六部分，自动播放
	var timer = setInterval(oBtnNext.onclick,5000);
	oWrapImage.onmouseover = function(){
		clearInterval(timer);
	};
	oWrapImage.onmouseout = function(){
		timer = setInterval(oBtnNext.onclick,5000);
	};
	
	//放大镜效果
	var oMark = $('#magnifier .mark').eq(0);
	var oFloat = $('#magnifier .floatLayer').eq(0);
	var oBig = $('#magnifier .bigPic').eq(0);
	var oImg = $('#magnifier img').eq(1);
	
	oMark.mouseover(function(){
		oFloat.show();
		oBig.show();
	});
	oMark.mouseout(function(){
		oFloat.hide();
		oBig.hide();
	});
	
	oMark.mousemove(function(oEvent){
		//获得鼠标相对于遮罩层的位置
		//左面的距离=鼠标x轴位置减去遮罩左边距
		//上面的距离=鼠标y轴位置-遮罩总的上边距
		//再减去浮动小块本身宽高的一半是为了鼠标在中心点上
		var l = oEvent.pageX-oMark.offset().left-oFloat.outerWidth()/2;
		var t = oEvent.pageY-oMark.offset().top-oFloat.outerHeight()/2;
		
		if(l<0){
			l=0;
		}
		else if(l>oMark.outerWidth()-oFloat.outerWidth()){
			l=oMark.outerWidth()-oFloat.outerWidth()
		}
		if(t<0){
			t=0;
		}
		else if(t>oMark.outerHeight()-oFloat.outerHeight()){
			t=oMark.outerHeight()-oFloat.outerHeight();
		}
		//用鼠标相对于遮罩层的位置控制浮动小块的位置
		oFloat.css('left',l);
		oFloat.css('top',t);
		//悬浮块在遮罩层中移动的比例,核心步骤还是用小块移动的比例来控制大图的位置
		var percentX = l/(oMark.outerWidth()-oFloat.outerWidth());
		var percentY = t/(oMark.outerHeight()-oFloat.outerHeight());
		//特别要注意大图和小图能移动的距离是多少
		oImg.css('left',-percentX*(oImg.outerWidth()-oBig.outerWidth()));
		oImg.css('top',-percentY*(oImg.outerHeight()-oBig.outerHeight()));
	});
	
	//手风琴效果
	var oTextInfo = document.getElementById('textInfo');
	var aP = oTextInfo.getElementsByTagName('p');
	//滑动函数，传入最外层div的id
	function slide(id) {
		var oAccordion=document.getElementById(id);
		var oUl=oAccordion.getElementsByTagName('ul')[0];
		var aImg=oUl.getElementsByTagName('img');
		//存放图片路径的数组
		var imgarr=[
					'images/indexAboutMe/1.jpg',
					'images/indexAboutMe/2.jpg',
					'images/indexAboutMe/3.jpg',
					'images/indexAboutMe/4.jpg',
					'images/indexAboutMe/5.jpg'
					]
		var arr=[];
		var aLi=oUl.children;
		//获取到一个li的宽度
		var iWidth=aLi[0].offsetWidth;
		//样式初始化，把ul弄成相对定位
		oUl.style.position='relative';
		//这里的高度和布局中li的高度相同
		oUl.style.height='380px';
		//遍历li，arr中存放所有li的初始左边距，也就是到ul的左边距
		for(var i=0;i<aLi.length;i++) {
			arr.push(aLi[i].offsetLeft);
			//把图片引入进来，这里的路径是html页面相对于图片的路径，而不是js相对图片的路径
			aImg[i].src=imgarr[i];
		};
		//给li设置相对定位，并且初始化所有li的位置，还原到布局时候的样子
		for(var i=0;i<aLi.length;i++) {
			aLi[i].style.position='absolute';
			aLi[i].style.left=arr[i]+'px';
		};
		//遍历所有的li
		for(var i=0;i<aLi.length;i++) {
			//保存索引
			aLi[i].index=i;
			//添加鼠标移入事件
			aLi[i].onmouseover=function() {
				//再遍历一次，分情况先给所有的li设置位置，再
				for(var i=0;i<aLi.length;i++){
					//在当前鼠标移入li右边的li
					if(i>this.index) {
						startMove(aLi[i],{
							//需要用总共的宽度减去一些，如果直接是总宽度，那就看不到了
							//用总宽度减去多少，就是从右边露出来多少。
							//露出的宽度是：半个li的宽度*(li的总数-当前正被移动的li的索引)
							left:oUl.offsetWidth-(aLi.length-i)*iWidth/2,
							width:88
						});
					}
					else{
						//在当前鼠标移入li左边的li,或者是当前正被移入的li
						startMove(aLi[i],{
							left:i*iWidth/2,
							width:88
						});
					}
					//正被移入的li
					startMove(this,{
						width:600,
						//初始的左边距减去一些
						left:arr[this.index]-this.index*iWidth/2-this.index*10	
					})
				}
				for(var j=0; j<aP.length; j++){
					aP[j].style.display = 'none';
				}
				aP[this.index].style.display = 'block';
			}
			
			//鼠标移出就回到初始位置
			aLi[i].onmouseout=function() {
				for(var i=0;i<aLi.length;i++) {
					startMove(aLi[i],{
						left : arr[i],
						width:iWidth
					})
				}
			};
		};
	};
	
	slide('accordion');
	//鼠标移出整个关于我，还需要让所有的文字介绍隐藏起来
	var oAboutMe = document.getElementById('aboutMe');
	oAboutMe.onmouseout = function(){
		for(var j=0; j<aP.length; j++){
			aP[j].style.display = 'none';
		}
	};
	//我的技能开始
	var oShowSkills = document.getElementById('showSkills');
	var aLiSkills = oShowSkills.getElementsByTagName('li');
	var currentIndex = 2001;
	
	//布局转换，先加left和top，再加定位，不能在一个循环中同时加
	for(var i=0; i<aLiSkills.length; i++){
		aLiSkills[i].style.left = aLiSkills[i].offsetLeft+'px';
		aLiSkills[i].style.top = aLiSkills[i].offsetTop+'px';
	}
	for(var i=0; i<aLiSkills.length; i++){
		aLiSkills[i].style.position = 'absolute';
		aLiSkills[i].style.margin = '0';
	}
	for(var i=0; i<aLiSkills.length; i++){
		aLiSkills[i].onmouseover = function(){
			this.style.zIndex = currentIndex++;
			startMove(this,{width:350,height:300,marginLeft:-15,marginTop:-10});
		};
		aLiSkills[i].onmouseout = function(){
			startMove(this,{width:320,height:280,marginLeft:0,marginTop:0});
		};
	}
	
	
	//检测是否是移动设备
	 function browserRedirect() {
		var sUserAgent = navigator.userAgent.toLowerCase();
		var bIsIpad = sUserAgent.match(/ipad/i) == "ipad";
		var bIsIphoneOs = sUserAgent.match(/iphone os/i) == "iphone os";
		var bIsMidp = sUserAgent.match(/midp/i) == "midp";
		var bIsUc7 = sUserAgent.match(/rv:1.2.3.4/i) == "rv:1.2.3.4";
		var bIsUc = sUserAgent.match(/ucweb/i) == "ucweb";
		var bIsAndroid = sUserAgent.match(/android/i) == "android";
		var bIsCE = sUserAgent.match(/windows ce/i) == "windows ce";
		var bIsWM = sUserAgent.match(/windows mobile/i) == "windows mobile";
		if (bIsIpad || bIsIphoneOs || bIsMidp || bIsUc7 || bIsUc || bIsAndroid || bIsCE || bIsWM) {
			alert("检测到您可能正在使用移动设备，横屏浏览的效果会更好哟！^-^");
			$('#backToTop').css('opacity','0');
			$('#backToTop a').css('opacity','0');
		} else {
			return;
		}
	}
	browserRedirect();
			
	
	
	
	
	
});