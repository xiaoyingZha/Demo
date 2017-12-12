window.onload = function(){
	tip();
};

/*提示函数*/
function tip(){
	//获取元素
	var main = document.querySelector('.main');
	var aim = document.querySelector('p a');
	var tip = document.querySelector('.tip');
	var ico = tip.querySelectorAll('span')[1];
	//绑定事件
	aim.onmouseover = function (){
		
		tip.style.display = 'block';
		
		var tip_w = tip.offsetWidth;//提示框的宽
		var tip_h = tip.offsetHeight;//提示框的高
		
		var w = this.offsetWidth;
		var h = this.offsetHeight;
		
				
		var top = this.offsetTop;//获取当前目标元素距离定位父级的上边距
		var left = this.offsetLeft;//获取当前目标元素距离定位父级的左边距
		var bottom = main.clientHeight - top - h;//获取当前目标元素距离定位父级的下边距
		var right = main.clientWidth - left - w;//获取当前目标元素距离定位父级的右边距
		
		
		//从top、left、bottom、right中获取最大的值big
		var big = bigNum(top,left,bottom,right);
		

		if(big==top){
			
			tip.style.top = top - tip_h + 'px';
			tip.style.left = '100px'
			
			ico.className = 'top';//三角位置
			
		}else if(big==left){
			
			tip.style.top = '50px';
			tip.style.left = left - tip_w + 'px'
			
			ico.className = 'left';//三角位置
			
			
		}else if(big==bottom){
			
			tip.style.top = top + h + 'px';
			tip.style.left = '100px'
			
			ico.className = 'bottom';//三角位置
			
		}else if(big==right){
			
			tip.style.top = '50px';
			tip.style.left = left + w +'px';
			
			ico.className = 'right';//三角位置
			
		}
		
	};
	
	
	aim.onmouseout = function (){
		tip.style.display = 'none';
	};
}

//获取最大数字的函数
function bigNum(){
	
	var num = 0;
	for(var i=0; i<arguments.length; i++){
		if(arguments[i]>=num){
			num = arguments[i];
		}
	}
	
	return num;
}
