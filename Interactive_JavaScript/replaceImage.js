function replaceImages () {
var images = document . body . getElementsByTagName (" img ") ;
for ( var i = images . length - 1; i >= 0; i--) {
var image = images [ i ];
if ( image . alt ) {
var text = document . createTextNode ( image . alt );
image . parentNode . replaceChild ( text , image );
}
}
}
