window.onload = function (){
	
	/*获取操作的元素*/
	
	//上面的按钮组(展开、查找、替换)
	var bigBtn = document.querySelectorAll('.main a');
	var openBtn = bigBtn[0];//展开
	var findBtn = bigBtn[1];//查找
	var replaceBtn = bigBtn[2];//替换
	
	//输入框模块显示元素
	var operate = document.querySelector('.operate');
	
	//输入框
	var aInput = operate.querySelectorAll('input');
	var input1 = aInput[0];//(查找输入框)
	var input2 = aInput[1];//(替换输入框)
	
	//下面按钮组(查找、替换、关闭、开始)
	var fun = document.querySelectorAll('.operate a');
	var find_btn = fun[0];//查找
	var replace_btn = fun[1];//替换
	var close_btn = fun[2];//关闭
	var begin_btn = fun[3];//开始
	
	//文本区域元素
	var text_ = document.querySelector('.text-box');
	
	/*获取字符串*/
	var str = text_.innerHTML;
	
	
	/*openBtn展开*/
	
	//定义一个展开开关的状态
	openBtn.onOff = false;
	
	//展开按钮事件
	openBtn.onclick = function (){
		if(!this.onOff){//如果是未展开状态
			this.className = 'bgimg';//自身换图
			findBtn.style.height = '80px';//查找显示
			replaceBtn.style.height = '80px';//替换显示
			operate.style.display = 'block';//输入框模块显示
			this.onOff = true;//同时改变自身状态，为下次准备
			
		} else{
			this.className = '';//恢复自身
			findBtn.style.height = '0';//关闭查找
			replaceBtn.style.height = '0';//关闭替换
			operate.style.display = 'none';//输入框不显示
			this.onOff = false;//改变自身状态
		}
		
	};
	
	//定义一个状态值，判断是查找还是替换
	var is = null;
	
	/*findBtn、find_btn查找*/
	findBtn.onclick = find_btn.onclick = function (){
		
		//输入框样式
		input1.style.width = '410px';
		input2.style.display = 'none';
		
		//如果是查找则状态时find
		is = 'find';
		
		//恢复
		text_.innerHTML = str;
	};
	
 	/*replace、replace_btn替换*/
	replaceBtn.onclick = replace_btn.onclick = function (){
		
		//输入框样式
		input1.style.width = '180px';
		input2.style.display = 'block';
		
		//如果是替换则状态时replace
		is = 'replace';
		
		//恢复
		text_.innerHTML = str;
	};
	
	/*关闭按钮*/
	close_btn.onclick = function (){
		openBtn.className = '';
		findBtn.style.height = '0';
		replaceBtn.style.height = '0';
		operate.style.display = 'none';
		openBtn.onOff = false;//展开按钮的状态不要忘
	};
	
	
	/*begin_btn开始按钮*/
	var arr = [];
	begin_btn.onclick = function (){
		
		//获取输入框内容
		var val1 = input1.value;
		var val2 = input2.value;
		
		if(is == 'find' && val1 != ''){//find查找
			arr = str.split(val1);
			text_ .innerHTML = arr.join('<span>'+val1+'</span>');
			
		} else if(is == 'replace' && val1 != '' && val2 != ''){//replace替换
			arr = str.split(val1);
			str = arr.join(val2);
			text_ .innerHTML = arr.join('<span>'+val2+'</span>');
			
		}
		
		//开始查找同时清空输入框
		input1.value = '';
		input2.value = '';
		
	};

};
