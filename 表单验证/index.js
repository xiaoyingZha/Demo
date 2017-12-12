//**页面加载完后执行里面的代码**//
window.onload = function(){
	
	infor();//执行信息验证的函数
	
};


//**关于信息验证**//
function infor(){
	
	/*获取操作元素*/
	var user = document.querySelector('input[name=user]');//用户名输入框
	var age = document.querySelector('input[name=age]');//年龄输入框
	var sex = document.querySelector('input[name=sex]');//性别输入框
	var showChange = document.querySelector('.show-change');//显示性别选择按钮
	var changeSex = document.querySelector('.change-sex');//性别选择框
	var sex_span = changeSex.querySelectorAll('span');//男、女、保密
	var add = document.querySelector('.add');//获取'添加'按钮
	var all = document.querySelector('.all');//获取'全选'按钮
	
	var table = document.querySelector('table');
	var tBody = table.tBodies[0];
	
	
	
	/*绑定事件*/
	
	showChange.onclick = function(){//点击'出现性别选择'
		changeSex.style.height = '28px';
	};
	
	
	for(var i=0; i<sex_span.length; i++){//遍历'性别选项'
		sex_span[i].onclick = function(){//添加'性别选项'点击事件
			sex.value = this.innerHTML;
			changeSex.style.height = '0';
		};
	}
	
	
	var num = 0;//ID号
	
	add.onclick= function(){//点击'添加'按钮
		
		
		//获取输入内容
		var val1 = user.value;
		var val2 = age.value;
		var val3 = sex.value;
				
		
		//判断          =====>string.trim()截取字符串前后的空白字符，返回截取前后空白符后的字符串！！！
		if(val1.trim() != '' && val2.trim() != '' && val3.trim() != ''){
			val1 = val1.trim();
			val2 = val2.trim();
			val3 = val3.trim();
			
			//全选按钮
			all.checked = false;
//			n = 0;
			
			create(val1,val2,val3);//调用'创建列表'的函数
			
			//清空输入框
			user.value = '';
			age.value = '';
			sex.value = '';
			
		}else if(val1.trim() == '' && val2.trim() != '' && val3.trim() != ''){
			alert('请输入用户名');
		}else if(val1.trim() != '' && val2.trim() == '' && val3.trim() != ''){
			alert('请输入年龄');
		}else if(val1.trim() != '' && val2.trim() != '' && val3.trim() == ''){
			alert('请选择性别');
		}else if(val1.trim() == '' || val2.trim() == '' || val3.trim() == ''){
			alert('请输入信息')
		}
		
		
	}
	
	
	var arr = ['上移','下移','删除'];
	//创建元素
	function create(obj1,obj2,obj3){
				
		//**创建'行'**
		var tr = document.createElement('tr');
		
		
		//**创建'选中'按钮**
		var td = document.createElement('td');
		td.innerHTML = '<input type="checkbox" />';
		tr.appendChild(td);
		
		//获取input
		var input = td.children[0];
		input.onclick = function(){
			changeState();
		};
		
		
		//**创建'ID'**
		num++;
		var td = document.createElement('td');
		td.innerHTML = num;
		tr.appendChild(td);
		
		
		//**创建'表单的信息'**
		for(var i=0; i<arguments.length; i++){
			var td = document.createElement('td');
			td.innerHTML = arguments[i];
			tr.appendChild(td);
		}
		
		
		//**创建'操作'**
		var td = document.createElement('td');
		for(var i=0; i<arr.length; i++){
			var span = document.createElement('span');
			span.innerHTML = arr[i];
			td.appendChild(span)
		}
		
		//**获取 ：'上移','下移','删除'**
		var span = td.getElementsByTagName('span');
		
		span[0].onclick =function(){//绑定'上移'事件
			var tr = this.parentNode.parentNode;
			if(tr.previousElementSibling){
				tr.parentNode.insertBefore(tr,tr.previousElementSibling);
			}else{
				alert('已经是第一个了！')
			}
		}
		
		span[1].onclick =function(){//绑定'下移'事件
			var tr = this.parentNode.parentNode;
			if(tr.nextElementSibling){
				tr.parentNode.insertBefore(tr.nextElementSibling,tr);
			}else{
				alert('已经是最后一个了！')
			}
		}
		
		span[2].onclick =function(){//绑定'删除'事件
			var tr = this.parentNode.parentNode;
			tr.parentNode.removeChild(tr);
		}
		
		tr.appendChild(td);
		 
		
		//**将创建的元素显示在页面中**
		tBody.appendChild(tr);
		
	}
	
	
	
	
	
	
	var aChecked = tBody.getElementsByTagName('input');
	
	
	all.onclick = function (){
		
		if(this.checked){
			for(var i=0; i<aChecked.length; i++){
				aChecked[i].checked = true;
				n = aChecked.length;
			}
		}else{
			for(var i=0; i<aChecked.length; i++){
				aChecked[i].checked = false;
				n = 0;
			}
		}
		
	};
	
	
	
	function changeState(){
		
		for(var i=0; i<aChecked.length; i++){//遍历input
			if(aChecked[i].checked){//如果被选中
				n++;//选中一个则加一，记录选中的个数
			}else{					
				n--;//如果取消选中就减一
			}
		}
		
		
		if(n==aChecked.length){//当选中个数等于全部的个数就选中选选按钮
			all.checked = true;
		}else{
			all.checked = false;//否则就取消选区按钮
		}
	}
	
	
	
	
	
	
}


