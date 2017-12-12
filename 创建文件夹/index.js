window.onload = function(){
	folder();
}


/*文件夹管理*/
function folder(){
	
	/*获取元素*/
	var ul = document.querySelector('ul');//显示文件夹的父级
	var create_btn = document.querySelector('.btn-box a:nth-of-type(1)');//创建文件夹按钮
	var delete_btn = document.querySelector('.btn-box a:nth-of-type(2)');//删除文件夹按钮
	
	
	//点击'创建文件夹'按钮
	create_btn.onclick = function (){
		
		//创建元素
		var li = createElement('li');
		var input = createElement('input');
		var img = createElement('img');
		var p = createElement('p');
		
		
		//给创建的元素添加属性及内容
		li.state = false;//设置状态值
		input.setAttribute('type','checkbox');
		img.setAttribute('src','img.png');
		p.innerHTML = '新建文件夹';
		
		//给创建的li添加事件
		li.onmouseover = function(){//鼠标移入
			
			this.style.borderColor = 'rgba(255,255,255,.6)';
			this.style.backgroundColor = 'rgba(0,0,0,.3)'
			input.style.visibility = 'visible';
			
		};
		li.onmouseout = function(){//鼠标移除
			
			if(this.state==false){//为点击的状态时执行
				this.style.borderColor = '';
				this.style.backgroundColor = ''
				input.style.visibility = '';
			}
		};
		li.onclick = function(){//鼠标点击
			
			if(!this.state){//选中
				this.style.borderColor = 'rgba(255,255,255,.6)';
				this.style.backgroundColor = 'rgba(0,0,0,.3)'
				input.style.visibility = 'visible';
				input.checked = true;
				this.state = true;
			}else{//取消
				this.style.borderColor = '';
				this.style.backgroundColor = ''
				input.style.visibility = '';
				input.checked = false;
				this.state = false;
			}
			
		};
		
		//将创建的元素显示在页面中
		li.appendChild(input);
		li.appendChild(img);
		li.appendChild(p);
		ul.appendChild(li);
	}
	
	
	//点击'删除文件夹'按钮
	delete_btn.onclick = function(){
		
		//获取被'选中'的
		var arr_true = [];//将选中的input存到这个数组中
		var checked_ele = document.querySelectorAll('li input');

		for(var i=0; i<checked_ele.length; i++){
			if(checked_ele[i].checked==true){
				arr_true.push(checked_ele[i]);
			}
		}
		
		//
		for(var i=0; i<arr_true.length; i++){
			
			ul.removeChild(arr_true[i].parentNode)
		}
		
	}
	
	
	
	
	
}


/*创建元素的函数*/
function createElement(obj){
	var obj = document.createElement(obj);
	return obj;
}
