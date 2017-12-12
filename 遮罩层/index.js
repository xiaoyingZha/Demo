window.onload = function(){
	
	//**获取元素**//
	var submit_btn = document.querySelector('.submit');//'提交'按钮
	var shade = document.querySelector('.shade');//遮罩层
	var tip = document.querySelector('.tip');//提示框
	var close = tip.querySelector('.close');//'关闭'按钮
	var sure = tip.querySelector('.sure');//'确认'按钮
	
	
	//**初始化**//
	submitPosition();//'提交'按钮显示
	tipPosition();//'提示'框显示
	shadeSize()//'遮罩层'显示尺寸
	
	
	
	//**绑定事件**//
	submit_btn.onclick = function(){//点击'提交'
	
		shade.style.display = 'block';//显示遮罩层
		tip.style.display = 'block';//显示提示框
		
		tipPosition();//'提示'框显示位置
		shadeSize()//'遮罩层'尺寸
	};
	
	close.onclick = function(){//点击'关闭'
		shade.style.display = 'none';
		tip.style.display = 'none';
	};
	
	sure.onclick = function(){//点击'关闭'
		shade.style.display = 'none';
		tip.style.display = 'none';
	};
	
	window.onresize = function(){//浏览器窗口变化时
		submitPosition();//'提交'按钮显示
		tipPosition();//'提示'框显示
		shadeSize();//'遮罩层'显示尺寸
	};
	
	window.onscroll = function(){//滚动条滚动
		submitPosition();
		tipPosition();
	};
	
	
	
	//**'提交'按钮显示的位置的函数**//
	function submitPosition(){
		var size = windowSize();//获取可是窗口的尺寸
		var scrollTop = document.body.scrollTop||document.documentElement.scrollTop;//获取滚动的top
		var scrollLeft = document.body.scrollLeft||document.documentElement.scrollLeft;//获取滚动的left
		submit_btn.style.top = size.h/8 + scrollTop + 'px';
		submit_btn.style.left = (size.w - submit_btn.offsetWidth)/2 + scrollLeft + 'px';
	}
	
	
	
	//**'提示'框显示的位置的函数**//
	function tipPosition(){
		var size = windowSize();
		var scrollTop = document.body.scrollTop||document.documentElement.scrollTop;//获取滚动的top
		var scrollLeft = document.body.scrollLeft||document.documentElement.scrollLeft;//获取滚动的left
		tip.style.top = (size.h - tip.offsetHeight)/2 + scrollTop + 'px';
		tip.style.left = (size.w - tip.offsetWidth)/2 + scrollLeft + 'px';
	}
	
	
	
	//**'遮罩层'显示尺寸的函数**//
	function shadeSize(){
//		var size = windowSize();
		shade.style.width = document.documentElement.scrollWidth + 'px'||document.body.scrollWidth + 'px';
		shade.style.height = document.documentElement.scrollHeight + 'px'||document.body.scrollHeight + 'px';
	}
	

	//**获取浏览器可视区域尺寸的函数**//
	function windowSize(){
		var w = document.documentElement.clientWidth||document.body.clientWidth;
		var h = document.documentElement.clientHeight||document.body.clientHeight;
		
		return{
			w:w,
			h:h
		};
	}
	
	
	
	
};