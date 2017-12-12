window.onload = function(){
	
	//获取元素
	var imgBox = document.querySelector('.img-box');//图片盒子
	var fdj = document.querySelector('.fdj');//放大镜
	var showBox = document.querySelector('.show-box');//显示大图的盒子
	
	
	//
	imgBox.onmousemove = function(event){
		
		//显示放大镜
		fdj.style.display = 'block';
		showBox.style.display = 'block';
		
		//计算放大镜的left值和top值
		var left_ = event.clientX - imgBox.offsetLeft - imgBox.clientLeft - fdj.offsetWidth/2;
		var top_ = event.clientY - imgBox.offsetTop - imgBox.clientTop - fdj.offsetHeight/2;

		//边界处理
		if(left_<=0){
			left_ = 0;
		}
		if(left_>=imgBox.clientWidth-fdj.offsetWidth){
			left_ = imgBox.clientWidth-fdj.offsetWidth;
		}
		if(top_<=0){
			top_ = 0;
		}
		if(top_>=imgBox.clientHeight-fdj.offsetHeight){
			top_ = imgBox.clientHeight - fdj.offsetHeight;
		}
		
		//设置放大镜的位置
		fdj.style.top = top_ + 'px';
		fdj.style.left = left_ + 'px';
		
				
		//背景图定位的偏移大小
		var positionX = left_*(showBox.clientWidth/fdj.offsetWidth);
		var positionY = top_*(showBox.clientHeight/fdj.offsetHeight);
		
		//显示放大图的背景图的定位
		showBox.style.backgroundPosition = -positionX +'px -'+positionY +'px';
		
	};
	
	imgBox.onmouseout =function(){
		fdj.style.display = 'none';
		showBox.style.display = 'none';
	};
	
	
};	
