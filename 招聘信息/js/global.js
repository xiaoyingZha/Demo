//**获取search对象的函数**//
function changeSearch(name,value,bool){
	var search = window.location.search;//?user=baobao&pwd=12345


	var info = search.substring(1);//user=baobao&pwd=12345
	
	//拆分'&'
	var info = info.split('&');// ["user=baobao", "pwd=12345"]
	
	//继续拆分'='
	for(var i=0; i<info.length; i++){
		info[i] = info[i].split('=');
	}
	//info = [["user", "baobao"]["pwd", "12345"]]
	
	//转成对象
	var obj = {};
	for(var i=0; i<info.length; i++){
		obj[info[i][0]] = info[i][1];
	}
	//obj = {user: "baobao", pwd: "12345"}
	
	
	if(arguments.length==0){
        //如果没有传入任何参数，那么程序就假定用户可能是需要search的对象obj
        return obj;
    }
	
	//修改pwd值
	obj[name]= value;//obj = {user: "baobao", pwd: "66666"}
	
	//将对象转成字符串user=baobao&pwd=12345
	var str = '';
	for(var key in obj){
		str += key + '=' + obj[key] + '&';
	}
	//str = 'user=baobao&pwd=12345&'
	//继续裁切
	if(bool){ //有时候并不希望直接刷新页面
        return str.slice(0,-1);//str = 'user=baobao&pwd=66666'
    }
	
	
	window.location.search = str.slice(0,-1);//设置
	
}