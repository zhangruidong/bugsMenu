(function() {
  let bgs = document.querySelectorAll(".scroll .bg");
  let logo = document.querySelector(".scroll .landing-logo");
  let text = document.querySelector(".scroll .landing-text");
  let scroll = document.querySelector(".scroll .landing-scroll");
  
  document.onmouseover = function(e) {
    pre = {
      x: e.clientX,
      y: e.clientY
    }
  }
  
  document.onmousemove = function(e) {
    offsetFn(logo,20,e)
    offsetFn(text,35,e)
    offsetFn(scroll,25,e)
    bgs.forEach( item => {
      offsetFn(item,15,e)
      pre = {
        x: e.clientX,
        y: e.clientY
      }
    })
  }
  
  function offsetFn(el,offset,e) {
    if(el.offsetX == undefined){
      el.offsetX = 0
      el.offsetY = 0
    }
    if(transform(el,"translateY") == undefined){
      transform(el,"translateX",0)
      transform(el,"translateY",0)
    }
  
    if(e.clientX>pre.x){
      el.offsetX=el.offsetX-offset/50;
    }else{
      el.offsetX=el.offsetX+offset/50;
    }
    if(e.clientY>pre.y){
      el.offsetY=el.offsetY-offset/50;
    }else{
      el.offsetY=el.offsetY+offset/50;
    }
  
    if(el.offsetX>offset)el.offsetX=offset;
    if(el.offsetX<-offset)el.offsetX=-offset;
    if(el.offsetY>offset)el.offsetY=offset;
    if(el.offsetY<-offset)el.offsetY=-offset;
  
    transform(el,"translateX",el.offsetX)
    transform(el,"translateY",el.offsetY)
  }
})();

/*
(function () {
	let s1 = document.querySelector(".screen");
	let bg = s1.querySelector(".bg")
	
	transform(s1,"translateX",0);
	transform(s1,"translateY",0);
  let offsetX = Number(transform(s1,"translateX"));
  let offsetY = Number(transform(s1,"translateY"));
  
  let pre = {};
  document.onmouseover = function(e) {
    pre = {
      x: e.clientX,
      y: e.clientY
    }
  }
	document.onmousemove = function (e) {
    if(e.clientX>pre.x){
      offsetX=offsetX+.2;
    }else{
      offsetX=offsetX-.2;
    }
    if(e.clientY>pre.y){
      offsetY=offsetY+.2;
    }else{
      offsetY=offsetY-.2;
    }
    
    
    if(offsetX>15)offsetX=15;
    if(offsetX<-15)offsetX=-15;
    if(offsetY>15)offsetY=15;
    if(offsetY<-15)offsetY=-15;
		transform(s1,"translateX",offsetX)
		transform(s1,"translateY",offsetY)
    console.log(transform(s1,"translateX"));
    pre = {
      x: e.clientX,
      y: e.clientY
    }
	}
})();*/
