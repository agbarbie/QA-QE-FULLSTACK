// 1.a.Declaring Variables
let age = 25;
console.log(age);
const schoolName = "Greenwood High";
console.log(schoolName);

//b.Declaring an empty array
const studentsList = {};
console.log(studentsList);

//c.Difference between let,const and var
//Let - here a variable can change
//const - the variable is constant, it cannot change
//var - it is an old school way of declaring variables

//2.a.Naming Variables
let userName = "Alice";

//3.b. why is the following variable incorrect
//const #taxRate = 0.16;
//because variables are defined using a camelCase

//3.c.Rewite this variable name to follow best practices:
//let MyvariableNAME = "JavaScript";
let myvariableName = "JavaScript";

//Identifying Data Types
//string
//number
//boolean
//undefined

//3.d Idenify the data types in this array:
//let data = ["Kenya" ,34, false. {country:"USA"},null];
let data = [typeof("Kenya"),typeof(34),typeof(false),typeof{country:"USA"},null];
console.log(data);

//3.e Defining BigInt
let profit = 1200000000n;
console.log(profit);

//4.a Objects & Arrays
const person = {
    name: "Barbara",
    age: 22,
    city: "Nyeri"
  };
  console.log(person);
  
//4.b Add new property
person.country = "Kenya";
console.log(person);

// 4.c. Array of fruits
const fruits = ["Apple", "Orange", "Mango"];
console.log(fruits); 

// 4.d. Accessing an array
console.log(fruits[1]); 

// 5.a.The output 
//52
//3

// 5.b string to a number
let num = typeof("100");
console.log(num)

//number to a string
let string = typeof(50);
console.log(string);

console.log(5 + true);



