/*获取操作元素*/
var div_con = document.querySelectorAll('.content div');//三屏的元素
var head = document.querySelector('.head');//固定定位导航
var a = document.querySelectorAll('.head a');

var num = head.offsetHeight;//固定导航的高度


/*初始化*/
for(var i=0; i<div_con.length; i++){//执行每屏模块的高度
	showHeight(div_con[i],num);
}
showSign();//执行初始化箭头



/*窗口发生变化时改变大小*/
window.onresize = function (){
	
	for(var i=0; i<div_con.length; i++){//执行每屏模块的高度
		showHeight(div_con[i],num)
	}
	
	showSign();//执行初始化箭头
}

/*滑动时*/
window.onscroll = function(){
	showSign();//执行初始化箭头
}

/*添加点击事件*/
for(var i=0; i<a.length; i++){//导航点击事件
	
	a[i].index = i;//定义索引
	a[i].onclick = function (){
		scrollTop(div_con[this.index],this.index);//调用滚轮滑动函数
	};
}

/*生成元素高度为屏幕高度的函数*/
function showHeight(obj,num){
	obj.style.height = window.innerHeight - num + 'px';
}


/*滚轮滑动函数(设置scrollTop)*/
function scrollTop(obj,index){
	
	var top = index*obj.offsetHeight;//要设置的滚轮top值
	
	MTweenPlus({
		        obj:document.documentElement,
		         begins:{
		         	scrollTop:document.documentElement.scrollTop
		         },
		        attrs:{
		        	scrollTop:top
		        },
		        duration:600,
	});
	
	MTweenPlus({
		        obj:document.body,
		         begins:{
		         	scrollTop:document.body.scrollTop
		         },
		        attrs:{
		        	scrollTop:top
		        },
		        duration:600,
	});
}




/*回到顶部、底部的函数*/
function showSign(){		//*****多此一举******//
	
	//获取元素
	var sign = document.querySelector('.sign');
	
	sign.style.left = (window.innerWidth - sign.offsetWidth)/2 + 'px';
	
	
	
	
	//获取页面scrollTop值
	var top = document.documentElement.scrollTop||document.body.scrollTop;
	
	
	//设置位置、位置、功能
	if(top<(div_con.length-2)*window.innerHeight){
		var t = sign.style.top = window.innerHeight -sign.offsetHeight + 'px';
		sign.style.transform='rotateZ(-90deg)';
		
	}else{
		var t = sign.style.top = (div_con.length)*window.innerHeight -sign.offsetHeight-2*num + 'px';
		sign.style.transform='rotateZ(90deg)';
	}
	
	
	//点击事件
	sign.onclick = function(){
		
		
		if(top<(div_con.length-2)*window.innerHeight){
			
			scrollTop(div_con[div_con.length-1],div_con.length-1);
		}else{
			scrollTop(div_con[0],0);
		}
	};
	
	
	
}
	
	
	
	
	

