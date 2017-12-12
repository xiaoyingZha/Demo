window.onload = function (){
	
	
	/*获取元素*/
	var aLi = $('.cound-down li');//抢购的商品列表
	var aBg = $('.bg');//列表遮罩层
	var aStamp = $('.stamp');//盖章元素
	var buyList = $('.buy-list')[0];
	var imgBox = $('.img-box');//商品图
	var name = $('h3.name');//商品名
	var em = $('.price em');//商品价格
	var sureBtn = $('.sure');//抢购按钮
	 
	
	
	/*结束的时间*/
	var arr_endTime = [
						'November 7,2017 16:45:12',
						'November 7,2017 16:45:10',
						'November 7,2017 10:05:27',
						'November 7,2017 16:03:23',
	];
	
	
	/*执行函数*/
	for(var i=0; i<aLi.length; i++){
		showTime(i,arr_endTime[i]);//显示每个时间
	}
	

	//显示时间
	function showTime(i,et){
		
		//获取操作元素
		var oEndTime = aLi[i].querySelector('.time');//显示结束时间的元素
		var aTimeNum = aLi[i].querySelectorAll('.time-num');//显示倒计时时间的元素
		
		//设置结束时间
		var end = new Date(et);
		
		//显示结束时间
		showEnd();

		
		
		//设置定时器刷新倒计时时间
		clearInterval(timer);
		var timer = setInterval(function(){
			timeOut(i);
		},1000);
		
		
		//显示初始化倒计时时间
		timeOut(i);
		
		//显示结束时间的函数
		function showEnd(){
			var year = end.getFullYear();
			var mo = end.getMonth()+1;
			var d = end.getDate();
			var h = end.getHours();
			var m = end.getMinutes();
			var s = end.getSeconds();
			
			//时间<10的十位数位置补0
			mo = mo<10?'0'+mo:''+mo;
			d = d<10?'0'+d:''+d;
			h = h<10?'0'+h:''+h;
			m = m<10?'0'+m:''+m;
			s = s<10?'0'+s:''+s;
			
			oEndTime.innerHTML = year + ' ' + mo + ' ' + d + ' ' + h + ':' + m + ':' + s;
			
		}
		
		//显示倒计时时间的函数
		function timeOut(i){
			
			//获取当前时间Date对象实例的时间戳
			var now = new Date();
			
			//计算时间差
			var time = end.getTime() - now.getTime();//得出相差的毫秒数
			
			//结束时
			if(time<=0){
				
				time = 0;//时间不能为负设为0
				clearInterval(timer);//停定时器
				
				aBg[i].style.display = 'block';//显示遮罩层
				shake(aLi[i],'marginLeft',10,1);//抖动
				aStamp[i].style.display = 'block';//显示盖章
				MTween(aStamp[i],'transform.scale',2,1,1000,'','linear');//章由大变小
				
				
				buyList.innerHTML += '<li><span class="product-name">'+ name[i].innerHTML +'</span>'
						+'<span class="buy-price"><em>'+ em[i].innerHTML +'</em>'+
						imgBox[i].innerHTML +'</span></li>';
				
			}
						
			
			//将时间差(毫秒数)转换成多少时、分、秒
			var h = Math.floor(time/(1000*60*60));//时
			var m = Math.floor(time%(1000*60*60)/(1000*60));//分
			var s = Math.floor(time%(1000*60)/1000);//秒
			
			//时间差<10的十位数位置补0
			h = h<10?'0'+h:''+h;
			m = m<10?'0'+m:''+m;
			s = s<10?'0'+s:''+s;
			
			//时间的字符串
			var timeString = h + m + s;
			
			//将时间显示在页面中
			for(var i=0; i<aTimeNum.length; i++){
				aTimeNum[i].innerHTML = timeString[i];
			}
			
		}
		
		
	}

};