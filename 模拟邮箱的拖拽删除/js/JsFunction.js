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



//获取浏览器窗口大小的函数
function windowSize(){
	var W = document.documentElement.clientWidth||document.body.clientWidth;
	var H = document.documentElement.clientHeight||document.body.clientHeight;
	return {
		W:W,
		H:H
	}
}
//获取网页尺寸的函数
function webSize(){
	var w = document.documentElement.scrollWidth||document.body.scrollWidth;
	var h = document.documentElement.scrollHeight||document.body.scrollHeight;
	return {
		w:w,
		h:h
	}
}
//获取网页内容尺寸的函数
function webContentSize(){
    var w = document.documentElement.offsetWidth||document.body.offsetWidth;
    var h = document.documentElement.offsetHieght||document.body.offsetHeight;
    return {
        w:w,
        h:h
    }
}



//获取元素节点相邻的下一个元素节点
function get_nextSibling(obj){//找到obj相邻的下一个兄弟元素节点的函数
	var next_obj = obj.nextSibling;
	if(next_obj&&next_obj.nodeType != 1){
		next_obj = next_obj.nextSibling;
	}
	return next_obj;
}
//获取元素节点相邻的上一个元素节点
function get_previousSibling(obj){//找到obj相邻的上一个兄弟元素节点的函数
	var prev_obj = obj.previousSibling;
	if(prev_obj&&prev_obj != 1){
		prev_obj = prev_obj.previousSibling;
	}
	return prev_obj;
}



//拖拽：
function drag(option){

    var opt = {
        obj:option.obj||null,
        move:option.move||null,
        up:option.up||null
    };


    var div = opt.obj;//偷懒 转换对象

    //给拖拽的元素添加mousedown事件
    div.onmousedown = function(ev){

        var ev = ev || event;

        ev.preventDefault();

        //鼠标当前点：
        var x1 = ev.clientX;
        var y1 = ev.clientY;

        //元素当前的位置：
        var l = div.offsetLeft;
        var t = div.offsetTop;

        document.onmousemove = function(ev){

            var ev = ev || event;

            ev.preventDefault();

            //移动过程中的鼠标位置
            var x2 = ev.clientX;
            var y2 = ev.clientY;


            //计算div要移动的距离
            var x = x2-x1;
            var y = y2-y1;

            // function fn(o,l,t){}

            if(opt.move){
                opt.move(div,l+x,t+y);
            }else{
                //设置div的属性
                div.style.left = l+x+'px';
                div.style.top = t+y+'px';
            }


        };

        document.onmouseup = function(){
            //鼠标抬起取消事件；
            document.onmousemove = null;

            if(opt.up){
                opt.up(div);
            }
        };



    };
}