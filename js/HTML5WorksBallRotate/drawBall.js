/*首先计算角度，然后根据角度定位li*/

function drawBall(){
	this.radius = 220;
	//保存所有点的坐标值
	this.angles = [];
	//li的个数
	this.length = 25;
	//保存所有创建出来的li
	this.all = [];
	//给li设置文字
	this.text = ['','','','','','','','','','','web前端','网站','','css','js','赵建彬','ajax','php','河北工程','张家口','ps','flash','dw','mysql'
	];
}
drawBall.prototype = {
	angle:function(){
		var num = 0;
		//页面上一共需要画25个li，1->3->5->7->5->3->1
		for(var i=0; i<this.length; i++){
			var obj = {};
			//一个的情况
			if(i == 0){
				obj.theta = 0;
				obj.phi = 0;
			}
			//三个的情况
			if(i>0 && i<4){
				obj.theta = Math.PI*1/6;
				obj.phi = Math.PI*2/3*num;
				num++;
			}
			//五个的情况
			if(i>3 && i<9){
				obj.theta = Math.PI*2/6;
				obj.phi = Math.PI*2/5*num;
				num++;
			}
			//最中间的七个
			if(i>8 && i<16){
				obj.theta = Math.PI*3/6;
				obj.phi = Math.PI*2/7*num;
				num++;
			}
			//再向上的五个
			if(i>15 && i<21){
				obj.theta = Math.PI*4/6;
				obj.phi = Math.PI*2/5*num;
				num++;
			}
			//最中间的三个
			if(i>20 && i<24){
				obj.theta = Math.PI*5/6;
				obj.phi = Math.PI*2/3*num;
				num++;
			}
			//最上面的一个
			if(i>23){
				obj.theta = Math.PI;
				obj.phi = 0;
			}
			this.angles.push(obj);
		}
	},
	draw:function(){
		this.angle();
		var radius = this.radius;
		for(var i=0; i<this.length; i++){
			var theta = this.angles[i].theta;
			var phi = this.angles[i].phi;
			//得到的坐标值是相对于左上角的，要分别加上ul宽高的一半
			//还要注意，得到的x是屏幕中的z，得到的y是屏幕中的x，得到的z是屏幕中的y
			var z = radius*Math.sin(theta)*Math.cos(phi);
			var x = radius*Math.sin(theta)*Math.sin(phi)+250;
			var y = radius*Math.cos(theta)+250;
			
			var oLi = document.createElement('li');
			oLi.innerHTML = this.text[i];
			oLi.style.left = x+'px';
			oLi.style.top = y+'px';
			//防止计算机处理sin(pi)有问题
			if(i==24){
				//设置z轴位置和旋转
				setCss3(oLi,{transform:"translateZ("+10+"px) rotateY("+phi+
				"rad) rotateX("+(theta-Math.PI/2)+"rad) "});
			}
			else{
				//设置z轴位置和旋转
				setCss3(oLi,{transform:"translateZ("+z+"px) rotateY("+phi+
				"rad) rotateX("+(theta-Math.PI/2)+"rad) "});
			}
			this.all.push(oLi);
		}
	}
};

//鼠标滚轮事件
function mouseScroll (obj,upfn,downfn) {
   if(obj.attachEvent){
	obj.attachEvent("onmousewheel",scrollFn);  //IE、 opera
	}else if(obj.addEventListener){
	obj.addEventListener("mousewheel",scrollFn,false);  //chrome,safari
	obj.addEventListener("DOMMouseScroll",scrollFn,false);  //firefox
  }
  function scrollFn (e) {
   var ev=e||window.event;
   var num=ev.detail||ev.wheelDelta;
   if(num==120||num==-3){
       if(upfn){
	      upfn.call(obj)
	   }
   }else if(num==-120||num==3){
       if(downfn){
	      downfn.call(obj)
	   }
     
   }
   if (ev.preventDefault ) 
	ev.preventDefault(); //阻止默认浏览器动作(W3C) 
	else
	//IE中阻止函数器默认动作的方式 
	ev.returnValue = false; 
  }
}
//数学函数
function math () {
	this.z=[0,0,1];
	this.mouse=[0,1,0];
	this.xiangl=[];
	this.theta=0;
    this.arr=[];

}
math.prototype={
    rotates:function (theta,xiangl) {
		    var theta=this.theta*Math.PI/180;
		    var xiangl=this.cha();
		    var sqrt = Math.sqrt(xiangl[0] * xiangl[0] + xiangl[1] * xiangl[1] + xiangl[2] * xiangl[2]);
			var u = xiangl[0] / sqrt;
			var v = xiangl[1] / sqrt;
			var w = xiangl[2] / sqrt;
			var newarr = [];
			newarr[0]=Math.cos(theta) + (u * u) * (1 - Math.cos(theta));
			newarr[1]=u * v * (1 - Math.cos(theta)) + w * Math.sin(theta);
			newarr[2]=u * w * (1 -Math.cos(theta)) - v * Math.sin(theta);
			newarr[3]=0;

		    newarr[4]=u * v * (1 - Math.cos(theta)) - w * Math.sin(theta);
			newarr[5]=Math.cos(theta) + v * v * (1 - Math.cos(theta));
			newarr[6]=w * v * (1 - Math.cos(theta)) + u * Math.sin(theta);
			newarr[7]=0;

			newarr[8]=u * w * (1 - Math.cos(theta)) + v * Math.sin(theta);
			newarr[9]=v * w * (1 - Math.cos(theta)) - u * Math.sin(theta);
			newarr[10]=Math.cos(theta) + w * w * (1 - Math.cos(theta));
			newarr[11]=0;

			newarr[12]=0;
			newarr[13]=0;
			newarr[14]=0;
			newarr[15]=1;

			this.arr=newarr;
		  },
	cha:function () {
	  var newarr=[];
	  var arr1=this.z;
	  var arr2=this.mouse;
	  var x1=arr1[0];
	  var y1=arr1[1];
	  var z1=arr1[2];
	  var x2=arr2[0];
	  var y2=arr2[1];
	  var z2=arr2[2];
	 return this.xiangl=[y1*z2-z1*y2,z1*x2-x1*z2,x1*y2-y1*x2];
	}
}
//设置css3的属性
function setCss3 (obj,attrObj) {
   for (var i in attrObj) {
	   var newi=i;
	   if(newi.indexOf("-")>0){
		 var num=newi.isndexOf("-");
		 newi=newi.replace(newi.substr(num,2),newi.substr(num+1,1).toUpperCase());
	   }
	   obj.style[newi]=attrObj[i];
	   newi=newi.replace(newi.charAt(0),newi.charAt(0).toUpperCase());
	   obj.style["webkit"+newi]=attrObj[i];
	   obj.style["moz"+newi]=attrObj[i];
	   obj.style["o"+newi]=attrObj[i];
	   obj.style["ms"+newi]=attrObj[i];
   }
}