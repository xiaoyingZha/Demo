window.onload =function(){
	
	//获取元素
	var menu = document.querySelector('#menu');
	var more = document.querySelectorAll('#menu .more');
	
	
	//右键事件
	document.oncontextmenu =function(ev){

		var ev = ev||event;
		ev.preventDefault();//阻止默认行为（默认显示选择框）
		
		
		//鼠标位置
		var x = ev.clientX;
		var y = ev.clientY;
		
		//获取窗口的大小
		var w = windowSize().w;
		var h = windowSize().h;
		
		
		//边界处理
		if(x+menu.offsetWidth>=w){
			x = w - menu.offsetWidth;
		}
		if(y+menu.offsetHeight>=h){
			y = h - menu.offsetHeight;
		}
		
		menu.style.display = 'block';//显示右键菜单
		menu.style.left = x + 'px';
		menu.style.top = y + 'px';
		
	}
	
	//显示子菜单
	for(var i=0; i<more.length; i++){
		more[i].onmouseover =function(){
			var ul = this.querySelector('ul');
			ul.style.display = 'block';
		};
		more[i].onmouseout =function(){
			var ul = this.querySelector('ul');
			ul.style.display = 'none';
		}
	}
	
	menu.onclick = function(ev){
		var ev = ev||event;
		ev.cancelBubble=true;//阻止事件冒泡
	}
	
	document.onclick =function(){
		menu.style.display = 'none';//显示右键菜单
	}
	
	
	
	
	
	//获取浏览器窗口大小的函数
	function windowSize(){
		var w = window.innerWidth;
		var h = window.innerHeight;
		return {
			w:w,
			h:h
		}
	}
	
	//获取指定定位父级的函数
	function findParent(this_,name){
		
		if(this_.parentNode.className!=name){
			findParent(this_.parentNode);
		}else{
			return this_.parentNode;
		}
		
	}
	
};
