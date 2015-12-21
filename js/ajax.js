function ajax(method,url,data,fuSucc,fnFailed){
	 //1.创建ajax对象
	 //注意这里要加window把它变成一个属性
	  if(window.XMLHttpRequest){
		  var oAjax = new XMLHttpRequest();
	  }
	  else{
		  //这是给IE6写的
		  var oAjax = new ActiveXObject('Microsoft.XMLHTTP');
	  }
	  
	  
	  if(method.toLowerCase()=='get' && data){
		  url+= '?'+data;
	  }
	  
	  //2.连接服务器
	  //true表示异步
	  oAjax.open(method,url,true);
	  
	  //3.发送请求
	  if(method.toLowerCase()=='get'){
		  oAjax.send();
	  }
	  else{
		  oAjax.setRequestHeader('content-type','application/x-www-form-urlencoded');
		  oAjax.send(data);
	  }
	  
	  
	  //4.接收返回
	  //onreadystatechange事件是当ajax和服务器之间有通信的时候发生
	  oAjax.onreadystatechange = function(){
		  //通过readyState判断是否结束，注意结束不一定是成功
		  if(oAjax.readyState === 4){
			  //通过状态码判断是否成功
			  if(oAjax.status === 200){
				  //成功的时候调用成功函数，把响应信息传出去
				  fuSucc(oAjax.responseText);
			  }
			  else{
				  if(fnFailed){
					 fnFailed(oAjax.status); 
				  }
			  }
		  }
	  };
}