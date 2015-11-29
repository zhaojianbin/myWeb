$(function(){
	//一刷新就要重置一下表单
	$("form[name='reg']").get(0).reset();
	//用户名输入框
	$("form input[name='user']").bind('focus',function(){
		$('span.infoUser').css('display','block');
		$('span.errorUser').css('display','none');
		$('span.succUser').css('display','none');
	}).bind('blur',function(){
		if($(this).val() == ''){
			$('span.infoUser').css('display','none');
			$('span.errorUser').css('display','none');
			$('span.succUser').css('display','none');
		}
		else if(!check_user()){
			$('span.infoUser').css('display','none');
			$('span.succ').css('display','none');
			$('span.errorUser').css('display','block');
		}
		else{
			$('span.errorUser').css('display','none');
			$('span.infoUser').css('display','none');
			$('span.succUser').css('display','block');
		}
	});
	function check_user(){
		if(/^[\w]{2,10}$/.test($("form input[name='user']").val())) return true;
	}
		
	//密码强度验证
	/*安全级别的规则
	高：大于等于10个字符，三种不同类型的字符混拼
	中：大于等于8个字符，两种不同类型的字符混拼
	低：大于等于1个字符
	无：没有字符
	判断的时候从高级别到低级别*/
	//密码验证函数
	var flag = false;
	function checkPass(_this){
		flag = false;
		var value = $(_this).val();
		var valueLength = value.length;
		var codeLength = 0;
		//第一个必须条件，6到20位之间
		if(valueLength>=6 && valueLength<=20){
			$('span.infoPass .q1').html('●').css('color','green');
		}
		else{
			$('span.infoPass .q1').html('○').css('color','#666');
		}
		//第二个必须条件，字母，数字，非空字符任意一个即可
		if(valueLength>0 && !/\s/.test(value)){
			$('span.infoPass .q2').html('●').css('color','green');
		}
		else{
			$('span.infoPass .q2').html('○').css('color','#666');
		}
		//第三个必须条件，两种混拼
		if(/[0-9]/.test(value)){
			codeLength++;
		}
		if(/[a-z]/.test(value)){
			codeLength++;
		}
		if(/[A-Z]/.test(value)){
			codeLength++;
		}
		if(/[^0-9a-zA-X ]/.test(value)){
			codeLength++;
		}
		if(codeLength>=2){
			$('span.infoPass .q3').html('●').css('color','green');
		}
		else{
			$('span.infoPass .q3').html('○').css('color','#666');
		}
		//安全级别
		if(valueLength>=10 && codeLength>=3){
			$('span.infoPass .s1').css('color','green');
			$('span.infoPass .s2').css('color','green');
			$('span.infoPass .s3').css('color','green');
			$('span.infoPass .s4').html('高').css('color','green');
		}
		else if(valueLength>=8 && codeLength>=2){
			$('span.infoPass .s1').css('color','#f60');
			$('span.infoPass .s2').css('color','#f60');
			$('span.infoPass .s3').css('color','#ccc');
			$('span.infoPass .s4').html('中').css('color','#f60');
		}
		else if(valueLength>=1){
			$('span.infoPass .s1').css('color','maroon');
			$('span.infoPass .s2').css('color','#ccc');
			$('span.infoPass .s3').css('color','#ccc');
			$('span.infoPass .s4').html('低').css('color','maroon');
		}
		else{
			$('span.infoPass .s1').css('color','#ccc');
			$('span.infoPass .s2').css('color','#ccc');
			$('span.infoPass .s3').css('color','#ccc');
			$('span.infoPass .s4').html('');
		}
		//如果三个条件都满足
		if(valueLength>=6 && valueLength<=20 && !/\s/.test(value) && codeLength>=2){
			flag = true;
		}
	}
	$("form input[name='pass']").bind('keyup',function(){
		checkPass(this);
	});
	//密码验证
	$("form input[name='pass']").bind('focus',function(){
		$('span.infoPass').css('display','block');
		$('span.errorPass').css('display','none');
		$('span.succPass').css('display','none');
	}).bind('blur',function(){
		if($(this).val() == ''){
			$('span.infoPass').css('display','none');
		}
		else{
			if(flag == true){
				$('span.infoPass').css('display','none');
				$('span.errorPass').css('display','none');
				$('span.succPass').css('display','block');
			}
			else if(flag == false){
				$('span.infoPass').css('display','none');
				$('span.errorPass').css('display','block');
				$('span.succPass').css('display','none');
			}
		} 
	});
	//密码确认
	var passTxt = $("form input[name='confirmPass']");
	passTxt.bind('focus',function(){
		$('span.infoConfirm').css('display','block');
		$('span.errorConfirm').css('display','none');
		$('span.succConfirm').css('display','none');
	}).bind('blur',function(){
		if($(this).val() == ''){
			$('span.infoConfirm').css('display','none');
		}
		else if(check2Pass()){
			$('span.infoConfirm').css('display','none');
			$('span.errorConfirm').css('display','none');
			$('span.succConfirm').css('display','block');
		}
		else{
			$('span.infoConfirm').css('display','none');
			$('span.errorConfirm').css('display','block');
			$('span.succConfirm').css('display','none');
		}
	});
	function check2Pass(){
		if(passTxt.val() == $("form input[name='pass']").val()) return true;
	}
	//检测是否已经选择密保问题
	var ques = $("form select[name='ques']");
	function check_ques(){
		if(ques.val().search(/请/)==-1) return true;
	}
	//如果已经选择了，就让错误提示消失
	ques.bind('change',function(){
		if(check_ques()){
			$('span.errorQues').css('display','none');
		}
	});
	//密保问题回答
	var ans = $("form input[name='ans']");
	ans.bind('focus',function(){
		$('span.infoAns').css('display','block');
		$('span.errorAns').css('display','none');
		$('span.succAns').css('display','none');
	}).bind('blur',function(){
		if($(this).val() == ''){
			$('span.infoAns').css('display','none');
		}
		else if(check_ans()){
			$('span.infoAns').css('display','none');
			$('span.errorAns').css('display','none');
			$('span.succAns').css('display','block');
		}
		else{
			$('span.infoAns').css('display','none');
			$('span.errorAns').css('display','block');
			$('span.succAns').css('display','none');
		}
	});
	function check_ans(){
		if(ans.val().length>=2 && ans.val().length<=32) return true;
	}
	//电子邮件
	var email = $("form input[name='email']");
	//验证输入信息
	var reg=/^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
	email.bind('focus',function(){
		//电子邮件框获得焦点的时候
		$('#wrapLay').css('display','block');
		//显示补全内容
		if($(this).val().indexOf('@') == -1){
			$('#houzhui').css('display','block');
		}
		//显示右侧提示信息
		$('span.infoEmail').css('display','block');
		$('span.errorEmail').css('display','none');
		$('span.succEmail').css('display','none');
		//电子邮件框失去焦点的时候
	}).bind('blur',function(){
		//隐藏补全内容
		$('#houzhui').css('display','none');;
		
		if($(this).val() == ''){
			$('span.infoEmail').css('display','none');
		}
		else if(check_email()){
			$('span.infoEmail').css('display','none');
			$('span.errorEmail').css('display','none');
			$('span.succEmail').css('display','block');
		}
		else{
			$('span.infoEmail').css('display','none');
			$('span.errorEmail').css('display','block');
			$('span.succEmail').css('display','none');
		}
		//专门为了下面那个坑爹的文本框弄了一个定时器
		setTimeout(function(){
			$('#wrapLay').css('display','none');
		},500);
	});
	
	function check_email(){
		if(reg.test(email.val())) return true;
	}
	
	//电子邮件补全
	//移入移出
	$('#houzhui li').hover(function(){
		$(this).css('background','#3a3e4a').css('color','#fff');	
	},function(){
		$(this).css('background','#fff').css('color','#666');
	});
	//把用户输入的文字添加到补全内容前面
	$("form input[name='email']").bind('keyup',function(ev){
		//没有@符号的情况下
		if($(this).val().indexOf('@') == -1){
			$('#houzhui').css('display','block');
			$('#houzhui li span').html($(this).val());
		}
		else{
			$('#houzhui').css('display','none');
		}
		
		var length = 6;
		//按向下方向键的时候
		if(ev.which == 40){
			if(this.index == undefined || this.index>=length-1){
				this.index = 0;
			}
			else{
				this.index++;
			}
			$('#houzhui li').css('background','#fff').css('color','#666');
			$('#houzhui li').eq(this.index).css('background','#3a3e4a').css('color','#fff');
		}
		//按上方向键的时候
		if(ev.which == 38){
			if(this.index == undefined || this.index<=0){
				this.index = length-1;
			}
			else{
				this.index--;
			}
			$('#houzhui li').css('background','#fff').css('color','#666');
			$('#houzhui li').eq(this.index).css('background','#3a3e4a').css('color','#fff');
		}
	})
	$('#houzhui li').each(function(i, element){
		//这里要用鼠标按下事件，而不能用点击事件，因为点击在失去焦点之后触发
        $(this).mousedown(function(ev){
			$("form input[name='email']").val($(this).text());
		});
    });
	//生日部分
	var $Year = $("form select[name='year']");
	var $Month = $("form select[name='month']");
	var $Day = $("form select[name='day']");
	function setSelect(n,m,elem){
		for(var i=n; i<=m; i++){
			var option = $('<option></option>');
			option.val(i);
			option.html(i);
			elem.append(option);
		}
	}
	//注入年
	setSelect(1930,2015,$Year);
	//注入月
	setSelect(1,12,$Month);
	//计算天数
	var day30 = [4,6,9,11];
	var day31 = [1,3,5,7,8,10,12];
	//判断选中的月处在哪个数组中
	function inArray(array,value){
		for(var i in array){
			if(array[i] === value) return true;
		}
		return false;
	}
	
	$Year.bind('change',selectDay);
	$Month.bind('change',selectDay);
	
	function selectDay(){
		if($Year.val()!=0 && $Month.val()!=0){
			//清理之前的注入
			$Day.html('<option>--请选择--</option>');
			
			//注入日
			if(inArray(day31,parseInt($Month.val()))){
				setSelect(1,31,$Day);
			}
			else if(inArray(day30,parseInt($Month.val()))){
				setSelect(1,30,$Day);
			}
			else{
				if((parseInt($Year.val())%4==0&&parseInt($Year.val())%100!=0) || parseInt($Year.val())%400==0){
					setSelect(1,29,$Day);
				}
				else{
					setSelect(1,28,$Day);
				}
				
			}
		}
		else{
			//清理之前的注入
			$Day.html('<option>--请选择--</option>');
		}
	}
	
	//补充说明信息
	var textArea = $("form textarea[name='addInfo']");
	textArea.bind('keyup',checkNum).bind('paste',function(){
		//因为粘贴事件会在内容粘贴到文本框之前触发
		setTimeout(checkNum,50);
	});
	//清除多余的字符
	$('.beizhu span.clean').click(function(){
		textArea.val(textArea.val().substring(0,30));
		checkNum();
	});
	//计算数字用来改变提示信息的函数
	function checkNum(){
		var restNum = 30-textArea.val().length;
		if(restNum>=0){
			$('.beizhu').eq(0).css('display','block');
			$('.beizhu').eq(1).css('display','none');
			$('.beizhu .num').eq(0).html(restNum);
			return true;
		}
		else{
			$('.beizhu').eq(0).css('display','none');
			$('.beizhu').eq(1).css('display','block');
			$('.beizhu .num').eq(1).html(Math.abs(restNum)).css('color','red');
			return false;
		}
	}
	//提交按钮
	$('input.submit').click(function(){
		
		var flag1 = true;
		if(!check_user()){
			$('span.errorUser').css('display','block');
			flag1 = false;
		}
		if(!flag){
			$('span.errorPass').css('display','block');
			flag1 = false;
		}
		if(!check2Pass()){
			$('span.errorConfirm').css('display','block');
			flag1 = false;
		}
		if(!check_ques()){
			$('span.errorQues').css('display','block');
			flag1 = false;
		}
		if(!check_ans()){
			$('span.errorAns').css('display','block');
			flag1 = false;
		}
		if(!check_email()){
			$('span.errorEmail').css('display','block');
			flag1 = false;
		}
		if(!checkNum()){
			flag1 = false;
		}
		if(flag1){
			alert('所有信息已经按要求填写！本例主要演示前端验证，没有涉及后端脚本和ajax。后台内容可以到本站 【ajax与后台】 页面查看^-^');
		}
		
	});
	
	
	
});