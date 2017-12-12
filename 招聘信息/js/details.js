window.onload = function(){
	
	//**获取元素**//
	var title = document.querySelector('.title');
	var resumeLeft = document.querySelector('.resume-left');
	var time = document.querySelector('time');
	var dl = document.querySelector('.content dl');
	var dt = document.querySelector('.content dt');
	var h4 = document.querySelector('.content h4');
	var h4Content = document.querySelector('.h4-content');
	
	
	//获取search 中的index值
	var index = changeSearch().index;
	
	//获取search 中的lx值（判断有没有，没有就默认第一个）
	var value = changeSearch().lx||aData.list[0].lx;
	
	//找到对应的信息存储对象
	var content = aData[value].text;
	
	//标题内容显示
	title.innerHTML = content[index].zw;
	
	//详情显示
	resumeLeft.innerHTML = content[index].dy +' / '+ 
						   content[index].dd +' / '+
						   content[index].jy +' / '+
						   content[index].xl +' / '+
						   content[index].rs +'名';
	
	//时间显示
	time.innerHTML = content[index].sj.join();
	
	//显示dt列表标题
	dt.innerHTML = content[index].info[0].t;
	
	//显示dd列表项
	var arr = content[index].info[0].l;
	var html = '';
	for(var i=0; i<arr.length; i++){
		html += '<dd>'+ arr[i] +'</dd>';
	}
	dl.innerHTML += html;
	
	//显示工作职责
	if(content[index].info[1]){//先判断有没有
		h4.innerHTML = content[index].info[1].t;
		h4Content.innerHTML = content[index].info[1].l;
	}else{
		
	}
	
	
	
	
};
