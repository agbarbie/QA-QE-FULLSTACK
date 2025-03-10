"use strict";
// Unions are a powerful feature in TypeScript that allow variables, parameters, or return types to hold more than one type of value. They provide flexibility while maintaining type safety, making your code more expressive and robust. Below is a detailed breakdown of unions in TypeScript, including examples, best practices, and use case
Object.defineProperty(exports, "__esModule", { value: true });
//what is a union
//A Union Type allows a variable to hold values of multiple types. It is created using the | (pipe) symbol between the types
let value;
value = 'Hello';
value = 78;
//why use unions? 
// Flexibility with Type Safety: Unions allow a variable to accept multiple types while ensuring type safety.
// Useful for Scenarios Where a Variable Can Be One of Several Types: For example, a function parameter that can accept either a string or a number.
//3: Declaring union typea
//using the | symbol u can declare a union type
const logId = (id) => {
    console.log(id);
};
logId('abc123');
logId(12345);
const userId = "user123svc";
const orderId = 234;
function move(dir) {
    console.log(`Moving ${dir}`);
}
move("up"); //Moving up
move("right"); //Moving right
function smsService(transState) {
    if (transState === "success") {
        // sendMessageSuccess()
    }
    if (transState === "pending") {
        //sendMessagePending()
    }
    if (transState === "failed") {
        //sendMessageFailed()
    }
}
//AlbumFormat can accept values from either DigitalFormat or PhysicalFormat
//Difference between | (Union) and & (Intersection) in TypeScript
// The Union (|) operator allows a type to be one of several types.
// It means "either one or the other".
// In the example below, AlbumFormat can be any value from either DigitalFormat or PhysicalFormat
// Usage
let album1;
album1 = "MP3"; // Valid
album1 = "CD"; // Valid
album1 = "Cassette"; // Valid
album1 = "FLAC"; // Valid
let album2;
// album2 = "MP3"  - y=this will bring an error , cz its expecting all the values
//7:Narrowing Unions types
// Type narrowing is the process of refining a union type to a more specific type. This is often done using:
// typeof operator
// Type guards
// Control flow (like if, switch)
//typeof example
const printValue = (value) => {
    if (typeof value === 'string') {
        console.log(value.toUpperCase());
    }
    else {
        console.log(value.toFixed(2));
    }
};
printValue("hello"); //HELLO
printValue(123.3456); //123.35
const logStatus = (status) => {
    if (status === 'success') {
        console.log("Operation was successful.");
    }
    else {
        console.log("An error occurred.");
    }
};
logStatus("success"); // Valid
logStatus("error"); // Valid
const handleState = (state) => {
    if (state.status === 'loading') {
        console.log("Loading...");
    }
    else if (state.status === 'success') {
        console.log(`Data: ${state.data}`);
    }
    else {
        console.log(`Error: ${state.error}`);
    }
};
//10: unknown vs never in unions 
//unknown: The most flexible type. Can be anything but requires type checking before usage.
// never: The most restrictive type. Represents a value that never 
let value1;
value1 = "Hello"; // Valid
value1 = 42; // Valid
// value.toUpperCase(); // Error: 'value' is of type 'unknown'
const handleInput = (input) => {
    // This function will never be called with a value
};
// We have a Vehicle type that can be either a Car or a Bike.
// Goal: To safely access speed for Car and gears for Bike.
const getVehicleInfo = (vehicle) => {
    if (vehicle.type === 'car') {
        // Narrowed to Car
        console.log(`Speed: ${vehicle.speed}`);
    }
    else {
        // Narrowed to Bike
        console.log(`Gears: ${vehicle.gears}`);
    }
};
// Explanation:
// TypeScript narrowed the type by checking vehicle.type.
// In the if block, vehicle is treated as Car.
// In the else block, vehicle is treated as Bike.
// This is possible because of the discriminant type, which is a literal type ('car' or 'bike').
// 5. Custom Type Guards
// In complex scenarios, Custom Type Guards are preferred.
// A custom type guard is a function that returns a type predicate using the syntax: parameterName is TypeName
const isCar = (vehicle) => {
    return vehicle.type === 'car';
};
//6. Using Custom Type Guards
const getVehicleInfo1 = (vehicle) => {
    if (isCar(vehicle)) {
        // vehicle is now Car
        console.log(`Speed: ${vehicle.speed}`);
    }
    else {
        // vehicle is now Bike
        console.log(`Gears: ${vehicle.gears}`);
    }
};
//typeof as a narrower
const printValue2 = (value) => {
    if (typeof value === 'string') {
        // value is string
        console.log(value.toUpperCase());
    }
    else {
        // value is number
        console.log(value.toFixed(2));
    }
};
// 7.2 instanceof Operator
// Used to check if an object is an instance of a class or constructor.
// Works well with class-based types.
class Dog {
    bark() {
        console.log("Woof!");
    }
}
class Cat {
    meow() {
        console.log("Meow!");
    }
}
const makeSound = (animal) => {
    if (animal instanceof Dog) {
        animal.bark(); // TypeScript knows it's a Dog
    }
    else {
        animal.meow(); // TypeScript knows it's a Cat
    }
};
const move1 = (animal) => {
    if ('fly' in animal) {
        animal.fly(); // TypeScript knows it's a Bird
    }
    else {
        animal.swim(); // TypeScript knows it's a Fish
    }
};
