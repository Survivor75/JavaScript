var dog = document.querySelector("img");
var angle = 0 , lastTime = null;

function animate ( time ) {
  if ( lastTime != null )
    angle += ( time - lastTime ) * 0.001;
  lastTime = time ;
dog.style.top = (Math.sin(angle)*20)+"px";
dog.style.left = (Math.cos(angle)*200)+"px";
requestAnimationFrame(animate);
}
requestAnimationFrame(animate);
