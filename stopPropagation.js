var para = document . querySelector (" p ") ;
var button = document . querySelector (" button ") ;
para . addEventListener (" mousedown " , function () {
console . log (" Handler for paragraph .") ;
}) ;
button . addEventListener (" mousedown ", function ( event ) {
console . log (" Handler for button .") ;
if ( event . which == 3)
event . stopPropagation () ;


document . body . addEventListener (" click " , function ( event ) {
if ( event . target . nodeName == " BUTTON ")
console . log (" Clicked " , event . target . textContent );
}) ;
