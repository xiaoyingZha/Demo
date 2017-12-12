//获取元素的函数
function $(str){	//	$('选择器');	获取的是元素集合，单个元素注意要加[0]
	var dom = document.querySelectorAll(str);
	return dom;
}


//获取元素属性的函数		//获取元素的某个属性值，或者获取多个属性及属性值
function getStyle(){	// getStyle(div,'width');||getStyle(div,'width','height'...);
	var obj = arguments[0];
    var arr = arguments.length>2?{}:'';

    if(typeof arr=='string'){
        arr = !obj.currentStyle?getComputedStyle(obj)[arguments[1]]:obj.currentStyle[arguments[1]];
    }else{
        for(var i=1;i<arguments.length;i++){
            arr[arguments[i]] = !obj.currentStyle?getComputedStyle(obj)[arguments[i]]:obj.currentStyle[arguments[i]];
        }
    }
    return arr;	
}


//封装move		
function move(obj,attr,speed,end,callBack){	// 元素，属性(方向)，移动距离(+/-),终点，回调函数(可选)
    clearInterval(obj.timer);
    obj.timer = setInterval(function(){
        var attrVal = parseFloat(getStyle(obj,attr));
        var s = attrVal+speed;
        if(speed<0){
            if(s<=end){
                s=end;
                clearInterval(obj.timer);
            }
        }else if(speed>0){
            if(s>=end){
                s=end;
                clearInterval(obj.timer);
            }
        }
        obj.style[attr] = s +'px';
        if(s==end&&callBack){
            //如果到达了目标点，并且有回调函数的情况就执行；
            callBack();
        }
    },30);
}



/*
* t : time 已运动时间  当前时间-初始时间
* b : begin 起始值
* c : count 总的运动值  总运动路程
* d : duration 持续时间 总运动时间
* */
//调用方式如：Tween.linear(t,b,c,d);
var Tween = {	// t：已运动时间	b：起始值	 c：运动路程	d:运动持续时间
	linear: function (t, b, c, d){  //匀速
		return c*t/d + b;
	},
	easeIn: function(t, b, c, d){  //加速曲线
		return c*(t/=d)*t + b;
	},
	easeOut: function(t, b, c, d){  //减速曲线
		return -c *(t/=d)*(t-2) + b;
	},
	easeBoth: function(t, b, c, d){  //加速减速曲线
		if ((t/=d/2) < 1) {
			return c/2*t*t + b;
		}
		return -c/2 * ((--t)*(t-2) - 1) + b;
	},
	easeInStrong: function(t, b, c, d){  //加加速曲线
		return c*(t/=d)*t*t*t + b;
	},
	easeOutStrong: function(t, b, c, d){  //减减速曲线
		return -c * ((t=t/d-1)*t*t*t - 1) + b;
	},
	easeBothStrong: function(t, b, c, d){  //加加速减减速曲线
		if ((t/=d/2) < 1) {
			return c/2*t*t*t*t + b;
		}
		return -c/2 * ((t-=2)*t*t*t - 2) + b;
	},
	elasticIn: function(t, b, c, d, a, p){  //正弦衰减曲线（弹动渐入）
		if (t === 0) { 
			return b; 
		}
		if ( (t /= d) == 1 ) {
			return b+c; 
		}
		if (!p) {
			p=d*0.3; 
		}
		if (!a || a < Math.abs(c)) {
			a = c; 
			var s = p/4;
		} else {
			var s = p/(2*Math.PI) * Math.asin (c/a);
		}
		return -(a*Math.pow(2,10*(t-=1)) * Math.sin( (t*d-s)*(2*Math.PI)/p )) + b;
	},
	elasticOut: function(t, b, c, d, a, p){    //*正弦增强曲线（弹动渐出）
		if (t === 0) {
			return b;
		}
		if ( (t /= d) == 1 ) {
			return b+c;
		}
		if (!p) {
			p=d*0.3;
		}
		if (!a || a < Math.abs(c)) {
			a = c;
			var s = p / 4;
		} else {
			var s = p/(2*Math.PI) * Math.asin (c/a);
		}
		return a*Math.pow(2,-10*t) * Math.sin( (t*d-s)*(2*Math.PI)/p ) + c + b;
	},    
	elasticBoth: function(t, b, c, d, a, p){
		if (t === 0) {
			return b;
		}
		if ( (t /= d/2) == 2 ) {
			return b+c;
		}
		if (!p) {
			p = d*(0.3*1.5);
		}
		if ( !a || a < Math.abs(c) ) {
			a = c; 
			var s = p/4;
		}
		else {
			var s = p/(2*Math.PI) * Math.asin (c/a);
		}
		if (t < 1) {
			return - 0.5*(a*Math.pow(2,10*(t-=1)) * 
					Math.sin( (t*d-s)*(2*Math.PI)/p )) + b;
		}
		return a*Math.pow(2,-10*(t-=1)) * 
				Math.sin( (t*d-s)*(2*Math.PI)/p )*0.5 + c + b;
	},
	backIn: function(t, b, c, d, s){     //回退加速（回退渐入）
		if (typeof s == 'undefined') {
		   s = 1.70158;
		}
		return c*(t/=d)*t*((s+1)*t - s) + b;
	},
	backOut: function(t, b, c, d, s){
		if (typeof s == 'undefined') {
			s = 3.70158;  //回缩的距离
		}
		return c*((t=t/d-1)*t*((s+1)*t + s) + 1) + b;
	}, 
	backBoth: function(t, b, c, d, s){
		if (typeof s == 'undefined') {
			s = 1.70158; 
		}
		if ((t /= d/2 ) < 1) {
			return c/2*(t*t*(((s*=(1.525))+1)*t - s)) + b;
		}
		return c/2*((t-=2)*t*(((s*=(1.525))+1)*t + s) + 2) + b;
	},
	bounceIn: function(t, b, c, d){    //弹球减振（弹球渐出）
		return c - Tween['bounceOut'](d-t, 0, c, d) + b;
	},       
	bounceOut: function(t, b, c, d){//*
		if ((t/=d) < (1/2.75)) {
			return c*(7.5625*t*t) + b;
		} else if (t < (2/2.75)) {
			return c*(7.5625*(t-=(1.5/2.75))*t + 0.75) + b;
		} else if (t < (2.5/2.75)) {
			return c*(7.5625*(t-=(2.25/2.75))*t + 0.9375) + b;
		}
		return c*(7.5625*(t-=(2.625/2.75))*t + 0.984375) + b;
	},      
	bounceBoth: function(t, b, c, d){
		if (t < d/2) {
			return Tween['bounceIn'](t*2, 0, c, d) * 0.5 + b;
		}
		return Tween['bounceOut'](t*2-d, 0, c, d) * 0.5 + c*0.5 + b;
	}
}





/*调用Mtween的例子说明：
 * 
 * 1、如果是transform属性，则写成transform.scale/transform.rotateZ,初始值一点得写
 * MTween(div,'transform.scale',2,0.5,1000,'','linear');
 * 
 * 2、MTween(box,'marginLeft','',-700,300,'linear','px',function(){});
 * 
 * 
 * 
 * 
 * */

//MTween 时间版的运动函数
function  MTween(obj,attr,begin,end,duration,way,unit,callBack){//元素，属性，开始值(transform初始值)，终点，时间，运动方式(可选，默认匀速)，单位(px/'')，回调(可选)
    if(obj.onOff) return;
    obj.onOff = true;
    if(!way){ 
        way = 'linear';
    }
    if(!unit){
    	unit = '';
    }
    var start = parseFloat(begin)||parseFloat(getStyle(obj,attr))||0;//起始位置  如果begin未传值，那就就尝试获取传入的属性值，如果属性值获取失败，就默认为0
    var startTime = Date.now();
    var s = end - start; 
    clearInterval(timer);
    var timer = 0;
    timer = setInterval(function(){
        var endTime = Date.now();
        var t = endTime-startTime;
        if(t>=duration){
            t = duration;
            clearInterval(timer);
        }
        obj.style[attr] = Tween[way](t,start,s,duration) + unit;
        
        //透明度的兼容处理
        if(attr=='opacity'){
            obj.style.filter = 'alpha(opacity='+Tween[way](t,start,s,duration)*100+')';
        }
        
        var attr1 = attr.split('.');
        if(attr1.length>1&&attr1[0]=='transform'){//js设置transform的方式：
            if(attr1[1]=='scale'){
                obj.style[attr1[0]] = attr1[1]+'('+Tween[way](t,start,s,duration)+')';//缩放
            }else if(attr1[1]=='rotateZ'){
                obj.style[attr1[0]] = attr1[1]+'('+Tween[way](t,start,s,duration)+'deg)';//垂直屏幕的旋转
            }

        }
        
        if(t==duration){
            obj.onOff = false;
            if(callBack){
                callBack();
            }
        }
    },20);
}




/*MTweenPlus()的调用例子：
* MTweenPlus({
*      attrs:{
*           'top':'500px',
*           'height':'50px',
*           'transform.scale':'2',		
*           'left':'500px'
*        },
*        begins:{
*           'transform.scale':1			//这里是关于transform的使用格式，开始值需要写 //'transform.rotateZ':45
*        },
*        obj:div,
*        duration:2000,
*        callBack:function(){
*            MTween({
*               obj:div,
*                attrs:{
*                    'left':'1000px',
*                    'top':'0px',
*                   'height':'100px',
*                    'opacity':0.2		//关于透明度
*                },
*                duration:800
*            });
*        }
*   });
 
*/
//MTween 时间版的运动函数
function  MTweenPlus(opt){//调用的参数是一个对象

    var option = {
        obj:'',
        begins:{},
        attrs:{},
        duration:0,
        way:'linear',
        callBack:function(){}
    };

    //用传入的参数覆盖默认值
    for(var key in option){
        if(opt[key]){
            option[key] = opt[key];
        }
    }

    //为了不再修改下面更多的代码，在这里做一次变量的适配
    var obj = option.obj;
    var attrs = option.attrs;
    var duration = option.duration;
    var way = option.way;
    var callBack = option.callBack;
    var begins = option.begins;


    if(obj.isAnim) return;

    //obj开始运动了  自定义属性
    obj.isAnim = true;

    var starts = {};

    //获取传入属性的开始位置
    for(var key in attrs){

        starts[key] = parseFloat(begins[key])||parseFloat(getStyle(obj,key))||0;
    }

    //对应的单位
    var uintes = {};
    for(var key in attrs){

        //不是字符串的直接跳出
        if(typeof attrs[key]!='string') continue;

        var num = parseFloat(attrs[key]);
        var arr = attrs[key].split(num);

        uintes[key] = arr[1];
    }

    var startTime = Date.now();

    //所有的属性的总路程
    var allS = {};
    for(var key in attrs){
        if(key=='transform.scale'){
            console.log(attrs[key]);
        }
        allS[key] = parseFloat(attrs[key])-starts[key]||0;
    }

    //每次20ms走一帧
    clearInterval(timer);
    var timer = 0;
    timer = setInterval(function(){

        var endTime = Date.now();

        //计算出当前时间
        var t = endTime-startTime;

        if(t>=duration){
            t = duration;
            clearInterval(timer);//到达目标点要清除定时器
        }

        //运动的属性
        for(var key in attrs){
			
			//处理opacity
            obj.style[key] = Tween[way](t,starts[key],allS[key],duration)+(uintes[key]||'');
            //透明度的兼容处理
            if(key=='opacity'){
                obj.style.filter = 'Alpha(opacity='+Tween[way](t,starts[key],allS[key],duration)*100+')';
            }
            
            
            
            //处理scrollTop
            if(key=='scrollTop'||key=='scrollLeft'){
                obj[key] = Tween[way](t,starts[key],allS[key],duration)+(uintes[key]||'');
            }

            //transform 的处理
            var attr1 = key.split('.');
            if(attr1.length>1&&attr1[0]=='transform'){
	            if(attr1[1]=='scale'){
	                obj.style[attr1[0]] = attr1[1]+'('+Tween[way](t,starts[key],allS[key],duration)+')';
	            }else if(attr1[1]=='rotateZ'){
	                obj.style[attr1[0]] = attr1[1]+'('+Tween[way](t,starts[key],allS[key],duration)+'deg)';
	            }
	        }

        }

        if(t==duration){
            obj.isAnim = false;
            //等到上一个动画完成 然后再调用
            if(callBack){
                callBack();
            }
        }

    },20);
    
    return timer; //将定时器return出去
}


// shake() 抖动的函数
function shake(obj,attr,max,weak,callBack){//元素，属性，偏移最大量，衰减量，回调函数(可选)
	
	//判断是否抖动过程中的处理
	if(obj.isShake) return;
	obj.isShake = true;
	
	//设置抖动的偏移量集合
	var arr_shake = [];
	for(i=max; i>0; i-=weak){
		arr_shake.push(-i,i);
	}
	arr_shake.push(0);
	
	//获取元素的原始值
	var oldAttr = parseFloat(getStyle(obj,attr));
	var num = 0;//设置开始值
	//设置定时器
	clearInterval(timer);
	var timer = setInterval(function(){
		
		obj.style[attr] = oldAttr + arr_shake[num] + 'px';
		
		if(arr_shake[num]==0){
			clearInterval(timer);
			obj.isShake = false;
			//回调函数
			callBack&&callBack();
		}
		num++;
		
	},30);
}






//获取x~y之间的随机整数的函数
function randomNum(x,y){//x,y表示两个整数
	return Math.round(Math.random()*(y-x)+x);
}



//时间补0函数：
function format(num){//用于给小于10的补零
    return num<10?'0'+num:''+num;
}




//**获取尺寸的兼容***//

//获取浏览器窗口大小的函数(兼容写法)
function windowSize(){
	var W = document.documentElement.clientWidth||document.body.clientWidth;
	var H = document.documentElement.clientHeight||document.body.clientHeight;
	return {
		W:W,
		H:H
	}
}
//获取网页尺寸的方法(兼容写法)
function webSize(){
	var w = document.documentElement.scrollWidth||document.body.scrollWidth;
	var h = document.documentElement.scrollHeight||document.body.scrollHeight;
	return {
		w:w,
		h:h
	}
}
//获取网页内容尺寸的方法(兼容写法)
function webContentSize(){
    var w = document.documentElement.offsetWidth||document.body.offsetWidth;
    var h = document.documentElement.offsetHieght||document.body.offsetHeight;
    return {
        w:w,
        h:h
    }
}
//获取滚动条的方法(兼容写法)
function windowScroll(){
	var scrollLeft = document.body.scrollLeft||document.documentElement.scrollLeft;
	var scrollTop = document.body.scrollTop||document.documentElement.scrollTop;
	return {
		scrollLeft:scrollLeft,
		scrollTop:scrollTop
	}
}




//**获取节点的兼容**//

//获取元素节点相邻的下一个元素节点(兼容写法)
function get_nextSibling(obj){//找到obj相邻的下一个兄弟元素节点的函数
	var next_obj = obj.nextSibling;
	if(next_obj&&next_obj.nodeType != 1){
		next_obj = next_obj.nextSibling;
	}
	return next_obj;
}
//获取元素节点相邻的上一个元素节点(兼容写法)
function get_previousSibling(obj){//找到obj相邻的上一个兄弟元素节点的函数
	var prev_obj = obj.previousSibling;
	if(prev_obj&&prev_obj != 1){
		prev_obj = prev_obj.previousSibling;
	}
	return prev_obj;
}





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







/*
 
 * 拖拽的调用方法：
 * drag({
 * 	 obj:div,				//拖拽的元素
 *   move:function(){},		//拖拽过程中在鼠标move过程中要做到事情
 *   up:function(){} 		//拖拽结束(鼠标抬起)时要做的事情
 * });
 * 
 * 
 * 
 * 
 * 
 * */
//拖拽的方法
function drag(option){//option行参是一个对象

    var opt = {
        obj:option.obj||null,		//如果未传值，就赋null
        move:option.move||null,		//如果未传值，就赋null
        up:option.up||null			//如果未传值，就赋null
    };


    //给拖拽的元素添加mousedown事件
    opt.obj.onmousedown = function(ev){

        var ev = ev || event;

        ev.preventDefault();

        //鼠标当前点：
        var x1 = ev.clientX;
        var y1 = ev.clientY;

        //元素当前的位置：
        var l = opt.obj.offsetLeft;
        var t = opt.obj.offsetTop;

        document.onmousemove = function(ev){

            var ev = ev || event;

            ev.preventDefault();

            //移动过程中的鼠标位置
            var x2 = ev.clientX;
            var y2 = ev.clientY;


            //计算div要移动的距离
            var x = x2-x1;
            var y = y2-y1;


            if(opt.move){//如果要在鼠标move过程中做什么事就做
                opt.move(opt.obj,l+x,t+y);
            }else{//否则就是纯拖拽元素
                opt.obj.style.left = l+x+'px';
                opt.obj.style.top = t+y+'px';
            }


        };

        document.onmouseup = function(){
            //鼠标抬起取消事件；
            document.onmousemove = null;

            if(opt.up){//如果传值时有鼠标抬起时要做的事情，就做
                opt.up(opt.obj);
            }
        };



    };
}





/*

 * 方法名称： boom
 * 功能： 检测碰撞
 * 参数：
 *   o:去碰撞的元素
 *   eles:被碰撞的元素集合
 *   nearFn:找到离自己最近的被碰撞元素时，定义回调函数去操作最近的元素元素
 * 
 *调用方法：
 * boom(div,aLi,function(){},function(){},function(){});
 * */
//封装碰撞的方法
function boom(o,eles,boomFn,unBoomFn,nearFn){//去碰撞的元素，被碰撞的元素集合，碰上了要做到事情，没碰上要做到事情，碰到最近元素要做到事情

    var a1 = o;

    //a1的中心点
    var x1 = a1.offsetLeft+a1.offsetWidth/2;
    var y1 = a1.offsetTop+a1.offsetHeight/2;


    //除了被抓到的元素  其他元素都是碰撞元素
    var minObj = {
        s:0, //距离
        o:null //元素
    };
    for(var i=0;i<eles.length;i++){

        //其他的就是被碰撞元素
        var a2 = eles[i];

        //a2 的中心点：
        var x2 = a2.offsetLeft+a2.offsetWidth/2;
        var y2 = a2.offsetTop+a2.offsetHeight/2;

        //计算出x和y的距离
        var x = Math.abs(x1-x2);
        var y = Math.abs(y1-y2);

        //碰撞时的最大距离
        var maxW = a1.offsetWidth/2+a2.offsetWidth/2;
        var maxH = a1.offsetHeight/2+a2.offsetHeight/2;

        //已知条件： x ， y  w h
        if(x<=maxW&&y<=maxH){//碰上了要做的事情
           
            boomFn&&boomFn(a2);//要做的事情在boomFn函数里面
            
            //检测中心点距离
            var c = Math.sqrt(x*x+y*y);

            if(minObj.o){
                //如有已经有元素了 ，就对比距离（s）值的大小，谁的更小就把谁换进去
                if(c<minObj.s){
                    minObj.s = c;
                    minObj.o = a2;
                }
            }else{
                //没有元素的时候 就把当前这个元素存进去
                minObj.s = c;
                minObj.o = a2;
            }


        }else{//未碰上
            unBoomFn&&unBoomFn(a2);//没碰到做的事的函数
        }


    }

    //如果里面有最近的元素存入，就执行(也就是碰到最近的元素，这个最近的元素要做到事情)
    if(minObj.o)  nearFn&&nearFn(minObj.o);
}






/*
* 功能：绑定滚轮事件
* 参数：
* option {
*   obj： 触发事件的元素
*   up:  滚轮向上滚动要执行的函数
*   down: 滚轮向下滚动要执行的函数
* }
* 
* 
* 调用方法：
* wheel({
* 	obj:div,			//
*   up:function(){},	//滚轮向上滚动要做到事情
*   down:function(){}	//滚轮向下滚动要做的事情
* });
* 
* 
* 
* */
//滚轮事件方法：
function wheel(option){//option行参是一个对象

    //自定义 错误提示
    if(!option){
        console.log('错误码10060:参数不正确');
        return false;
    }

    var opt = {
        obj:option.obj||document,
        up:option.up||null,		//如果未传值，就赋null
        down:option.down||null  //如果未传值，就赋null
    };

    opt.obj.onmousewheel = function(ev){

        var ev = ev||event;

        ev.stopPropagation();
        ev.cancelBubble = true;

        if(ev.wheelDelta<0){//滚轮'向下'滚动要做的事情
            opt.down&&opt.down(ev);
        }
        if(ev.wheelDelta>0){//滚轮'向上'滚动要做的事情
            opt.up&&opt.up(ev);
        }


    };

    opt.obj.addEventListener('DOMMouseScroll',function(ev){

        var ev = ev||event;

        ev.stopPropagation();
        ev.cancelBubble = true;


        if(ev.detail>0){//滚轮'向下'滚动要做的事情
            opt.down&&opt.down(ev);
        }
        if(ev.detail<0){//滚轮'向上'滚动要做的事情
            opt.up&&opt.up(ev);
        }
    });

}

