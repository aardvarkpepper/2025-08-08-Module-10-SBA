//console.log(JSON.parse(1)); // ok in Javascript but not in Typescript.
//console.log(JSON.parse('hamster')); // Unexpected token 'h', "hamster" is not valid JSON
// console.log(JSON.stringify(['ham', 'boni'])); // all white in console; string
// console.log(['ham', 'bnnie']);  //'ham' and 'bnnie' green in console, some sort of data structure.
// console.log([['ham'], "bunny"]); // 'ham' and 'bunny' green in console.

// let stringy = JSON.stringify(['ham', 'buni']);
// console.log(JSON.parse(stringy)); // 'ham' and 'buni' green in console.

// console.log(JSON.parse('ham'));

// const hamster = JSON.parse('ham');
// console.log(hamster);
// const hamster = new Set();
// console.log(hamster);
// console.log(JSON.stringify(hamster));
// console.log(JSON.parse(JSON.stringify(hamster))); // strips the 'set'.

const waggy = 'https://www.youtube.com/watch?v=4aZr5hZXP_s'
console.log(waggy.slice(32));