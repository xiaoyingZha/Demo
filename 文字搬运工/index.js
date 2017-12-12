window.onload = function (){
//	//获取操作的元素
//	var text1 = document.querySelector('.text1');
//	var text2 = document.querySelector('.text2');
//	var btn = document.querySelector('.btn');
//	var num = document.querySelector('.num');
//	
//	//定义一个状态
//	var state = true;
//	
//	//点击开始搬运文字
//	btn.onclick = function (){
//		
//		if(!state) return;
//		state = false;
//		
//		//搬运文字时禁止输入
//		text1.disabled = true;
//		
//		//每次搬运，先清空上次运过去的
//		text2.innerHTML = '';
//		
//		//将最初的长度储存起来
//		var len = text1.value.length;
//		
//		
//		
//		//设置定时器
//		clearInterval(timer);
//		var timer = setInterval(function(){
//			//获取原字符串
//			var value1 = text1.value;
//			//原字符串长度为零停止搬运
//			if(value1.length==0){
//				clearInterval(timer);
//				state = true;
//				text1.disabled = false;
//			}
//			//字符串裁切
//			var val_0 = value1.slice(0,1);
//			var subVal = value1.slice(1);
//			text1.value = subVal;
//			text2.innerHTML += val_0;
//			//当前字符串的长度 /原字符串的长度
//			num.innerHTML = text2.innerHTML.length + '/' + len;
//		},100);
//		
//		
//	};


	carryWord();//执行文字搬运
};



/*************
 * 文字搬运工      *
 * 			 *
 *************/
function carryWord(){
	
	//获取操作的元素
	var text1 = document.querySelector('.text1');//开始搬运的位置
	var text2 = document.querySelector('.text2');//搬运目的地
	var btn = document.querySelector('.btn');//开始搬运的按钮
	var num = document.querySelector('.num');//搬运的文字数量计算
	
	//定义一个未搬运的状态
	var isState = false;
	
	
	//绑定事件
	btn.onclick = function (){
		
		if(isState) return;
		isState = true;
		
		
		//搬运文字时禁止输入(<textarea>的属性)
		text1.disabled = true;
		
		//每次搬运都先清空text2
		text2.innerHTML = '';
		
		//原字符串的长度存起来
		var len = text1.value.length;
		
		//设置定时器
		clearInterval(timer);
		var timer = 0;
		timer = setInterval(function(){
			
			//获取text1里面的字符串
			var arr = text1.value;
			
			//搬运完后停止定时器
			if(arr.length == 0){
				clearInterval(timer);
				text1.disabled = false;//搬运完可以输入
				isState = false;
			}
			
			//裁切字符串
			var value1 = arr.slice(0,1);
			var value2 = arr.slice(1);
			
			//内容的显示
			text1.value = value2;
			text2.innerHTML += value1;
			
			//数字的变化
			num.innerHTML = text2.innerHTML.length + '/' + len;
			
		},200)
		
	
		
	};
	
	
	
}
