/*兼容获取元素的样式，用这样的方式获取是为了避免offsetWidth等属性获取到的包括padding和边框*/
function getStyle(obj,attr){
	if(obj.currentStyle){
		return obj.currentStyle[attr];
	}
	else{
		return getComputedStyle(obj,false)[attr];
	}
}
/*这个运动函数接收三个参数,要运动的dom对象，要运动的属性和运动终点组成的json，
最后一个是回调函数，在所有运动执行完成之后执行的函数，也可以用于链式运动
*/
function startMove(obj,json,endFn){
	//开始运动之前先把原来的定时器清除，防止多个定时器累加
	clearInterval(obj.timer);
	//每一个要运动的物体都要有一个自己单独的定时器，防止共用一个产生冲突
	obj.timer = setInterval(function(){
		
		var bBtn = true;
		//遍历传进来的json中的各个元素，每一个元素都由属性名称和运动终点组成
		for(var attr in json){
			
			var iCur = 0;
			//如果传进来的属性值是透明度，需要额外处理
			if(attr == 'opacity'){
				//用parseFloat获取是因为透明度本身的值是小数，用parseInt全成0了。
				//乘以100是为了操作的时候用整数处理透明度
				//用四舍五入是为了避免出现小数，有小数就可能导致结果不准确
				if(Math.round(parseFloat(getStyle(obj,attr))*100)==0){
				iCur = Math.round(parseFloat(getStyle(obj,attr))*100);
				
				}
				else{
					iCur = Math.round(parseFloat(getStyle(obj,attr))*100) || 100;
				}	
			}
			else{
				//iCur表示的是运动之前获取到的物体的初始属性值，
				//获取到的属性值本身就是整数加单位，这里加parseInt是为了把获取到的字符串转化成数字
				iCur = parseInt(getStyle(obj,attr)) || 0;
			}
			/*运动速度就等于对应属性的终点值减去获取到的初始值，除以5是为了产生缓冲效果，
			也就是离终点远的时候运动的快，离终点近的时候运动的慢*/
			var iSpeed = (json[attr] - iCur)/5;
			/*速度取整是为了防止算出的速度是小数而作的处理，并且考虑到起点在终点左右两侧的情况
			计算机能处理的最小像素单位是1，小数像素是无法精确处理的*/
			iSpeed = iSpeed >0 ? Math.ceil(iSpeed) : Math.floor(iSpeed);
			if(iCur!=json[attr]){
				bBtn = false;
			}
			//下面是具体的运动过程
			if(attr == 'opacity'){
											   /*这里注意括号，字符串连接的优先级*/
				obj.style.filter = 'alpha(opacity=' +(iCur + iSpeed)+ ')';
				obj.style.opacity = (iCur + iSpeed)/100;
				
			}
			else{
				obj.style[attr] = iCur + iSpeed + 'px';
			}
			
			
		}
		
		if(bBtn){
			clearInterval(obj.timer);
			
			if(endFn){
				endFn.call(obj);
			}
		}
		
	},30);
}
	
	
	