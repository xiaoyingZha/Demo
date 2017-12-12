window.onload = function(){
	
	//**获取元素**//
	var directory = document.querySelector('.directory');//目录列表
	var infoList = document.querySelector('.info-list');//信息列表
	var pages = document.querySelector('.pages');//翻页盒子
	
	//**每页显示信息条数**//
	var page_num = 4;
	
	
	//**页面每次刷新获取search值**//
	var search_ = changeSearch();
	
	
	//**显示页面结构**//
	directoryShow();//显示左侧directory目录
	infoShow();//显示右侧info-list信息栏
	pageShow();//显示翻页
	
	
	//**显示左侧directory目录的函数**//
	function directoryShow(){
		
		//**获取json里面的目录内容
		var arr = aData.list;
		
		
		//**创建li
		var html = ''
		for(var i=0; i<arr.length; i++){
			html +='<li><a href="javascript:;">'+ arr[i].text +'</a><span>'+ arr[i].text1 +'</span></li>';
		}
		directory.innerHTML = html;//将li显示在页面上
		
		
		//**获取a元素
		var a = directory.getElementsByTagName('a');
		
		
		//**获取Search对象的lx值（如果lx不存在，默认显示第一个）
		var value = changeSearch().lx||aData.list[0].lx;
		
		
		//**显示对应的目录a的颜色
		for(var i=0; i<arr.length; i++){
			if(arr[i].lx==value){
				a[i].style.color = '#f92746';
			}
		}
		
		//**遍历a绑定事件
		for(var i=0; i<a.length; i++){
			a[i].index = i;
			//添加点击事件
			a[i].onclick = function(){//改变search中的lx值
				
				//方法一：直接修改
				//window.location.search = 'lx=' + arr_shearch[this.index];
				
				//给方法二：自己加链接
				this.href = '?lx=' + arr[this.index].lx;
			}
		}

	}
	
	
	
	//**显示右侧结构的函数**//
	function infoShow(){
		
		//获取search 中的lx值（判断有没有，没有就默认第一个）
		var value = changeSearch().lx||aData.list[0].lx;
		
		//找到存储信息的对象
		var obj = aData[value].text;
		
		
		//从search中获取当前是第几页（如果没有就是第一页）
		var page_ = changeSearch().page||1;
		
		//裁切li数组
		obj = obj.slice(page_*page_num-page_num,page_*page_num);
		
		
		//创建info-list的li及li的子孙元素
		for(var i=0; i<obj.length; i++){
			
			//**创建li
			var li = document.createElement('li');
			
			//**创建li的第一个子元素div
			var div = document.createElement('div');
			var num = format(i+1+Number((page_-1)*page_num));//num补零
			div.className = 'num';
			div.innerHTML = num;
			li.appendChild(div);
			
			//**创建li的第二个子元素p
			var p = document.createElement('p');
			p.innerHTML += '<span>职位需求：'+obj[i].zw+'</span><span>需求人数：'+ obj[i].rs +'名</span><span>岗位要求：'+ obj[i].info[0].l.join()+'名</span>';
			li.appendChild(p);
			
			//**创建li的第三个子元素div
			var div = document.createElement('div');																											
			div.innerHTML = '<div class="release"><time>'+obj[i].sj.join()+'</time><a href="details.html?'+ changeSearch('index',i+Number((page_-1)*page_num),true) +'">详情&gt;&gt;</a></div>';
			li.appendChild(div);
			
			
			//**li绑定事件
			li.onmouseover = function(){//添加移入事件
				this.style.borderColor = '#444';
				this.firstElementChild.style.color = '#f92746';
			}
			li.onmouseout = function(){//添加移除事件
				this.style.borderColor = '';
				this.firstElementChild.style.color = '';
			}
			
			
			//**将li显示在页面中
			infoList.appendChild(li);
		}
		
		
		
	}
	
	
	//**显示翻页结构的函数**//
	function pageShow(){
		
		//**获取Search对象的lx值（判断有没有，没有就默认第一个）
		var value = changeSearch().lx||aData.list[0].lx;
		
		//**找到存储信息的对象
		var obj = aData[value].text;
		
		//**总共多少页
		var len = Math.ceil(obj.length/page_num);
		
		//**创建页码a
		var html = '';
		for(var i=1; i<=len; i++){
			
			//向search中添加page
			var search = changeSearch('page',i,true);
						
			html += '<a href="?'+search+'">'+i+'</a>';//给页码按钮添加search中的page值对应自己
		}
		//将页码a显示在页面中
		pages.innerHTML = '<a href="">&lt;</a>' + html + '<a href="">&gt;</a>';
		
		
		//**获取所有页码按钮
		var a = pages.querySelectorAll('a');
		
		
		//**获取当前是第几页（否则就是在第一页）
		var pageNum = changeSearch().page||1;
		
		//1、'页码a'的点击事件
		for(var i=1; i<a.length-1; i++){//取出  <第一个a> 和  <最后一个a>
			if(pageNum==i){//当前显示的页码对应的a改变样式
				a[i].style.color = 'red';
			}
		}
		
		//2、'上一页a'的点击事件
		a[0].onclick = function(){
			
			if(pageNum==1){//如果是第一页，就不执行下面
				return ;
			}else{//如果不是在第一页，则修改search中的page值，翻到上一页
				this.href = '?'+ changeSearch('page',pageNum-1,true);
			}
		}
		
		//3、'下一页a'的点击事件
		a[a.length-1].onclick = function(){
			
			if(pageNum==len){//如果是最后一页，就不执行下面
				return ;
			}else{//如果不是在第一页，则修改search中的page值，翻到下一页
				this.href = '?'+ changeSearch('page',pageNum*1+1,true);
			}
		}
		
	}
	
	
	
	
	//**补0函数**//
	function format(num){//用于给小于10的补零
	    return num<10?'0'+num:''+num;
	}
	
};
