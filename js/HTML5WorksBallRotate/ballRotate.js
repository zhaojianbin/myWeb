
window.onload = function(){
	/*极坐标转换为直角坐标的公式
	x = rsinθcosφ
	y = rsinθsinφ
	z = rcosθ
	θ的取值范围是0到180,φ的取值范围是0到360
	*/
	//球的半径
	var oScene = document.getElementById('scene');
	var oBall = oScene.getElementsByTagName('ul')[0];
	//调用函数绘制
	var balls = new drawBall();
	balls.draw();
	for(var i=0; i<balls.length; i++){
		oBall.appendChild(balls.all[i]);
	}
	//开始旋转
	var maths = new math();
	var bujinzhi = 2;
	//这里更改旋转的轴
	maths.mouse = [1,0,0];
	//这是旋转起来的核心函数
	function rotate(){
		if(bujinzhi>2){
			bujinzhi*=0.9;
		}
		else{
			bujinzhi=2;
		}
		maths.theta+=bujinzhi;
		maths.rotates();
		var arr = maths.arr;
		setCss3(oBall,{transform:"matrix3d("+arr[0]+","+
		arr[1]+","+
		arr[2]+","+
		arr[3]+","+
		arr[4]+","+
		arr[5]+","+
		arr[6]+","+
		arr[7]+","+
		arr[8]+","+
		arr[9]+","+
		arr[10]+","+
		arr[11]+","+
		arr[12]+","+
		arr[13]+","+
		arr[14]+","+
		arr[15]+")"});
	}
	var timer = setInterval(rotate,60);
	
	//旋转滚轮放大缩小，改变的外层盒子的大小
	var oOut = oScene.getElementsByTagName('div')[0];
	var startZ = 100;
	var step = 10;
	mouseScroll(oScene,function(){
		startZ+=step;
		setCss3(oOut,{transform:"translateZ("+startZ+"px)"});
	},function(){
		startZ-=step;
		setCss3(oOut,{transform:"translateZ("+startZ+"px)"});
	})
	
	//通过鼠标控制球的旋转方向和速度
	oScene.onmousedown = function(ev){
		var oEvent = ev || window.event;
		var lx = oEvent.clientX-oScene.offsetLeft-250;
		var ly = oEvent.clientY-oScene.offsetTop-250;
		var end = 0;
		clearInterval(timer);
		document.onmousemove = function(ev){
			var oEvent = ev || window.event;
			var cx = oEvent.clientX-oScene.offsetLeft-250;
			var cy = oEvent.clientY-oScene.offsetTop-250;
			//这里计算出的是原始数据，下面都是在它的基础上进行修改
			end = Math.sqrt((cx-lx)*(cx-lx)+(cy-ly)*(cy-ly));
			//这个地方控制跟随鼠标移动的快慢，除的多就移动的慢
			bujinzhi = end/2;
			maths.mouse = [cx,cy,0];
			maths.theta+=bujinzhi;
			maths.rotates();
			var arr = maths.arr;
			setCss3(oBall,{transform:"matrix3d("+arr[0]+","+
				arr[1]+","+
				arr[2]+","+
				arr[3]+","+
				arr[4]+","+
				arr[5]+","+
				arr[6]+","+
				arr[7]+","+
				arr[8]+","+
				arr[9]+","+
				arr[10]+","+
				arr[11]+","+
				arr[12]+","+
				arr[13]+","+
				arr[14]+","+
				arr[15]+")"});
			lx = cx;
			ly = cy;
		};
		document.onmouseup = function(ev){
			var oEvent = ev || window.event;
			var ox = oEvent.clientX-oScene.offsetLeft-250;
			var oy = oEvent.clientY-oScene.offsetTop-250;
			document.onmousemove = null;
			document.onmouseup = null;
			maths.mouse = [ox,oy,0];
			bujinzhi = end;
			maths.rotates();
			var arr = maths.arr;
			timer = setInterval(rotate,60);
		};
		return false;
	};
};












