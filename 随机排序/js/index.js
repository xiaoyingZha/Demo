//window.onload = function (){
//	
//	/*获取元素*/
//	var ul = document.querySelector('.list');//获取随机盒子的父级ul
//	var aLi = document.	querySelectorAll('.list li');//获取随机盒子li集合
//	var aBtn = document.querySelectorAll('.btn-box a');//获取按钮组
//
//	
//	/*随机函数*/
//	function randomLi(btn){
//		
//		//定义一个空数组
//		var arr = [];
//		
//		//遍历每个li获取内容
//		for(var i=0; i<aLi.length; i++){
//			var content = aLi[i].innerHTML;//将li的内容存起来
//			arr.push(content);//将获取的内容添加到数组中
//		}
//		
//		
//		if(btn==aBtn[1]){//将获取的li内容随机打乱
//			arr.sort(function(a,b){
//				return 0.5 - Math.random();
//			});
//		}else if(btn==aBtn[0]){//从小到大
//			arr.sort(function(a,b){
//				return a-b;
//			});
//		}
//		
//		var html = '';
//		for(var i=0; i<arr.length; i++){
//			html += '<li>'+ arr[i] +'</li>';
//		}
//		
//		ul.innerHTML = html;
//		
//	}
//	
//	/*绑定事件*/
//	
//	aBtn[1].onclick = function(){//随机打乱顺序
//		randomLi(this);
//	};
//	
//	aBtn[0].onclick = function (){//顺序打乱顺序
//		randomLi(this);
//	};
//
//};



/*页面刷新完访问*/
window.onload = function (){
	
	order();//执行排序
		
};
	
/*随机排序*/
function order(){

	//获取操作的元素
	var btn0 = document.querySelectorAll('.btn-box a')[0];//(点击的按钮，从小到大排序)
	var btn1 = document.querySelectorAll('.btn-box a')[1];//(点击的按钮，随机排序)
	var ul = document.querySelector('ul');
	var aLi = document.querySelectorAll('ul li');
	
	
	//绑定点击事件
	sort(btn0);
	sort(btn1);
	
	
	//点击要做的事情
	function sort(btn){
		
		//按钮点击，发生随机排序
		btn.onclick = function (){
			
			//定义一个数组，将随机的数据存起来
			var arr = [];
			
			//遍历li的内容
			for(var i=0; i<aLi.length; i++){
				arr.push(aLi[i].innerHTML);
			}
			
			//判断是按顺序按钮？还是随机按钮
			if(btn==btn1){
				//随机打乱arr数组里的数据
				arr.sort(function(a,b){
					return 0.5 - Math.random();
				});
			} else if(btn==btn0){
				//随机打乱arr数组里的数据
				arr.sort(function(a,b){
					return a-b;
				});
			}
			
			var html = '';
			//将li的内容还回去
			for(var i=0; i<aLi.length; i++){
				html += '<li>'+ arr[i] +'</li>';
			}
			ul.innerHTML = html;
			
		};
		
	}	

};
