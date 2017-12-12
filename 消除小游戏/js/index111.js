/*页面刷新完毕开始执行里面的代码*/
window.onload = function (){
	
	clearGame();//执行消除游戏
};

/*消除游戏*/
function clearGame(){
	
	//获取操作的元素
	var begin = $('.begin')[0];//开始游戏的按钮
	var numBox = $('.num-box')[0];//显示分数的容器
	
	//'游戏开始'按钮点击事件绑定
	begin.onclick = function (){
		
		//显示分数的容器向左侧移动
		MTweenPlus({
			obj:numBox,
	        attrs:{
	        	'left':'20px'
	        },
	        duration:300,
		});
		
		//自己向下移动、同时透明度改变
		MTweenPlus({
			obj:this,
	        attrs:{
	        	'bottom':'-50px',
	        	'opacity':0	
	        },
	        duration:300,
	        callBack:function(){
	        	//开始出现妖怪
	        	creatMonster();
	        }
		});
	};
	
	//初始化分数统计
	var getNum = 0;//得分
	var loseNum = 0;//失分
	
	/*出现妖怪*/
	function creatMonster(){
		
		//获取操作的元素
		var monsterBox = $('.monster-box')[0];//妖怪的父级元素
		
		//妖怪图片地址数组
		var arr_img = [ '../img/1.png',
						'../img/2.png',
						'../img/3.png',
						'../img/4.png',
						'../img/5.png',
						'../img/6.png',
						'../img/7.png',
						'../img/8.png',
						];
		//定义一个随机数字
		var num = randomNum(0,7);
		
		//创建妖怪
		var img = '<img style="left: '+ 580*Math.random() +'px;" src="'+ arr_img[num] +'"/>';
		
		//将创建的妖怪插入页面
		monsterBox.innerHTML = img;
		
		//获取生成的妖怪
		img = monsterBox.querySelector('img');
		
		//让妖怪运动
		var t = MTweenPlus({//t是MTweenPlus()调用函数return出的定时器，为了停掉定时器，在此存储一下
			obj:img,
	        attrs:{
	        	'top':'400px'
	        },
	        duration:5000,
	        way:'linear',
	        callBack:function(){
	        	
	        	//失分处理
	        	var lose = $('.lose-num')[0];//获取统计失分元素
	        	loseNum++;//统计失分
	        	lose.innerHTML = loseNum + '分';//显示失分
	        	
	        	//抖动窗口
	        	shake(monsterBox,'left',30,4,function(){
	        		
	        		if(loseNum!=5){
	        			//再次生成妖怪
	        			creatMonster();
	        		}else{
	        			alert('GameOver');
	        		}
	        	});
	        	
	        }
		})
		
		//点击妖怪要做的事情
		img.onclick = function (){
			
			var this_ = this;
			
			this_.src = '../img/qq.png';
			
	        //停掉MTweenPlus里面的定时器
	        clearInterval(t);
	        
	        shake(this_,'left',20,2,function(){
	        	
	        	//得分处理(抖动完之后在加分，避免还没消失过程中，去点击，分数的重复累加)
				var get = $('.get-num')[0];//获取操作的元素
				getNum++;//统计得分
		        get.innerHTML = getNum + '分';//显示得分
	        		        	
	        	this_.style.display = 'none';
	        	//再次创建
	        	creatMonster();
	        });
		};
	}
}






