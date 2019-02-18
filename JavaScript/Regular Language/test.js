// test code - 1
parse(">(x, 5)")
/*
{
  type: "apply",
  operator: {type: "word", name: ">"},
  args: [
    {type: "word", name: "x"},
    {type: "value", value: 5}
  ]
}

*/
// test code - 1
console.log(parse("+(a, 10)"));
/*
{
  type: "apply",
  operator: {type: "word", name: "+"},
  args: [
        {type: "word", name: "a"},
        {type: "value", value: 10}
      ]
}
*/
// test code - 2
run(`
do(define(plusOne, fun(a, +(a, 1))),
   print(plusOne(10)))
`);

// test code - 3
run(`
do(define(pow, fun(base, exp,
     if(==(exp, 0),
        1,
        *(base, pow(base, -(exp, 1)))))),
   print(pow(2, 10)))
`);