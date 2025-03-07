//Chapter 5:Unions
// exercise 1: Unions
export function getUsername(username: string | null): string {
  return username !== null ? `User: ${username}` : "Guest";
}

console.log(getUsername("Alice"));
console.log(getUsername(null));

// exercise 2: Unions
function move(
  direction: "up" | "right" | "down" | "left",
  distance: number
): void {
  console.log(`Moving ${direction} by ${distance} units`);
}
move("up", 30);

// exercise 1: Narrowing
export function validateUsername(username: string | null): boolean {
  return username ? username.length > 5 : false;
}

console.log(validateUsername("Barbara"));
console.log(validateUsername("Alice"));

// exercise 2: Throwing Errors to Narrow
const appElement = document.getElementById("app");
if (!appElement) {
  throw new Error("Could not find app element.");
}
console.log(appElement);

// exercise 3: Using 'in' to Narrow
export type APIResponse = { data: { id: string } } | { error: string };

const handleResponse = (response: APIResponse): string => {
  if ("data" in response) {
    return response.data.id;
  } else {
    throw new Error(response.error);
  }
};

// exercise 1: InstanceOf
const somethingDangerous = (): string => {
  if (Math.random() > 0.5) {
    throw new Error("Something went wrong");
  }
  return "all good";
};

try {
  console.log(somethingDangerous());
} catch (error) {
  if (error instanceof Error) {
    console.error(error.message);
  } else {
    throw new Error("This is not an error");
  }
}

const error = new Error("Some error message");
console.log(error.message);

// exercise 2: Narrowing unknown to a value
export const parseValue = (value: unknown): string => {
  if (
    typeof value === "object" &&
    value !== null &&
    "data" in value &&
    typeof value.data === "object" &&
    value.data !== null &&
    "id" in value.data &&
    typeof value.data.id === "string"
  ) {
    return value.data.id;
  }
  throw new Error("Parsing error!");
};

// exercise 3: Reusable Type Guards
const hasDataId = (value: unknown): value is { data: { id: string } } => {
  return (
    typeof value === "object" &&
    value !== null &&
    "data" in value &&
    typeof value.data === "object" &&
    value.data !== null &&
    "id" in value.data &&
    typeof value.data.id === "string"
  );
};

const parseValueAgain = (value: unknown): string => {
  if (hasDataId(value)) {
    return value.data.id;
  }
  throw new Error("Parsing error!");
};

// exercise 1: Destructuring a Discriminated Union
type Circle = {
  kind: "circle";
  radius: number;
};

type Square = {
  kind: "square";
  sideLength: number;
};

type Shape = Circle | Square;

export function calculateArea(shape: Shape): number {
  if (shape.kind === "circle") {
    return Math.PI * shape.radius * shape.radius;
  } else {
    return shape.sideLength * shape.sideLength;
  }
}

// exercise 2: Narrowing a Discriminated Union with a Switch Statement
function calculateAreaSwitch(shape: Shape): number {
  switch (shape.kind) {
    case "circle":
      return Math.PI * shape.radius * shape.radius;
    case "square":
      return shape.sideLength * shape.sideLength;
  }
}

// exercise 3: Discriminated Tuples
type User = { id: string; name: string }; // Example User type
type APIResponseTuple = ["success", User[]] | ["error", string];

async function fetchData(): Promise<APIResponseTuple> {
  try {
    const response = await fetch("https://api.example.com/data");

    if (!response.ok) {
      return ["error", "An error occurred"];
    }

    const data: User[] = await response.json();
    return ["success", data];
  } catch {
    return ["error", "An error occurred"];
  }
}

// exercise 4: Handling with a Discriminated Union
export function calculateAreaDiscriminated(shape: Shape): number {
  return shape.kind === "circle"
    ? Math.PI * shape.radius * shape.radius
    : shape.sideLength * shape.sideLength;
}

// Chapter 6: Objects
//exercise 1: Create an Intersection type
type User1 = {
  name: string;
  email: string;
} & BaseEntity;

type Product = {
  name: string;
  price: number;
} & BaseEntity;
type BaseEntity = {
  id: string;
  createdAt: Date;
};

//exercise 2: Extending Interfaces
interface User2 {
  name: string;
  email: string;
}

interface Product2 {
  name: string;
  price: number;
}
interface BaseEntity2 {
  id: string;
  createdAt: Date;
}
interface User2 extends BaseEntity2 {
  name: string;
  email: string;
}
interface Product2 extends BaseEntity2 {
  name: string;
  price: number;
}
interface withId {
  id: string;
}
interface WithId {
  id: string;
}

interface WithCreatedAt {
  createdAt: Date;
}

interface User2 extends WithId, WithCreatedAt {
  name: string;
  email: string;
}

interface Product2 extends WithId, WithCreatedAt {
  name: string;
  price: number;
}

//Dynamic Object Keys
//exercise 1: Use an index Signature for Dynamic Keys
const scores: Record<"math" | "english" | "science", number> = {
  math: 95,
  english: 90,
  science: 85,
};

// //exercise 2: Default Properties With Dynamic keys
interface RequiredSubjects {
    math: number;
    english: number;
    science: number;
  }
  interface Scores extends RequiredSubjects {
    [subject: string]: number;
  }
  const subject: Scores = {
    math: 95,
    english: 90,
    science: 85, 
  };
  
  console.log(subject);
  subject.french = 75;
  subject.spanish = 70;
  
  console.log(subject);
  
//exercise 3:Restricting Objects keys with Records
type Environment = "development" | "production" | "staging";

type Configurations = Record<Environment,
{
  apiBaseUrl: string;
  timeout: number;
}>;
const configurations:Configurations = {
  development: {
    apiBaseUrl: "http://localhost:8080",
    timeout: 5000,
  },
  production: {
    apiBaseUrl: "https://api.example.com",
    timeout: 10000,
  },
  staging: {
    apiBaseUrl: "https://staging.example.com",
    timeout: 8000,
  },
  // notAllowed: {
  //   apiBaseUrl: "https://staging.example.com",
  //   timeout: 8000,
  // },
}

//exercise 4: Dynamic Key Support
export const hasKey = (obj: object, key:PropertyKey) => {
  return obj.hasOwnProperty(key);
};

//Reducing Duplication With Utility Types 
//Required
//pick
//omit
//exercise 1:Expecting Certain Properties
interface User2 {
  id: string;
  name: string;
  email: string;
  role: string;
}
interface PickedUser2 {
  name: string;
  email: string;
}
const fetchUser = async (): Promise<PickedUser2> => {
  const response = await fetch("/api/user");
  const user = await response.json();
  const pickedUser: PickedUser2 = {
    name: user.name,
    email: user.email
  };
  
  return pickedUser;
};

//exercise 2:Updating a product
interface Product6 {
  id: number;
  name: string;
  price: number;
  description: string;
}
interface productInfo{
  name?:string;
  price?:number;
}
const updateProduct = (id: number, productInfo: Partial<Omit<Product6, "id">>) => {
};

