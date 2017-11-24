var arr = ["a", "b", "c"];

arr.push("d");
console.log(arr);

console.log(arr.pop());
console.log(arr);

var arr2 = ["g", "q"];
console.log(arr.concat(arr2));
console.log(arr2);

console.log(arr.join("!"));

console.log(arr.reverse());
console.log(arr);

console.log(arr.shift());
console.log(arr);

console.log(arr.unshift("p"));
console.log(arr);

console.log(arr.slice(1,3));

arr.push("i");
arr.push("f");
arr.sort(arr);
console.log(arr);

console.log(arr.splice(2, 2, "JS Nuggets"));
console.log(arr);
