var myJSON = {
    "name": {
        "first": "Beau",
        "last": "Carnes"
    },
    "age":33,
    "skills": [ "juggling", "stiltwalking", "coding" ],
    "married": true,
    "superpowers": null
 }

// stringify method
var stringified = JSON.stringify(myJSON);
console.log(stringified);


// parse method
var stringJSON = '{ "name":"Beau", "kids":2,"state":"Michigan"}';
var myParse = JSON.parse(stringJSON);
console.log(myParse);
