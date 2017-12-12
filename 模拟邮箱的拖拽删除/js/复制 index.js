//页面加载完成后执行的代码
window.onload = function(){
	
	//获取元素
	var del = document.querySelector('#del');//删除按钮
	var all = document.querySelector('#all');//全选按钮
	var mail = document.querySelector('.mail');//邮件的父级
	var mailLi = mail.querySelectorAll('li');//邮件li
	var checkBox = mail.querySelectorAll('.checkbox');//邮件的选中按钮
	
	
	
	//点击'删除按钮'，删除元素
	del.onclick = function(){
		deleEle();
	};
	
	
	//记录被选中邮件的数量
	var num = 0;
	
	
	//点击'全选按钮'，全选或者取消
	all.checked = false;
	all.onclick = function(){
		if(this.checked){//当前如果是选中状态，则取消
			this.checked = false;
			this.style.backgroundColor = '';
			
			//邮件的状态也都取消
			for(var i=0; i<checkBox.length; i++){
				checkBox[i].checked = false;
				checkBox[i].style.backgroundColor = '';
			}
			
			//没有被选中的邮件了
			num = 0;
		}else{//当前如果是未选中状态，则选中
			this.checked = true;
			this.style.backgroundColor = '#2b89fd';
			
			//邮件的状态也都选中
			for(var i=0; i<checkBox.length; i++){
				checkBox[i].checked = true;
				checkBox[i].style.backgroundColor = '#2b89fd';
			}
			
			//所有的邮件都被选中了
			num = checkBox.length;
		}
	};
	
	
	//遍历'邮件的选中按钮'，添加事件
	for(var i=0; i<checkBox.length; i++){
		checkBox[i].checked = false;
		checkBox[i].onclick = function(ev){
			if(this.checked){
				this.checked = false;
				this.style.backgroundColor = '';
				num--;
			}else{
				this.checked = true;
				this.style.backgroundColor = '#2b89fd';
				num++;
			}
			
			if(num==checkBox.length){
				all.checked = true;
				all.style.backgroundColor = '#2b89fd';
			}else{
				all.checked = false;
				all.style.backgroundColor = '';
			}
		}
		
	}
	
	
	
	
	//删除元素方法
function deleEle(){
	for(var i=0; i<checkBox.length; i++){
		if(checkBox[i].checked){
			mail.removeChild(checkBox[i].parentNode.parentNode);
			num--;
		}
	}
	
	checkBox = mail.querySelectorAll('.checkbox');//目前邮件的选中按钮
	if(checkBox.length==0){
		all.checked = false;
		all.style.backgroundColor = '';
	}
	
}



	//拖拽删除
	for(var i=0; i<mailLi.length; i++){
		mailLi[i].onmousedown = function(ev){
			var ev = ev||event;
			
			//取消默认行为
			ev.preventDefault();
			
			//滚动条的top
			var scroll_top = document.body.scrollTop||document.documentElement.scrollTop;
			
			if(!this.children[0].children[0].checked) return;
			
			var x1 = ev.clientX;
			var y1 = ev.clientY + scroll_top;
			
			//显示有几个被选中的邮件
			var div = document.createElement('div');
			div.innerHTML = '选中的邮件共'+num+'件';
			div.className = 'tip';
			div.style.top = y1 + 'px';
			div.style.left = x1 + 'px';
			document.body.appendChild(div);
			
			document.onmousemove = function(ev){
				var ev = ev||event;
				
				//取消默认行为
				ev.preventDefault();
				
				var x2 = ev.clientX;
				var y2 = ev.clientY + scroll_top;
				
				div.style.top = y2 + 'px';
				div.style.left = x2 + 'px';
			};
			
			document.onmouseup = function(ev){
				var ev = ev||event;
				//鼠标抬起时删除提示框
				document.body.removeChild(div);
				
				//鼠标的坐标点
				var x1 = ev.clientX;
				var y1 = ev.clientY + scroll_top;
				
				//删除功能的元素
				var eles = document.querySelectorAll('.eles');
				
				for(var i=0; i<eles.length; i++){
					var a2 = eles[i];
					
					//获取a2的中心点坐标
					var x2 = a2.offsetLeft + a2.offsetWidth/2;
					var y2 = a2.offsetTop + a2.offsetHeight/2;
					
					//计算出两中心点的位置
					var x = Math.abs(x1-x2);
					var y = Math.abs(y1-y2);
					console.log(eles,x,scroll_top)
					//计算最大距离
					var maxX = a2.offsetWidth/2;
					var maxY = a2.offsetHeight/2;
					
					if(x<=maxX&&y<maxY){
						deleEle();
					}
					
					document.onmousemove = document.onmouseup = null;
				}
				
			};
			
		};
	}
	
	
};


