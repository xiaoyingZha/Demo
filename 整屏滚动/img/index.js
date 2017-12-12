//获取操作元素
var div_con = document.querySelectorAll('.content div');//三屏的元素
var head = document.querySelector('.head');//固定定位导航
var a = document.querySelectorAll('.head a');

var num = head.offsetHeight;


//初始化高度
for(var i=0; i<div_con.length; i++){
	showHeight(div_con[i],num)
}
	
//窗口发生变化时改变大小
window.onresize = function (){
	
	for(var i=0; i<div_con.length; i++){
		showHeight(div_con[i],num)
	}
}


//添加点击事件
for(var i=0; i<a.length; i++){
	
	a[i].index = i;//定义索引
	
	a[i].onclick = function (){
		scrollTop(div_con[this.index],this.index);//调用滚轮滑动函数
	};
}


//滚轮滑动函数(设置scrollTop)
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


//生成元素高度为屏幕高度的函数
function showHeight(obj,num){
	obj.style.height = window.innerHeight - num + 'px';
}


	
	
	
	
	

