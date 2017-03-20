function elt ( type ) {
  var node = document . createElement ( type );
  for ( var i = 1; i < arguments . length ; i ++) {
    var child = arguments [ i ];
    if ( typeof child == " string ")
      child = document . createTextNode ( child );
      node . appendChild ( child );
    }
    return node ;
}

document . getElementById (" quote ") . appendChild (
elt (" footer " , ---"" ,
elt (" strong " , " Karl Popper ") ,
" , preface to the second editon of ",
elt (" em " , " The Open Society and Its Enemies ") ,
" , 1950") ) ;
