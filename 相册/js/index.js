window.onload = function(){
	
	//**获取元素
	var aBtn = $('.btn-box a');//按钮组
	var aLi = $('.img-list li');//图片组
	
	//变量li
	for(var i=0; i<aLi.length; i++){
		
		aLi[i].style.zIndex = aLi.length - 1 - i;//设置层级
		
		drag(aLi[i]);//执行拖拽函数
	}
	
	
	//**页面刷新'出现按钮组'
	for(var i=0; i<aBtn.length; i++){
		var l = 20 + (aBtn[i].offsetWidth+20)*i;//目标left
		var t = '';//排成一行所以，top不运动
		var oldTop = aBtn[i].offsetTop;//初始的top值
		show(aBtn[i],i,l,t,oldTop);//元素，下标，目标left，目标top，原top
	}
	
	
	//**点击'start按钮'
	aBtn[0].onclick = function(){
		for(var i=0; i<aLi.length; i++){
			var l = (window.innerWidth - aLi[i].offsetWidth)/2+ 10*i;
			var t = (window.innerHeight - aLi[i].offsetHeight)/2;
			show(aLi[i],i,l,t,'');//元素，下标，目标left，目标top，原top
		}
		//取消默认行为
		if(this.releaseCapture){
			this.releaseCapture();
		}
		return false;
		
	};
	
	
	
};


//'元素出现'(一次排开一行)的函数
function show(obj,i,l,t,oldTop){///元素，下标，目标left，目标top，原top
	setTimeout(function(){
		MTweenPlus({
	        obj:obj,
	        attrs:{
	        	top:t + 'px',
	        	left:l + 'px',
	        	'opacity':1	
	        },
	        duration:1000,
	        callBack:function(){
	        	if(oldTop){
	        		waggle(obj,oldTop);//调用按钮上下运动的函数
	        	}
	    		
	        }
	    });
	},i*300)
	
}




//上下运动的函数
function waggle(obj,oldTop){
	
	MTweenPlus({
        obj:obj,
        attrs:{
        	top:oldTop + 5 + 'px',
        },
        duration:1000,
        callBack:function(){
        	MTweenPlus({
		        obj:obj,
		        attrs:{
		        	top:oldTop -5 + 'px',
		        },
		        duration:1000,
		        callBack:function(){
		        	if(obj.style.top==oldTop -5 + 'px'){
		        		waggle(obj,oldTop);
		        	}
		        }
		    });
        }
    });
}


//拖拽的函数
function drag(obj){
	obj.onmousedown = function(ev){
		var ev = ev||event;
		
		var w = ev.clientX - this.offsetLeft;
		var h = ev.clientY - this.offsetTop;
		
		document.onmousemove = function(ev){
			var ev = ev||event;
			//移动距离
			var left = ev.clientX - w;
			var top = ev.clientY - h;
			
			//边界处理
			if(left<0){
				left = 0;
			}else if(left>obj.offsetParent.clientWidth-obj.offsetWidth){
				left = obj.offsetParent.clientWidth-obj.offsetWidth;
			}
			if(top<0){
				top = 0;
			}else if(top>obj.offsetParent.clientHeight-obj.offsetHeight){
				top = obj.offsetParent.clientHeight-obj.offsetHeight;
			}
			
			
			//设置元素的定位位置
			obj.style.left = left + 'px';
			obj.style.top = top + 'px';
			
			
		};
		
		
		document.onmouseup = function(){
			document.onmousemove = document.onmouseup = null;
			//阻止默认行为
			if(obj.releaseCapture){
				obj.releaseCapture();
			}
			
			
		}
		
		//阻止默认行为
		if(this.releaseCapture){
			this.releaseCapture();
		}
		return false;
	};
}