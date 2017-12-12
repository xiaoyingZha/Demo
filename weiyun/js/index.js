window.onload = function(){
	
	//获取元素
	var weiyun = document.getElementById('weiyun');//微云最外壳
	var head = weiyun.querySelector('.head');//微云的头部
	
	var main = weiyun.querySelector('.main');//微云的主体
	var user = main.querySelector('.user');
	var driectory = main.querySelector('.driectory');
	var content = main.querySelector('.content');
	var contentHead = content.querySelector('.content-head');
	var fileBox = content.querySelector('.file-box');
	var fileInfo = content.querySelector('.file-info');
	var checked = fileBox.querySelectorAll('.checked');//获取选择按钮
	
	
	//初始化元素宽、高
	weiyunSize();
	
	//初始化可视窗口的大小
	windowSize();
	
	//任务列表按钮的执行
	var hiddenTask = taskBtn();
	
	//搜索框的执行
	searchChange();
	
	//下载客户端
	var popup = loadUser();
	
	//用户名
	var hiddenUser = userHelp();
	
	//左侧目录列表
	leftDriectory();
	
	//主体的模式切换按钮
	var hiddenPattern = patternBtn();
	
	//主体的添加按钮
	var hiddenAdd = addBtn();
	
	
	//关于文件夹的操作
	var hiddenChecked = ahoutFolder();
	
	
	//新建文件夹
	addFile();
	
	//更多按钮
	var hiddenMoreList = moreBtn();
	
	
	//可视窗口大小变化时
	window.onresize = function(){
		
		//获取创建的弹出框
		var popup = document.querySelector('.popup-user-serve');
		var deleteHintMain = document.querySelector('.delete-hint-main');
		
		//如果弹出框存在，就执行居中
		if(popup){
			tipPosition(popup);
		}
		
		if(deleteHintMain){
			
			tipPosition(deleteHintMain);
		}
		
		//初始化元素宽、高
		weiyunSize();
				
		
		
	};
	
	
	//添加文档点击事件
	document.onclick = function(ev){
		
		
		hiddenUser();//隐藏用户提示框
		hiddenTask();//隐藏任务列表框
		hiddenPattern();//隐藏切换模式提示框
		hiddenAdd();//隐藏添加按钮的子菜单
		hiddenChecked();//取消选中按钮
		hiddenMoreList();//取消更多按钮的子菜单
	};
	
	
	
	
	
	
	
	
	//'自适应尺寸'的方法：
	function weiyunSize(){
		//主体的高度
		main.style.height = window.innerHeight - head.offsetHeight + 'px';
		//主体左侧目录的高度
		driectory.style.height = main.clientHeight - user.offsetHeight + 'px';
		//主体右侧内容的宽度
		content.style.width = window.innerWidth - driectory.offsetWidth + 'px';
		//文件的外壳高度
		fileBox.style.height = main.clientHeight - contentHead.offsetHeight - fileInfo.offsetHeight+ 'px';		
	};
	
};






//任务列表按钮
function taskBtn(){
	//任务列表按钮
	var task = document.querySelector('.head .task');
	var taskTip = task.querySelector('.task-tip');
	var taskBox = task.querySelector('.task-box');
	var icon = task.querySelector('i.icon-exchange');
	var taskTitleList = task.querySelector('.task-title-list');//提示框里面的分类标题外壳
	var aLi = taskTitleList.querySelectorAll('li');//提示框里面的分类标题li
	var bottomLine = task.querySelector('.bottom-line');
	
	
	//初始显示
	aLi[0].state = true;
	aLi[0].children[0].style.color = '#18a5ff';
	
	//移入边框变色，显示提示
	task.onmouseover = function(ev){
		var ev = ev||event;
		if(ev.target!=this.children[0]) return;
		
		this.style.borderColor = '#d4d9d9';
		MTweenPlus({
	        obj:taskTip,
	        begins:{
	        	'opacity':0	
	        },
	        attrs:{
	        	'opacity':1	
	        },
	        duration:200,
	   });
		
	};
	
	//移出边框恢复，隐藏提示
	task.onmouseout = function(ev){
		
		var ev = ev||event;
		if(ev.target!=this.children[0]) return;
		
		this.style.borderColor = '';
		MTweenPlus({
	        obj:taskTip,
	        begins:{
	        	'opacity':1	
	        },
	        attrs:{
	        	'opacity':0	
	        },
	        duration:200,
	   });
	}
	
	//点击出现任务列表
	task.onclick = function(ev){
		var ev = ev||event;
		
		//阻止冒泡
		ev.cancelBubble = true;
		ev.stopPropagation();
		
		
		if(ev.target!=icon) return;
		
		if(!this.onOff){
			
			//解决阻止事件冒泡带来的后果
			(userHelp())();
			(patternBtn())();
			(addBtn())();
			(ahoutFolder())();
			(moreBtn())();
			
			this.onOff = true;
			this.style.color = '#18a5ff';
			taskBox.style.display = 'block';
			MTweenPlus({
		        obj:taskBox,
		        attrs:{
		        	width:'538px',
		        	height:'428px'
		        },
		        duration:200,
		        way:'easeOut'
		   });
		   		   
		}else{
			
			//如果当前点击的目标元素是icon，才关闭
			this.onOff = false;
			this.style.color = '';
			taskBox.style.display = 'none';
			MTweenPlus({
		        obj:taskBox,
		        attrs:{
		        	width:'0',
		        	height:'0'
		        },
		        duration:200,
		        way:'easeOut'
		   });

			
		}
		
		
				
	};
	
	//点击分类
	for(var i=0; i<aLi.length; i++){
		aLi[i].state = false;
		aLi[i].index = i;
		aLi[i].onclick = function(ev){
			
			var ev = ev||event;
		
			//阻止冒泡
			ev.cancelBubble = true;
			ev.stopPropagation();
			
			//大清除
			for(var i=0; i<aLi.length; i++){
				aLi[i].state = false;
				aLi[i].children[0].style.color = '';
			}
			//当前的改变
			if(!this.state){
				this.state = true;
				this.children[0].style.color = '#18a5ff';
			}
			//蓝色的线跟着走
			if(this.index == 0){
				MTweenPlus({
			        obj:bottomLine,
			        attrs:{
			        	left:'29px'	,
			        	width:'56px'
			        },
			        duration:200,
			   });
			}else if(this.index == 1){
				MTweenPlus({
			        obj:bottomLine,
			        attrs:{
			        	left:'122px',
			        	width:'40px'
			        },
			        duration:200,
			   });
			}
		};
	}
	
	

	
	return function(){
		
		if(!task.onOff) return;
		task.onOff = false;
		task.style.color = '';
		taskBox.style.display = 'none';
		MTweenPlus({
	        obj:taskBox,
	        attrs:{
	        	width:'0',
	        	height:'0'
	        },
	        duration:200,
	        way:'easeOut'
	   });
		
	}

}


//搜索框
function searchChange(){
	var search = document.querySelector('.search');
	var searchInput = search.querySelector('.search input');
	var fdj = search.querySelector('.fdj');
	
	//鼠标移入改变边框颜色
	search.onmouseover = function(){
		searchInput.style.borderColor = '#d4d9d9';
		fdj.style.borderColor = '#d4d9d9';
	};
	
	//鼠标移出，恢复边框颜色
	search.onmouseout = function(){
		searchInput.style.borderColor = '';
		fdj.style.borderColor = '';
	};
	
	//输入框获取焦点，输入框变大
	searchInput.onfocus = function(){
		MTweenPlus({
	        obj:this,
	        attrs:{
	        	width:'280px',
	        },
	        duration:200,
	    });
	};
	
	//输入框失去焦点，恢复大小
	searchInput.onblur = function(){
		MTweenPlus({
	        obj:this,
	        attrs:{
	        	width:'226px',
	        },
	        duration:200,
	    });
	};
}


//下载客户端
function loadUser(){
	var userServe = document.querySelector('.user-serve');
	var loadClient = userServe.querySelector('#load-client');
	
	
	loadClient.onclick = function(){
		//创建遮罩层
		var bg = document.createElement('div');
		bg.className ='popup-bg';
		document.body.appendChild(bg);
		
		//创建弹出框
		var popup = document.createElement('div');
		popup.className = 'popup-user-serve';
		popup.innerHTML = '<header class="popup-head"><h3>下载微云客户端</h3><a href="javascript:;" class="close">+</a>'
						+'</header><div class="popup-content"><div class="popup-phone"><i class="icon-tablet"></i>'
						+'<p><strong>手机版</strong><span>安卓／iPhone手机扫描二维码安装</span></p>'
						+'<div class="phone-img"><img src="../img/erweima.png"/></div>'
						+'</div><div class="popup-pc"><i class=" icon-desktop"></i><p>'
						+'<strong>Windows版</strong><span>支持win10/XP/vista/win7/win8下载安装</span>'
						+'</p><div class="pc-load"><a href="javascript:;">立即下载</a></div></div></div>';
		document.body.appendChild(popup);
		
		//弹出框居中
		tipPosition(popup);
		
		//获取关闭按钮
		var close = popup.querySelector('.close');
		//点击关闭按钮，关闭弹出框及遮罩层
		close.onclick = function(){
			document.body.removeChild(popup);
			document.body.removeChild(bg);
		};
		
	};
	
	
}



//用户名
function userHelp(){
	var userHelpBox = document.querySelector('.user-help-box');
	var name = userHelpBox.querySelector('.user-help-box > a');
	var ico = name.querySelector('i');
	var userHelp = userHelpBox.querySelector('.user-help');
	var userPrivacy = userHelpBox.querySelector('.user-privacy');//用户安全与隐私
	var privacyList = userPrivacy.querySelector('.privacy-list');//安全隐私子菜单
	
	
	
	
	userHelpBox.onclick = function(ev){//点击用户名，显示提示框
		
		var ev = ev||event;
		ev.cancelBubble = true;//阻止事件冒泡
		ev.stopPropagation();
		
		if(ev.target!=name) return;//如果点击的不是用户名位置，则不执行
		
		
		if(!userHelpBox.onOff){
			
			//解决阻止事件冒泡带来的后果
			(taskBtn())();
			(patternBtn())();
			(addBtn())();
			(ahoutFolder())();
			(moreBtn())();
			
			
			userHelpBox.onOff = true;
			userHelpBox.style.backgroundColor = '#eaeef0';
			userHelp.style.display = 'block';
			ico.className = ' icon-caret-up';
		}else{
			userHelpBox.onOff = false;
			userHelpBox.style.backgroundColor = '';
			userHelp.style.display = 'none';
			ico.className = ' icon-caret-down';
		}
		
		
	};
	
	userPrivacy.onmouseover = function(){//鼠标移入，子菜单显示
		privacyList.style.display = 'block';
	};
	
	userPrivacy.onmouseout = function(){//鼠标移除，子菜单隐藏
		privacyList.style.display = 'none';
	};
	
	
	
	return function(){
		if(!userHelpBox.onOff) return;
		
		userHelpBox.onOff = false;
		userHelpBox.style.backgroundColor = '';
		userHelp.style.display = 'none';
		ico.className = 'icon-caret-down';
	}
}




//左侧目录列表
function leftDriectory(){
	var driectory = document.querySelector('.driectory');//左侧目录的最外壳
	var list2 = driectory.querySelector('.list2');
	var aLi = driectory.querySelectorAll('li');//获取所有的li
	var li_All = driectory.querySelector('li.driectory-all');//默认元素
	var title = document.querySelector('.head-title span');//右侧内容的显示标题
	var pattern = document.querySelector('.pattern');//模式按钮
	
	//默认页面刷新时，显示的目录样式
	current(li_All);
	pattern.style.display = 'block';
	
	

	//变量所有的li，添加事件
	for(var i=0; i<aLi.length; i++){
		
		aLi[i].state = false;
				
		
		//鼠标移入添加背景色
		aLi[i].onmouseover = function(){
			if(this.state) return;//如果是点击状态就不执行
			this.style.backgroundColor = '#f5f8f9';
		};
		
		//鼠标移出，恢复背景色
		aLi[i].onmouseout = function(){
			if(this.state) return;//如果是点击状态就不执行
			this.style.backgroundColor = '';
		};
		
		aLi[i].onclick = function(ev){//添加点击事件，
			var ev = ev||event;
			ev.stopPropagation();
			
			(taskBtn())();//隐藏任务列表框
			(patternBtn())();//隐藏切换模式提示框
			(addBtn())();//隐藏添加按钮的子菜单
			(ahoutFolder())();//取消选中按钮
			(moreBtn())();//取消更多按钮的子菜单
			(userHelp())();//隐藏用户提示框
			
			
			
			
			this.style.backgroundColor = '';
			
			//大清除
			for(var i=0; i<aLi.length; i++){
				aLi[i].state = false;
				aLi[i].children[0].style.borderColor = '';
				aLi[i].children[0].style.color = '';
				aLi[i].children[0].children[0].style.color = '';
			}
			
			//当前的添加样式
			if(!this.state){
				current(this);
			}
			
			
			if(this.parentNode == list2){
				
				pattern.style.display = 'block';
			}else{
				pattern.style.display = 'none';
			}
			
		};
		
	}
	
	
	//当前显示的样式及状态
	function current(obj){
		obj.state = true;
		obj.children[0].style.borderColor = '#18a5ff';
		obj.children[0].style.color = '#18a5ff';
		obj.children[0].children[0].style.color = '#18a5ff';
		title.innerHTML = obj.children[0].children[1].innerHTML;
	}
	
	
}




//主体的模式切换按钮
function patternBtn(){
	var pattern = document.querySelector('.content .pattern');//模式切换按钮
	var patternList = pattern.querySelector('.pattern-list');//子菜单
	var aLi1 = patternList.querySelectorAll('.list-list1 li');
	var aLi2 = patternList.querySelectorAll('.list-list2 li');
	var patternMoreIco = pattern.querySelector('.pattern-more');//按钮的小图标
	
	
	//初始化
	aLi1[0].onOff = true;
	aLi1[0].children[0].style.color = '#0c97ea';
	aLi1[0].children[0].children[0].style.color = '#0c97ea';
	aLi2[0].onOff = true;
	aLi2[0].children[0].style.color = '#0c97ea';
	aLi2[0].children[0].children[0].style.color = '#0c97ea';
	
	
	pattern.onclick = function(ev){
		var ev = ev||event;
		ev.cancelBubble = true;
		
		if(!this.onOff){
			
			//解决阻止事件冒泡带来的后果
			(taskBtn())();
			(userHelp())();
			(addBtn())();
			(ahoutFolder())();
			(moreBtn())();
			
			this.onOff = true;
			patternList.style.display = 'block';
			MTweenPlus({
		        obj:patternList,
		        attrs:{
		        	'opacity':1
		        },
		        duration:200,
		        way:'easeOut'
		   });
		   MTweenPlus({
		        obj:patternMoreIco,
		        begins:{
		        	'transform.rotateZ':0
		        },
		        attrs:{
		        	'transform.rotateZ':180
		        },
		        duration:200,
		   });
		}else{
			this.onOff = false;
			patternList.style.display = 'none';
			MTweenPlus({
			        obj:patternList,
		        attrs:{
		        	'opacity':0
		        },
		        duration:200,
		         way:'easeIn'
		   });
		   MTweenPlus({
		        obj:patternMoreIco,
		        begins:{
		        	'transform.rotateZ':180
		        },
		        attrs:{
		        	'transform.rotateZ':0
		        },
		        duration:200,
		   });
		}
		
		
		
	};
	
	
	//遍历li添加事件
	for(var i=0; i<aLi1.length; i++){
		 currentOk(aLi1);
	}
	for(var i=0; i<aLi2.length; i++){
		 currentOk(aLi2);
	}
	
	
	//点击选中状态
	function currentOk(objArr){
		
		objArr[i].onclick = function(ev){
			var ev = ev||event;
			
			//大清除
			for(var i=0; i<objArr.length; i++){
				objArr[i].onOff = false;
				objArr[i].children[0].style.color = '';
				objArr[i].children[0].children[0].style.color = '';
			}
			
			//当前的为选中的
			if(!this.onOff){
				this.onOff = true;
				this.children[0].style.color = '#0c97ea';
				this.children[0].children[0].style.color = '#0c97ea';
			}
		};
	}
	

	
	return function(){
		if(!pattern.onOff) return;//如果是未打开状态，就不执行
		
		patternList.style.display = 'none';
		MTweenPlus({
	        obj:patternMoreIco,
	        begins:{
	        	'transform.rotateZ':180
	        },
	        attrs:{
	        	'transform.rotateZ':0
	        },
	        duration:200,
	   });
	   MTweenPlus({
		        obj:patternList,
	        attrs:{
	        	'opacity':0
	        },
	        duration:200,
	         way:'easeIn'
	   });
	   
	   pattern.onOff = false;//改变状态
	}
	
}



//更多按钮
function moreBtn(){
	var moreBtn = document.querySelector('#more-btn');
	var moreBtnList = moreBtn.querySelector('.more-btn-list');
	
	moreBtn.onclick = function(ev){
		
		var ev = ev||event;
		ev.stopPropagation();
		
		
		if(!this.onOff){
			moreBtnList.style.display = 'block';
			this.onOff = true;
			
		}else{
			moreBtnList.style.display = 'none';
			this.onOff = false;
		}
		
	};
	
	return function(){
		moreBtnList.style.display = 'none';
		moreBtn.onOff = false;
	}
}



//主体的添加按钮
function addBtn(){
	var addBtn = document.querySelector('.content .add-btn');//添加按钮
	var addList = addBtn.querySelector('.add-list');//显示的列表
	
	
	addBtn.onclick = function(ev){
		var ev = ev||event;
		ev.cancelBubble = true;
		
		if(!this.onOff){
			
			//解决阻止事件冒泡带来的后果
			(taskBtn())();
			(userHelp())();
			(patternBtn())();
			(ahoutFolder())();
			(moreBtn())();
			
			
			this.onOff = true;
			addList.style.display = 'block';
		}else{
			this.onOff = false;
			addList.style.display = 'none';
		}
		
		
	};
	
	return function(){
		addBtn.onOff = false;
		addList.style.display = 'none';
	}
}



//
//关于文件夹的操作
function ahoutFolder(){
	var fileBox = document.querySelector('.file-box');//文件夹的最外面一层
	var fileBoxInset = fileBox.querySelector('.file-box-inset');
	var aLi = fileBox.getElementsByTagName('li');//文件夹集合
	var	checked = fileBox.querySelectorAll('.checked');//获取选择按钮
	var allBtn = document.querySelector('.all-btn');//获取全选按钮
	var line = document.querySelector('.content-head .line')//获取全选按钮旁边的线
	var pattern = document.querySelector('.content .pattern');//模式切换按钮
	var checkedSearch = document.querySelector('.checked-search');//选中操作的显示box
	var deleteBtn = checkedSearch.querySelector('.delete');//删除按钮
	
	
	//记录选中文件夹的个数
	var num = 0;
	
	//全选按钮默认状态
	allBtn.checked = false;
	
	
	
	//遍历所有文件夹，添加事件
	for(var i=0; i<aLi.length; i++){
		
		//给li添加自定义属性索引值
		aLi[i].index = i;
		
		
		//移入li事件
		aLi[i].onmouseover = function(){
			
			if(this.children[0].children[0].checked) return;//如果被选中就不执行
			
			this.children[0].children[0].style.borderColor = '#d1cfca';
			this.style.backgroundColor = '#f5f8f9';
		};
		
		//移出li事件
		aLi[i].onmouseout = function(){
			
			if(this.children[0].children[0].checked) return;//如果被选中就不执行
			
			this.children[0].children[0].style.borderColor = '';
			this.style.backgroundColor = '';
		};
		
		//移入checked事件
		checked[i].onmouseover = function(ev){
			var ev = ev||event;
			ev.cancelBubble = true;
			this.style.borderColor = ' #1dabfe';
		};
		//移出checked事件
		checked[i].onmouseout = function(ev){
			var ev = ev||event;
			ev.cancelBubble = true;
			this.style.borderColor = '';
		};
		
		//点击checked事件
		checked[i].onclick = function(ev){
			var ev = ev||event;
			ev.cancelBubble = true;
			
			
			//选中或取消
			if(this.checked){
				this.checked = false;//改变自身状态
				this.style.backgroundColor = '';//改变自身样式
				this.parentNode.parentNode.style.backgroundColor = '';//改变li的样式
				num--;
			}else{
				this.checked = true;//改变自身状态
				this.style.backgroundColor = '#1dabfe';//改变自身样式
				this.parentNode.parentNode.style.backgroundColor = '#f5f8f9';//改变li的样式
				num++;
			}
			
			
			//存储被选中的checked
			var checkedOk = [];
			for(var i=0; i<checked.length; i++){
				if(checked[i].checked){
					checkedOk.push(checked[i]);//将被选中的存到数组
				}
			}
			
			
			//点击时判断num是否大于0，也就是有被选中的
			if(num>0){	
				//全选按钮显示
				allBtn.style.display = 'block';
				line.style.visibility = 'visible';
				
				checkedSearch.style.display = 'block';//选中操作的按钮区显示
				
				pattern.style.display = 'none';//切换模式按钮隐藏
			}else{	
				//全选按钮隐藏
				allBtn.style.display = 'none';
				line.style.visibility = 'hidden';
				
				checkedSearch.style.display = 'none';//选中操作的按钮区隐藏
				
				pattern.style.display = 'block';//切换模式按钮显示
			}
			
			
			//让全选按钮跟着下面的li变化
			if(num==checked.length){
				allBtn.checked = true;
				allBtn.style.backgroundColor = '#1dabfe';
			}else{
				allBtn.checked = false;
				allBtn.style.backgroundColor = '';
			}
			
		};
	}
	
	
	//移入allBtn事件
	allBtn.onmouseover = function(ev){
		var ev = ev||event;
		ev.cancelBubble = true;
		this.style.borderColor = ' #1dabfe';
	};
	
	//移出allBtn事件
	allBtn.onmouseout = function(ev){
		var ev = ev||event;
		ev.cancelBubble = true;
		this.style.borderColor = '';
	};
	
	
	
	//点击全选按钮
	allBtn.onclick = function(ev){
		var ev = ev||event;
		ev.cancelBubble = true;
		
		
		if(this.checked){	
			
			//全选按钮隐藏
			this.checked = false;//恢复状态
			allBtn.style.backgroundColor = '';//恢复颜色
			this.style.display = 'none';//隐藏
			line.style.visibility = 'hidden';//线也隐藏
			
			checkedSearch.style.display = 'none';//选中操作的按钮区隐藏
			
			pattern.style.display = 'block';//切换模式按钮显示
			
			for(var i=0; i<checked.length; i++){
				checked[i].checked = false;//同步状态
				checked[i].style.backgroundColor = '';//改变自身样式
				checked[i].parentNode.parentNode.style.backgroundColor = '';//改变li的样式
			}
				
			num = 0;
		}else{
			this.checked = true;//如果选中，就取消
			allBtn.style.backgroundColor = '#1dabfe';
			
			for(var i=0; i<checked.length; i++){
				checked[i].checked = true;//同步状态
				checked[i].style.backgroundColor = '#1dabfe';//改变自身样式
				checked[i].parentNode.parentNode.style.backgroundColor = '#f5f8f9';//改变li的样式
			}
			
			num = aLi.length;
		}
	};
	
	
	
	//点击删除按钮，删除元素
	deleteBtn.onclick = function(ev){
		var ev = ev||event;
		ev.stopPropagation();
		
		//创建遮罩层
		var hintBg = document.createElement('div');
		hintBg.className = 'delete-hint-bg';
		document.body.appendChild(hintBg);
		
		//创建提示框
		var deleteHintMain = document.createElement('div');
		deleteHintMain.className = 'delete-hint-main';
		deleteHintMain.innerHTML = '<header><h4>删除文件</h4><a href="javascript:;" class="hint-close">'
						+'+</a></header><div class="hint-main"><div class="hint-main-content">'
						+'<p>确定要删除这个文件夹？</p><p>已删除的文件夹可以在回收站找回</p></div><ul>'
						+'<li class="ok-delete"><a href="javascript:;">确定</a></li>'
						+'<li class="no-delete"><a href="javascript:;">取消</a></li></ul></div>';
		
		document.body.appendChild(deleteHintMain);
		
		//获取生成的提示框、关闭按钮、确认删除按钮、取消删除按钮
		var close_btn = deleteHintMain.querySelector('.hint-close');
		var ok_btn = deleteHintMain.querySelector('.ok-delete');
		var no_btn = deleteHintMain.querySelector('.no-delete');
		
		//提示框居中显示
		tipPosition(deleteHintMain);
		
		close_btn.onclick = no_btn.onclick = function(){
			document.body.removeChild(hintBg);
			document.body.removeChild(deleteHintMain);
		};
		
		
		ok_btn.onclick = function(){
			deleEle();
			document.body.removeChild(hintBg);
			document.body.removeChild(deleteHintMain);
			
			createGreenTip('删除文件夹成功')//显示删除成功提示
		};
		
		
		if(aLi.length==0){
			//全选按钮隐藏
			allBtn.style.display = 'none';
			line.style.visibility = 'hidden';
			
			checkedSearch.style.display = 'none';//选中操作的按钮区隐藏
			
			pattern.style.display = 'block';//切换模式按钮显示
		}
	};
	
	
	
	//拖拽删除
	for(var i=0; i<aLi.length; i++){
		aLi[i].onmousedown = function(ev){
			var ev = ev||event;
			ev.preventDefault();//取消默认行为
			
			checked = fileBox.querySelectorAll('.checked');
			var arr = [];
			for(var i=0; i<checked.length; i++){
				if(checked[i].checked) arr.push(checked[i]);
			}
			num = arr.length;
			
			//滚动条的top
			var scroll_top = document.body.scrollTop||document.documentElement.scrollTop;
			
			if(!this.children[0].children[0].checked) return;
			
			var x1 = ev.clientX;
			var y1 = ev.clientY + scroll_top;
			
			//显示有几个被选中的邮件
			var div = document.createElement('div');
			div.innerHTML = num ;
			div.className = 'tip';
			div.style.top = 20 + y1 + 'px';
			div.style.left = 20 + x1 + 'px';
			div.style.display = 'none';//创建完成，先不显示
			document.body.appendChild(div);
			
			document.onmousemove = function(ev){
				var ev = ev||event;
				ev.preventDefault();//取消默认行为
				
				var x2 = ev.clientX;
				var y2 = ev.clientY + scroll_top;
				
				//当鼠标move大于10才显示
				if(Math.abs(x1-x2)>10||Math.abs(y1-y2)>10) div.style.display = 'block';
				
				div.style.top = 20 + y2 + 'px';
				div.style.left = 20 + x2 + 'px';
			};
			
			document.onmouseup = function(ev){
				var ev = ev||event;
				//鼠标抬起时删除提示框
				document.body.removeChild(div);
				
				//鼠标的坐标点
				var x1 = ev.clientX;
				var y1 = ev.clientY + scroll_top;
				
				//删除功能的元素
				var eles = document.querySelectorAll('.delete');
				
				for(var i=0; i<eles.length; i++){
					var a2 = eles[i];
					
					//获取a2的中心点坐标
					var x2 = a2.offsetLeft + a2.offsetWidth/2;
					var y2 = a2.offsetTop + a2.offsetHeight/2;
					
					//计算出两中心点的位置
					var x = Math.abs(x1-x2);
					var y = Math.abs(y1-y2);
					
					//计算最大距离
					var maxX = a2.offsetWidth/2;
					var maxY = a2.offsetHeight/2;
					
					if(x<=maxX&&y<maxY){
						deleEle();
						if(aLi.length==0){
							//全选按钮隐藏
							allBtn.style.display = 'none';
							line.style.visibility = 'hidden';
							
							checkedSearch.style.display = 'none';//选中操作的按钮区隐藏
							
							pattern.style.display = 'block';//切换模式按钮显示
						}
					}
					
					document.onmousemove = document.onmouseup = null;
				}
				
			};
			
		};
	}
	
		
	
	
	
	//删除元素方法
	function deleEle(){
		
		//重新获取
		checked = fileBox.querySelectorAll('.checked');//获取选择按钮
		
		
		for(var i=0; i<checked.length; i++){
			if(checked[i].checked){
				fileBox.children[0].children[0].removeChild(checked[i].parentNode.parentNode);
				num--;
				
			}
		}
		
		checked = fileBox.querySelectorAll('.checked');//重新获取目前文件的选中按钮
		if(checked.length==0){
			allBtn.checked = false;
			allBtn.style.backgroundColor = '';
		}
		
	}
	
	

	//拖拉选中
	fileBox.onmousedown = function(ev){
		var ev = ev||event;
		if(ev.target != fileBoxInset) return;
		
		//清除默认行为
		ev.preventDefault();
		
		if(ev.target.className == 'icon-ok') return;//如果点击的是选中按钮就不执行
		
		(ahoutFolder())();//取消选中
		
		//获取滚动条
		var scrollTop = document.body.scrollTop||document.documentElement.scrollTop;
		
		//获取要去碰的元素
		var aLi = document.querySelectorAll('.file-box li');
		
		//获取鼠标位置坐标
		var x1 = ev.clientX;
		var y1 = ev.clientY;
		
		//创建框元素
		var div = document.createElement('div');
		div.className = 'frame';
		document.body.appendChild(div);
		
		
		//设置div的位置
		div.style.top = y1 + 'px';
		div.style.left = x1 + 'px';
		
		document.onmousemove = function(ev){
			var ev = ev||event;
			
			//清除默认行为
			ev.preventDefault();
			
			//获取鼠标坐标
			var x2 = ev.clientX;
			var y2 = ev.clientY;
			
			//获取要设置的div的宽、高
			var w = Math.abs(x2-x1);
			var h = Math.abs(y1-y2);
			
			if(w>10||h>10){
				div.style.display = 'block';//避免点击事件不能触发(选中框的宽、高至少有一个要>10)
			}
			
			if(x2-x1<0){
				div.style.left = x1 - w + 'px';
			}else{
				div.style.left = x1 + 'px';
			}
			
			if(y2-y1<0){
				div.style.top = y1 - h + 'px';
			}else{
				div.style.top = y1 + 'px';
			}
			
			div.style.width = w + 'px';
			div.style.height = h + 'px';
			
			
			
			boom(div,aLi,function(a2){
				
				a2.children[0].children[0].checked = true;//改变按钮状态
				a2.children[0].children[0].style.backgroundColor = '#1dabfe';//改变按钮样式
				a2.children[0].children[0].style.borderColor = '#1dabfe';
				a2.style.backgroundColor = '#f5f8f9';//改变li的样式
				
			},function(a2){
				
				a2.children[0].children[0].checked = false;//改变按钮状态
				a2.children[0].children[0].style.backgroundColor = '';//改变按钮样式
				a2.children[0].children[0].style.borderColor = '';
				a2.style.backgroundColor = '';//改变li的样式
				
			},'');
			
			
			
			//点击时判断num是否大于0，也就是有被选中的
			if(num>0){	
				//全选按钮显示
				allBtn.style.display = 'block';
				line.style.visibility = 'visible';
				
				checkedSearch.style.display = 'block';//选中操作的按钮区显示
				
				pattern.style.display = 'none';//切换模式按钮隐藏
			}else{	
				//全选按钮隐藏
				allBtn.style.display = 'none';
				line.style.visibility = 'hidden';
				
				checkedSearch.style.display = 'none';//选中操作的按钮区隐藏
				
				pattern.style.display = 'block';//切换模式按钮显示
			}
			
			
			checked = document.querySelectorAll('.checked');
			var ok = [];
			for(var i=0; i<checked.length; i++){
				if(checked[i].checked){
					ok.push(checked[i]);
				}
			}
			
			num = ok.length;
			
			//让全选按钮跟着下面的li变化
			if(num==checked.length){
				allBtn.checked = true;
				allBtn.style.backgroundColor = '#1dabfe';
			}else{
				allBtn.checked = false;
				allBtn.style.backgroundColor = '';
			}
			
		};
		
		document.onmouseup = function(){
			//鼠标抬起时删除框div
			document.body.removeChild(div);
			document.onmousemove = document.onmouseup = null;
		}
	};
		
	
	
	
	return function(){		
		
		allBtn.style.display = 'none';//全选按钮隐藏
		line.style.visibility = 'hidden';
		
		checkedSearch.style.display = 'none';//选中操作的按钮区隐藏
		
		pattern.style.display = 'block';//切换模式按钮显示
		
		
		for(var i=0; i<checked.length; i++){
			
			checked[i].checked = false;//同步状态
			checked[i].style.backgroundColor = '';//改变自身样式
			checked[i].parentNode.parentNode.style.backgroundColor = '';//改变li的样式
		}
	}
	
	
}





//新建文件夹
function addFile(){
	
	var addFileBtn = document.querySelector('#add-file');//新建文件夹按钮
	var fileUl = document.querySelector('.file-box ul');//文件夹的父级

	
	
	
	addFileBtn.onclick = function(){
		
		
		//创建li
		var li = document.createElement('li');
		li.innerHTML = '<div class="file-ico"><span class="checked">'
						+'<i class="icon-ok"></i></span><i class="icon-folder-close"></i>'
						+'</div><div class="file-paly"><a href="javascript:;">'
						+'<span class="name">文件名字</span><time>2017年11月20日</time>'
						+'<span class="capacity">800K</span></a></div>';
		//将创建的li插入DOM中
		fileUl.appendChild(li);
		
		//执行文件夹操作
		ahoutFolder();
		
		addBtn();
	};
	
	
	
}










//'弹出层'居中显示的方法
function tipPosition(obj){
	var size = windowSize();
	var scrollTop = document.body.scrollTop||document.documentElement.scrollTop;//获取滚动的top
	var scrollLeft = document.body.scrollLeft||document.documentElement.scrollLeft;//获取滚动的left
	//'弹出层'居中显示
	obj.style.top = (size.h - obj.offsetHeight)/2 + scrollTop + 'px';
	obj.style.left = (size.w - obj.offsetWidth)/2 + scrollLeft + 'px';
}

//**获取浏览器可视区域尺寸的函数**//
function windowSize(){
	var w = document.documentElement.clientWidth||document.body.clientWidth;
	var h = document.documentElement.clientHeight||document.body.clientHeight;
	
	return{
		w:w,
		h:h
	};
}


//创建拉框
function createPull(num){
	var fileBox = document.querySelector('.file-box');
	
	var	checked = fileBox.querySelectorAll('.checked');//获取选择按钮
	var allBtn = document.querySelector('.all-btn');//获取全选按钮
	var line = document.querySelector('.content-head .line')//获取全选按钮旁边的线
	var pattern = document.querySelector('.content .pattern');//模式切换按钮
	var checkedSearch = document.querySelector('.checked-search');//选中操作的显示box
	
	
	fileBox.onmousedown = function(ev){
		var ev = ev||event;
		
		//清除默认行为
		ev.preventDefault();
		
		(ahoutFolder())();//取消选中
		
		//获取滚动条
		var scrollTop = document.body.scrollTop||document.documentElement.scrollTop;
		
		//获取要去碰的元素
		var aLi = document.querySelectorAll('.file-box li');
		
		//获取鼠标位置坐标
		var x1 = ev.clientX;
		var y1 = ev.clientY;
		
		//创建框元素
		var div = document.createElement('div');
		div.className = 'frame';
		document.body.appendChild(div);
		
		
		//设置div的位置
		div.style.top = y1 + 'px';
		div.style.left = x1 + 'px';
		
		document.onmousemove = function(ev){
			var ev = ev||event;
			
			//清除默认行为
			ev.preventDefault();
			
			//获取鼠标坐标
			var x2 = ev.clientX;
			var y2 = ev.clientY;
			
			//获取要设置的div的宽、高
			var w = Math.abs(x2-x1);
			var h = Math.abs(y1-y2);
			
			if(w>10||h>10){
				div.style.display = 'block';//避免点击事件不能触发(选中框的宽、高至少有一个要>10)
			}
			
			if(x2-x1<0){
				div.style.left = x1 - w + 'px';
			}else{
				div.style.left = x1 + 'px';
			}
			
			if(y2-y1<0){
				div.style.top = y1 - h + 'px';
			}else{
				div.style.top = y1 + 'px';
			}
			
			div.style.width = w + 'px';
			div.style.height = h + 'px';
			
			
			
			boom(div,aLi,function(a2){
				
				a2.children[0].children[0].checked = true;//改变自身状态
				a2.children[0].children[0].style.backgroundColor = '#1dabfe';//改变自身样式
				a2.style.backgroundColor = '#f5f8f9';//改变li的样式
				
			},function(a2){
				
				a2.children[0].children[0].checked = false;//改变自身状态
				a2.children[0].children[0].style.backgroundColor = '';//改变自身样式
				a2.style.backgroundColor = '';//改变li的样式
				
			},'');
			
			
		};
		
		document.onmouseup = function(){
			//鼠标抬起时删除框div
			document.body.removeChild(div);
			document.onmousemove = document.onmouseup = null;
		}
	};
			
}


//创建顶部绿色提示框的方法
function createGreenTip(tipContent){//提示内容（字符串）
	
	//创建提示提示框
	var moveOk = document.createElement('div');//创建元素
	moveOk.className = 'operation-tip';//添加样式的clas名字
	moveOk.innerHTML = tipContent;//提示框内容
	document.body.appendChild(moveOk);//插入DOM中去
	
	MTweenPlus({//慢慢出现
        obj:moveOk,
        attrs:{
        	top:'0px',
        },
        duration:400,
        callBack:function(){
        	setTimeout(function(){
        		MTweenPlus({//慢慢消失
			        obj:moveOk,
			        attrs:{
			        	top:'-42px',
			        },
			        duration:400,
			        callBack:function(){
			        	document.body.removeChild(moveOk);//最后删除元素
			        }
		    	});
        	},1500);
        }
    });
    
}