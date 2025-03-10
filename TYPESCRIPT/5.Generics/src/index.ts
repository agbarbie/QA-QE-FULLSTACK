//Introduction to Generics
//Generics allow us to create reusable components that work with a variety of types rather than a single one. They act as placeholders for types.
function getFirstElementNumber(args: number[]) {
    return args[0]
}
function getFirstElementString(args: string[]) {
    return args[0]
}

//with generics we avoid thisisnce the functions are doing the same thing 
//we can reuse the component  
// const nums = numbers[]
//(type parameter) T in getFirstElement<T>(args: T[]): T
function getFirstElement<T>(args: T[]) {
    return args[0]
}
const firstNumber = [1,2,3,4]
const firstString = ['a','b','c']
//getFirstElement<any>(args: any[]): any
//const firstNumber: number[]
console.log(getFirstElement(firstNumber)) //1 - Typescript automatcally infers it ot number
console.log(getFirstElement(firstString)) //a - infer it to a string 


// Why Use Generics?
// Type Safety: Avoid runtime errors by catching type mismatches at compile time.
// Code Reusability: Reuse functions and classes with different data types without rewriting them.
// Maintainability: Easier to maintain and extend code since you only need to update logic in one place


//using Generics with functions 
//1: single generic parameter 
//function reverseArray<T>(arr: T[]): T[]
function reverseArray<T>(arr: T[]): T[] {
    return arr.reverse()
}
const numArr = [1,2,3] //const numArr: number[]
console.log(reverseArray(numArr)) //[ 3, 2, 1 ]


//2: Multiple Generic parameters 
//function mergeObjects<T, U>(obj1: T, obj2: U): T & U
function mergeObjects<T, U>(obj1: T, obj2:U): T & U {
    return {...obj1, ...obj2}
}
const objA = {name: 'John', age: 23}
const objB = {country: 'Kenya', county: "Bomet"}

console.log(mergeObjects(objA, objB)) //{ name: 'John', age: 23, country: 'Kenya', county: 'Bomet' }


///Generic contraints
//you can limit the types that can be passed as a generic parameter
function getProperty<T, K extends keyof T > (obj: T, key: K) {
    return obj[key]
}
const person = {name: 'Jane', age: 30}
const name = getProperty(person, "name" )
console.log(name) //Jane - this is valid because Jane is a key from person
// const name2 = getProperty(person, "Jay" )
//Argument of type '"Jay"' is not assignable to parameter of type '"name" | "age"'.ts(2345)


//Default Types for Generics
//function createPair<T = string, U = number>(value1: T, value2: U): (T | U)[]
function createPair<T = string, U = number>(value1: T, value2: U):(T | U)[] {
    return [value1, value2]
}
console.log(createPair('hello', 45)) //[ 'hello', 45 ]
//the default parameters will be overwrriten 
console.log(createPair(100, true)) //[ 100, 45 ]



//Generics with Interfaces and types  
// interface Admin {
//     name: string;
//     isAdmin: boolean;
// }
interface KeyValuePairs<K,V> {
    key: K;
    value: V;
}
const numPairs : KeyValuePairs<string, number> = {
    key: 'id',
    value: 123
}



//Type Alieses with Generics
// type EmployeeType = {
//     name: string;
//     age: number;
// }

//we want to create a generic type 
type Result<T> = {
    success: boolean;
    data: T;
    error?: string
}

const successResponse: Result<string> = {
    success: true,
    data: 'Operation was successful'
}


//conditional types with Generics
function IsString<T> (value: T) {
    if(typeof value === 'string') {
        console.log(`yes`)
    } else {
        console.log(`No`)
    }
}

const Result1 = IsString('helo')
console.log(Result1) //Yes

const Result2 = IsString(3)
console.log(Result2) //No

type IsString2<T> = T extends string ? 'Yes' : 'No'
