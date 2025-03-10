// Unions are a powerful feature in TypeScript that allow variables, parameters, or return types to hold more than one type of value. They provide flexibility while maintaining type safety, making your code more expressive and robust. Below is a detailed breakdown of unions in TypeScript, including examples, best practices, and use case

//what is a union
//A Union Type allows a variable to hold values of multiple types. It is created using the | (pipe) symbol between the types
let value: string | number
value = 'Hello'
value = 78

//why use unions? 
// Flexibility with Type Safety: Unions allow a variable to accept multiple types while ensuring type safety.

// Useful for Scenarios Where a Variable Can Be One of Several Types: For example, a function parameter that can accept either a string or a number.

//3: Declaring union typea
//using the | symbol u can declare a union type
const logId = (id: string | number) => {
    console.log(id)
}
logId('abc123')
logId(12345)
//the log function accpetd the string and a number as a param

//4: Types alies with unions 
//Type aliases allow you to define a union type with a name, making your code cleaner and more readable
type ID = string | number

const userId: ID = "user123svc"
const orderId: ID = 234

//5: Literal types in unions
//Literal types allow you to specify exact values a type can have. They are useful for defining a limited set of options.
type Direction = "up" | "down" | "left" | "right"
function move(dir: Direction) {
    console.log(`Moving ${dir}`)
}
move("up") //Moving up
move("right") //Moving right

type mpesaState = "success" | "failed" | "pending"
function smsService(transState: mpesaState) {
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

//6:Combine Unions with Unions
//you can combine multple unions to create more complex types
type DigitalFormat = "MP3" | "FLAC"
type PysicalFormat = "LP" | "CD" | "Cassette"
type AlbumFormat = DigitalFormat | PysicalFormat
//AlbumFormat can accept values from either DigitalFormat or PhysicalFormat

//Difference between | (Union) and & (Intersection) in TypeScript
// The Union (|) operator allows a type to be one of several types.
// It means "either one or the other".
// In the example below, AlbumFormat can be any value from either DigitalFormat or PhysicalFormat
// Usage
let album1: AlbumFormat;
album1 = "MP3";        // Valid
album1 = "CD";         // Valid
album1 = "Cassette";   // Valid
album1 = "FLAC";       // Valid
// album1 = "Vinyl";   // Error: Type '"Vinyl"' is not assignable to type 'AlbumFormat'.
// Explanation:
// AlbumFormat can be any one of these values:
// "MP3", "FLAC" (from DigitalFormat)
// "LP", "CD", "Cassette" (from PhysicalFormat)
// It combines the values but allows only one at a time.


// 2. Using & (Intersection) Operator
// The Intersection (&) operator requires a type to satisfy all the combined types simultaneously.
// It means "both at the same time".
// In this example, AlbumFormat is expected to be a type that is both DigitalFormat and PhysicalFormat at the same time:
type AlbumFormatIntersect = DigitalFormat & PysicalFormat;
let album2: AlbumFormatIntersect;
// album2 = "MP3"  - y=this will bring an error , cz its expecting all the values


//7:Narrowing Unions types
// Type narrowing is the process of refining a union type to a more specific type. This is often done using:
// typeof operator
// Type guards
// Control flow (like if, switch)

//typeof example
const printValue = (value: string | number) => {
    if(typeof value === 'string') {
        console.log(value.toUpperCase())
    } else {
        console.log(value.toFixed(2))
    }
}
printValue("hello") //HELLO
printValue(123.3456) //123.35


//8: Literal Narrowing
//Typescript narrows literals types within control flow 
type Status = 'success' | 'error';
const logStatus = (status: Status) => {
    if (status === 'success') {
        console.log("Operation was successful.");
    } else {
        console.log("An error occurred.");
    }
}
logStatus("success"); // Valid
logStatus("error");   // Valid
// logStatus("pending"); // Error: Not a valid Status


//9 Discriminated unions
//Discriminated unions are a pattern for narrowing types in TypeScript. They use a common property (called a discriminant) with a literal type.
// This allows TypeScript to narrow the union to the specific type by checking the discriminant's value.
//4. Example: Loading, Success, and Error States
//This example demonstrates a state management pattern using discriminated unions
// 1. Define State Types with a Common Discriminant Property
type LoadingState = {
    status: 'loading';   // Discriminant with a literal type
};

type SuccessState = {
    status: 'success';   // Discriminant with a different literal type
    data: string;
};

type ErrorState = {
    status: 'error';     // Discriminant with another literal type
    error: string;
};

// 2. Combine Them into a Union Type
type State = LoadingState | SuccessState | ErrorState;

//4. Example Scenario: Adding a Comment with Optimistic UI
// Scenario: User adds a comment to a list. The UI instantly shows the comment, assuming success.
// If the server fails, the comment is removed and an error message is displayed.

type State1 = LoadingState | SuccessState | ErrorState;

const handleState = (state: State1) => {
    if (state.status === 'loading') {
        console.log("Loading...");
    } else if (state.status === 'success') {
        console.log(`Data: ${state.data}`);
    } else {
        console.log(`Error: ${state.error}`);
    }
}



//10: unknown vs never in unions 
//unknown: The most flexible type. Can be anything but requires type checking before usage.
// never: The most restrictive type. Represents a value that never 
let value1: unknown;
value1 = "Hello";  // Valid
value1 = 42;       // Valid
// value.toUpperCase(); // Error: 'value' is of type 'unknown'

const handleInput = (input: never) => {
    // This function will never be called with a value
}

//TypeGuards
// 1. What are Type Guards?
// Type Guards are expressions or functions that narrow down a union type to a more specific type.
// They allow TypeScript to refine the type of a variable within a specific block (e.g., if, else, switch).
// This enables type-safe access to properties and methods that belong only to the narrowed type
type Car = { 
    type: 'car', 
    speed: number 
};
type Bike = { 
    type: 'bike', 
    gears: number 
};
type Vehicle = Car | Bike;
// We have a Vehicle type that can be either a Car or a Bike.
// Goal: To safely access speed for Car and gears for Bike.

const getVehicleInfo = (vehicle: Vehicle) => {
    if (vehicle.type === 'car') {
        // Narrowed to Car
        console.log(`Speed: ${vehicle.speed}`);
    } else {
        // Narrowed to Bike
        console.log(`Gears: ${vehicle.gears}`);
    }
}


// Explanation:
// TypeScript narrowed the type by checking vehicle.type.
// In the if block, vehicle is treated as Car.
// In the else block, vehicle is treated as Bike.
// This is possible because of the discriminant type, which is a literal type ('car' or 'bike').

// 5. Custom Type Guards
// In complex scenarios, Custom Type Guards are preferred.
// A custom type guard is a function that returns a type predicate using the syntax: parameterName is TypeName
const isCar = (vehicle: Vehicle): vehicle is Car => {
    return vehicle.type === 'car';
}

//6. Using Custom Type Guards
const getVehicleInfo1 = (vehicle: Vehicle) => {
    if (isCar(vehicle)) {
        // vehicle is now Car
        console.log(`Speed: ${vehicle.speed}`);
    } else {
        // vehicle is now Bike
        console.log(`Gears: ${vehicle.gears}`);
    }
}


//typeof as a narrower
const printValue2 = (value: string | number) => {
    if (typeof value === 'string') {
        // value is string
        console.log(value.toUpperCase());
    } else {
        // value is number
        console.log(value.toFixed(2));
    }
}


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

const makeSound = (animal: Dog | Cat) => {
    if (animal instanceof Dog) {
        animal.bark();  // TypeScript knows it's a Dog
    } else {
        animal.meow(); // TypeScript knows it's a Cat
    }
}


// 7.3 in Operator
// Checks if a property exists in an object.
// Useful when discriminant properties are optional or not literals.
type Bird = { fly: () => void };
type Fish = { swim: () => void };

const move1 = (animal: Bird | Fish) => {
    if ('fly' in animal) {
        animal.fly();  // TypeScript knows it's a Bird
    } else {
        animal.swim(); // TypeScript knows it's a Fish
    }
}
