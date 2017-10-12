(function () {  // 滚动事件
	let scroll = document.querySelector(".scroll");
	let outer = document.querySelector(".outer");
	let inner = document.querySelector(".inner");
	let screens = document.querySelectorAll(".screen");
	
	
	let screenH = screens[0].offsetHeight;
	let scrollMax = screenH*(screens.length-1);
	let maxTop = 0;
	
	let t = 0;
	let moveState = false;
	
	inner.style.height = outer.offsetHeight/screens.length + "px";
	maxTop = outer.offsetHeight - inner.offsetHeight;
	
	inner.onmousedown = function (e) {
		let disY = e.clientY - inner.getBoundingClientRect().top;
		document.onmousemove = function (e) {
			let T = e.clientY - disY;
			if(T<0)T=0;
			if(T>maxTop)T=maxTop;
			inner.style.top = T + "px";
			scroll.style.top = -scrollMax*(inner.offsetTop/maxTop) + "px";
		}
		document.onmouseup = function () {
			if(t<inner.offsetTop/inner.offsetHeight){
				t = Math.ceil(inner.offsetTop/inner.offsetHeight)
				/*if(t === screens.length){
						console.log('aaa');
						t= maxTop/inner.offsetHeight;
				}*/
			}else{
				t = Math.floor(inner.offsetTop/inner.offsetHeight)
			}
			
			/*t = Math.round(inner.offsetTop/inner.offsetHeight);
			console.log(t);*/
			move();
			document.onmousemove = document.onmouseup = null;
		}
		return false;
	}
	
	
	
	addScroll(scroll,upFn,downFn)
	function upFn(){
		if(moveState)return;
		t--;
		if(t<0){
			t=0;
			return
		}
		move()
	}
	function downFn () {
		if(moveState)return;
		t++;
		if(t === screens.length){
			t=t-1;
			return;
		}
		move()
	}
	function addScroll(obj,upFn,downFn){
		obj.onmousewheel = fn;
		obj.addEventListener("DOMMouseScroll",fn);
		function fn(e){
			if( e.wheelDelta ){//chrome
				if( e.wheelDelta > 0 ){//上
					upFn();
				}else{//下
					downFn();
				}
			}else if( e.detail ){//firefox
				if( e.detail < 0 ){//上
					upFn();
				}else{//下
					downFn();
				}
			}
		}
	}
	function move() {
		mTween({
			el: inner,
			time: 60,
			target: {
				top: inner.offsetHeight*t
			},
			type: 'easeBothStrong',
			callIn: function () {
				moveState = true
			},
			callBack: function () {
				moveState = false
				console.log(inner.offsetTop);
				console.log(maxTop);
			}
		})
		mTween({
			el: scroll,
			time: 60,
			target: {
				top: -screenH*t
			},
			type: 'easeBothStrong'
		})
	}
})();