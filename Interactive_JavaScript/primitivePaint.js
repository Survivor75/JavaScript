addEventListener (" click " , function ( event ) {
var dot = document . createElement (" div ") ;
dot . className = " dot ";
dot . style . left = ( event . pageX - 4) + " px ";
dot . style . top = ( event . pageY - 4) + " px ";
document . body . appendChild ( dot );
}) ;
