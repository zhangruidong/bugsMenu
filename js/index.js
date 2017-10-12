(function () {   // 整屏设置
	let content = document.querySelector(".content");
	let screens = document.querySelectorAll(".screen");
	screens.forEach( (item) => {
		item.style.height = content.offsetHeight + "px";
	})
	document.body.onresize = function () {
		screens.forEach( (item) => {
			item.style.height = content.offsetHeight + "px";
		})
	}
})();



(function () {  //burger
	let burger = document.querySelector("#burger");
	burger.onmouseover = function () {
		burger.classList.add("hover")
	}
	burger.onmouseout = function () {
		burger.classList.remove("hover")
	}
	burger.onclick = function () {
		burger.classList.toggle("close")
	}
})();