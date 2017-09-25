// AJAX = Asynchronous JavaScript And XML

function loadDoc() {
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
     document.getElementById("demo").innerHTML = this.responseText;
     console.log("Hello")
    }
  };
  xhttp.open("GET", "https://cors-anywhere.herokuapp.com/http://carnes.cc/code/ajax_example.txt", true);
  xhttp.send();
  console.log("World");
}
