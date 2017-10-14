(function () {  // 滚动事件
	let scroll = document.querySelector(".scroll");
	let outer = document.querySelector(".outer");
	let inner = document.querySelector(".inner");
	let screens = document.querySelectorAll(".screen");
	let outerCircles = document.querySelectorAll(".outerCircle");
	
	let len = screens.length;
	let screenH = screens[0].offsetHeight;
	let screenMax = 0;
	let scrollMax = 0;
	
	let t = 0;
	let moveState = false;
	tapCircle(t)
	
	inner.style.height = 50 + "px";
	screenMax = screenH*(screens.length-1);
	scrollMax = outer.offsetHeight - inner.offsetHeight;
	
	inner.onmousedown = function (e) {
		let ori = inner.offsetTop;
		let disY = e.clientY - inner.getBoundingClientRect().top;
		document.onmousemove = function (e) {
			let T = e.clientY - disY;
			if(T<0)T=0;
			if(T>scrollMax)T=scrollMax;
			inner.style.top = T + "px";
			scroll.style.top = -screenMax*(inner.offsetTop/scrollMax) + "px";
		}
		document.onmouseup = function () {
			if(ori>inner.offsetTop){ //up
				t = Math.floor(inner.offsetTop/(scrollMax/(len-1)))
				move("up")
			}else {
				t = Math.ceil(inner.offsetTop/(scrollMax/(len-1)))
				move("down")
			}
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
		move("up")
	}
	function downFn () {
		if(moveState)return;
		t++;
		if(t === screens.length){
			t=t-1;
			return;
		}
		move("down")
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
	let subsections = document.querySelectorAll(".subsection");
	let pre = 0;
	subsections.forEach( (item,index) => {
		item.onclick = function () {
			pre = t;
			t = index;
			if(t<pre){
				move("up")
			}else {
				move("down")
			}
		}
	})
	
	function move(ori) {
		let Top = 0;
		if(ori === "up"){
			Top = inner.offsetTop-inner.offsetTop/(t+1)
		}else if(ori === "down") {
			Top = inner.offsetTop + (scrollMax - inner.offsetTop)/(len - t)
		}
		
		//----------------导航条的点击----------------------------
		let navigationSection = document.querySelectorAll(".navbarNavigation .navigationSection");
		let mins1 = navigationSection[1].querySelectorAll(".subsection:first-of-type~*");
		let mins2 = navigationSection[2].querySelectorAll(".subsection:first-of-type~*");
		let mins3 = navigationSection[3].querySelectorAll(".subsection:first-of-type~*");
		
		function fadeOut(items) {
			items.forEach( item => {
				item.style.transform = "scale(0)"
				item.style.height = "0"
			})
		}
		function fadeIn(items) {
			items.forEach( item => {
				item.style.transform = "scale(1)"
				item.style.height = "25px"
			})
		}
		if(t === 0) {   // 0 1 8 16 23
			fadeOut(mins1)
			fadeOut(mins2)
			fadeOut(mins3)
		}
		if(t>0 && t<8){
			fadeIn(mins1)
			fadeOut(mins2)
			fadeOut(mins3)
		}
		if(t>7 && t<16){
			fadeIn(mins2)
			fadeOut(mins1)
			fadeOut(mins3)
		}
		if(t>15 && t<23){
			fadeIn(mins3)
			fadeOut(mins1)
			fadeOut(mins2)
		}
		if(t === 23) {   // 0 1 8 16 23
			fadeOut(mins1)
			fadeOut(mins2)
			fadeOut(mins3)
		}
		//--------------------END-----------------------------
		mTween({
			el: inner,
			time: 60,
			target: {
				top: Top
			},
			type: 'easeBothStrong',
			callIn: function () {
				moveState = true;
			},
			callBack: function () {
				console.log(t);
				moveState = false
				tapCircle(t)
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
	
	function tapCircle(t) {
		outerCircles.forEach( item => {
			item.classList.remove("active")
		})
		outerCircles[t].classList.add('active');
	}
})();