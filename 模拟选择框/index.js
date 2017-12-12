window.onload =function(){
	//获取元素
	var input_text = document.querySelector('input');
	var aLi = document.querySelectorAll('li');
	var ul = document.querySelector('ul');
	
	
	input_text.onclick =function(){
		ul.style.display = 'block';
		var val = this.value;
		for(var i=0; i<aLi.length; i++){
			aLi[i].state = false;
			if(aLi[i].innerHTML==val){
				aLi[i].className = 'active';
				aLi[i].state = true;
			}
		}
	};
	
	for(var i=0; i<aLi.length; i++){
		
		aLi[i].onmouseover =function(){//鼠标移入事件
			this.className = 'active';
		};
		
		aLi[i].onmouseout =function(){//鼠标移除事件
			if(this.state) return;
			this.className = '';
		};
		
		aLi[i].onclick =function(){//鼠标点击事件
			this.state = true;
			for(var i=0; i<aLi.length; i++){
				aLi[i].className = '';
			}
			input_text.value = this.innerHTML;
			ul.style.display = 'none';
		};
	}
};

