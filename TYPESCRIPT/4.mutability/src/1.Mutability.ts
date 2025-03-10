//state is immutable 
// let isAdmin = true
// isAdmin = false
// (prevState) => (newState) 
// prevSate != newSatte

//mutability referes to the ability of a value to be changed after it has been created  

//primitive types are immutable - you cant change change them once created
//Primitive values like string, number, boolean, null, undefined, and symbol are immutable
let str = "Hello"
console.log(str.toUpperCase()) //HELLO
console.log(str) //Hello

//Objects and Arrays are mutable
//Objects and arrays in TypeScript are mutable by default, which means their contents can be changed even if declared with const
const arr: number[] = [1, 2, 3, 4, 5]
arr.push(6)
console.log(arr) //[ 1, 2, 3, 4, 5, 6 ]

const obj = { name: "Alice", age: 30 }
obj.age = 89
console.log(obj) //{ name: 'Alice', age: 89 }

///can we make object immutable (unchanged)
//yes - using readonly property or utility like Readonly<T>
type User = {
    readonly name: string;
    age: number;
}
const user: User = { name: "John", age: 25 }
//can we change the name value
// user.name = "James" - Cannot assign to 'name' because it is a read-only property.ts(2540)
user.age = 27 // works becausez age is not read only

const readOnlyObj: Readonly<User> = { name: "John", age: 25 }
//readOnlyObj.age = 35 //Cannot assign to 'age' because it is a read-only property.ts(2540)
//readOnlyObj.name = "Jane" //Cannot assign to 'name' because it is a read-only property.ts(2540)

// Yes, you can make only specific properties mutable while using Readonly<T> by combining utility types in TypeScript.
// Using Omit and Partial Utility Types
// The idea is to:
// Omit the property you want to make mutable.
// Use Partial to make that property mutable.
// Combine them using the intersection (&) operato
type User1 = {
    name: string;
    age: number;
};

const readOnlyObj1: Readonly<User> = {
    name: "John",
    age: 25,
};

// readOnlyObj.age = 35; // Error: 'age' is read-only
// readOnlyObj.name = "Jane"; // Error: 'name' is read-only

// Making `age` mutable
type MutableAge = Omit<Readonly<User>, "age"> & { age: number };

const mutableAgeObj: MutableAge = {
    name: "John",
    age: 25,
};

mutableAgeObj.age = 35; // Works: `age` is mutable
// mutableAgeObj.name = "Jane"; // Error: 'name' is still read-only

console.log(mutableAgeObj); // { name: "John", age: 35 }



//How to pass types to functions 
//basic way of passing types to functions 
function greet(name: string): string {
    return `Hello ${name}`
}
console.log(greet("Alice")) //Hello Alice

//Generics in functions 
//the type of a generic is unknown until given a type later with a value
//generic allows functions to accept different types while preserving type safety 
//   function funcName<T>(args: T) {}
function identity<T>(value: T):T {
    return value
}
console.log(identity<string>("Hello")) //Hello
console.log(identity<number>(45)) //45
console.log(identity<{name: string; age:number}>({name: "John", age:34})) //{ name: 'John', age: 34 }


//passing multiple generics
function merge<T, U>(obj1:T, obj2:U): T & U {
    return {...obj1,...obj2}
}
const mergedbj = merge({name: "Green"} , {age: 34})
console.log(mergedbj) //{ name: 'Green', age: 34 }

//Arrays in typescript
//const arrName: type[] = []
//const arrName:Array<type> = []
const fruits: Array<string> = ["Apple", "Banana", "Cherry"]
const marks: number[] = [1,2,3,4,5,6,7]


//promises in tyoescript 
type userType = {
    uid: string;
    uName: string;
    isAdmin: boolean;
}


//single data object
const dataObject: userType = {
    uid: 'dfghjk34567',
    uName: '245coder',
    isAdmin: false
}


//sample of array data
const arryData = [dataObject]
const fetchData = async ():Promise<Array<userType>> => {
    //const res = await fetch(apiURL)
    //const jsonData = await res.json()
    const user_data = await arryData
    //how the backend data structure looks like determines the return type
    //for an array objects 
    //const fetchData = async ():Promise<userType[]> => {}
    return user_data
}
fetchData().then((user) => console.log(user))
//[ { uid: 'dfghjk34567', uName: '245coder', isAdmin: false } ]


//sets in typescript 
//a set in javascript is a collection of unique values. 
//in TS, it is types using Set<Type>
const mySet: Set<number> = new Set([1,2,3,4,5])
mySet.add(6)
console.log(mySet) //Set(6) { 1, 2, 3, 4, 5, 6 }

//creating an empty set with specific types
const emptySet = new Set<string>()
emptySet.add('Hello')
console.log(emptySet)

console.log(mySet.has(3)) //true


//Types Assertion and casting 
//use as syntax
//use Angle Bracket syntax

//as syntax 
const jsonString = '{"name": "Alice", "age": 30}';
const parsedData = JSON.parse(jsonString) as {name:string; age:number}
console.log('🔥🔥' ,parsedData) //🔥🔥 { name: 'Alice', age: 30 }

//using Angle brackets 
const parsedData2 = <{ name: string; age: number }>JSON.parse(jsonString);


//default parameters
const greet2 = (name:string, greetings:string = "Hello") => {
    console.log(`${greetings} ${name}`)
}
//automatically making a parameter as a default will make it optional
//greet2(name: string, greetings?: string): void
greet2("Bob") //Hello Bob
greet2("Bella", "How are you") //How are you Bella

//rest parameters
const sum = (...numbers: number[]) => {
    return numbers.reduce((prev, next) => prev + next , 0)
}
console.log(sum(1,2,3,4,5,6)) //21

//void keyword - no retun type
const logMsg = (message: string):void => {
    console.log((message))
}
//nothing is being returned 