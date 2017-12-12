//封装$
function $(str){	//	$('选择器')；
	var dom = document.querySelectorAll(str);
	return dom;
}


//封装getStyle
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
 * 1、如果是transform属性，则写成transform.scale/transform.rotateZ
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