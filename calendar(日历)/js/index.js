window.onload = function (){
	
	/*获取元素*/
	var hms = $('.hms')[0];//显示当前时间的元素
	var ymd = $('.ymd')[0];//显示当前日期的元素
	var ul = $('.month-date')[0];//显示每月的日期的ul元素
	var yearMonth_ = $('.left-time')[0];//显示年月的元素
	var monthBtn = $('.right-btnes span');//翻月按钮
	var prevMonth = monthBtn[0];//上一月按钮
	var nextMonth = monthBtn[1];//下一月按钮
	
	
	/*默认月份显示*/
	var date = new Date();
	var m = date.getMonth();//为显示月份
	
	
	/*执行时间的显示*/
	showTime();//显示当前时间
	showDate();//显示当前日期
	showYearMonth();//显示对应的年月
	showMonth();//显示每月的日期
	showWeek();//找到对应周
	
	/*标记今天*/
	today();
	
	
	/*执行点击翻页*/
	changeMonth(prevMonth);
	changeMonth(nextMonth);
	
	/*日期鼠标事件*/
	mouseEvent();
	
	/*翻月显示*/
	function changeMonth(btn){
		btn.onclick = function (){
			if(btn==nextMonth){
				m++;
			}else{
				m--;
			}
			showYearMonth();//显示对应的年月
			showMonth();//显示每月的日期
			showWeek();//找到对应周
			today();//标记今天
			mouseEvent();//日期鼠标事件
		}
	}
	
	
	
	/*显示当前时间*/
	function showTime(){
		
		//页面刷新显示
		time();
		
		//设置定时器
		setInterval(time,1000);
		
		function time(){
			
			//获取时间对象实例
			var date = new Date();
			
			//获取 时分秒
			var nowH = date.getHours();//时
			var nowM = date.getMinutes();//分
			var nowS = date.getSeconds();//秒
			
			//时间<10的补零
			nowH = nowH<10?'0'+nowH:''+nowH;
			nowM = nowM<10?'0'+nowM:''+nowM;
			nowS = nowS<10?'0'+nowS:''+nowS;
			
			//当前时间显示在页面中
			hms.innerHTML = nowH +':'+ nowM +':'+ nowS;
		}
	};
	
	

	/*显示当前日期*/
	function showDate(){
		
		//获取时间对象实例
		var date = new Date();
		
		//获取 年月日
		var nowYear = date.getFullYear();//年
		var nowMonth = date.getMonth()+1;//月
		var nowDate = date.getDate();//日
		
		//当前日期显示在页面中
		ymd.innerHTML = nowYear +'年'+ nowMonth +'月'+ nowDate +'日';
		
	}
	
	
	
	/*显示对应的年月*/
	function showYearMonth(){
		
		//获取时间对象实例
		var date = new Date();
		
		//设置到对应的月份
		date.setMonth(m);
		
		//获取对应年
		var year_ = date.getFullYear();
		
		//获取对应月
		var month_ = date.getMonth()+1;
		
		//在页面中显示对应的年月
		yearMonth_.innerHTML = year_ + '年' + month_ + '月';
		
	}
	
	
	
	/*显示对应每月的日期*/
	function showMonth(){
		
		//获取时间对象实例
		var date = new Date();
		
		//设置到下个月
		date.setMonth(m+1);
		
		//设置的日期跳到到这个月的最后一天日期
		date.setDate(0);
		
		//找到当月最后一天
		var lastDate = date.getDate();//当月的最后一天日期就是当月的总天数
		
		//生成当月天数对应的li
		var html = '';
		for(var i=0; i<lastDate; i++){
			html += '<li class="now">'+ (i+1) +'</li>';
		}
		
		//生成的li插入DOM
		ul.innerHTML = html;
	}
	
	
	/*找到对应周*/
	function showWeek(){
		
		//获取时间对象是实例
		var date = new Date();
		
		//设置到这个月
		date.setMonth(m);
		
		//找到这个月1号
		date.setDate(1);
		
		//获取到这个月的1号是周几
		var week = date.getDay();
		
		//找到上月的最后一天
		date.setDate(0);
		
		var prevDate = date.getDate();//生成上个月的li用
		
		var html = '';
		for(var i=0; i<week-1; i++){
			html = '<li class="prev">'+ (prevDate-i) +'</li>' + html;
		}
		
		//生成的li插入DOM
		ul.innerHTML = html + ul.innerHTML;
		
		//获取生成已生成的li
		var aLi = $('.month-date li');
		
		//计算还需多少li
		var num = 42 - aLi.length;
		
		//补全下月的li
		html = '';
		for(var i=0; i<num; i++){
			html += '<li class="next">'+ (i+1) +'</li>';
		}
		
		//生成的li插入DOM
		ul.innerHTML += html;
	}
	
	
	
	/*标记今天*/
	function today(){
		
		//获取时间对象实例
		var date = new Date();
		
		
		var y_now = date.getFullYear();//当年
		var m_now = date.getMonth();//当月
		var t_now = date.getDate();//当日
		
		//设置的时间
		date.setMonth(m);
		var y_ = date.getFullYear();//显示的年
		var m_ = date.getMonth();//显示的月
		
		//获取当月的li
		var li = $('li.now');
		
		//判断是否是当年当月
		for(var i=1; i<li.length; i++){
			if(y_now==y_&&m_now==m_){
				li[t_now-1].style.color = 'red';
			}
		}
	}
	
	
	/*添加鼠标事件*/
	function mouseEvent(){
		
		//获取生成日期的所有li
		var aLi = $('.month-date li');
		var len = aLi.length;
		
		//遍历所有li
		for(var i=0; i<len; i++){
			
			aLi[i].isSign = false;//设置未标记状态
			
			//鼠标移入当前li，当前li改变边框颜色
			aLi[i].onmouseover = function (){
				if(this.isSign) return;//如果标记过就不执行鼠标移入事件
				this.style.borderColor = '#A7A6AF';
			};
			
			//鼠标移出当前li，当前li改变边框颜色
			aLi[i].onmouseout = function (){
				if(this.isSign) return;//如果标记过就不执行鼠标移除事件
				this.style.borderColor = '';
			};
			
			//鼠标点击当前li，当前li显示边框
			aLi[i].onclick = function (){
				if(this.isSign==false){
					for(var i=0; i<len; i++){
						aLi[i].style.borderColor = '';
						aLi[i].isSign = false;
					}
					this.style.borderColor = 'red';
					this.isSign = true;
				}else{
					this.style.borderColor = '';
					this.isSign = false;
				}
				
				
			};
		}
	}
	
	
}
