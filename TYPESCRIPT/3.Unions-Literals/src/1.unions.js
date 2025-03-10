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
//the log function accpetd the string and a number as a param
