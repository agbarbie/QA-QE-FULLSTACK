<<<<<<< HEAD
type IngredientType = {
    name:string;
    instructions:string;
}
type Recipe = {
    title: string;
    ingredients: Array<object>;
    instructions: string;
  };
  
  const processRecipe = (recipe: Recipe) => {
    // Do something with the recipe in here
  };
  
  processRecipe({
    title: "Chocolate Chip Cookies",
    ingredients: [
      { name: "Flour", quantity: "2 cups" },
      { name: "Sugar", quantity: "1 cup" },
    ],
    instructions: "...",
=======
type IngredientType = {
    name:string;
    instructions:string;
}
type Recipe = {
    title: string;
    ingredients: Array<object>;
    instructions: string;
  };
  
  const processRecipe = (recipe: Recipe) => {
    // Do something with the recipe in here
  };
  
  processRecipe({
    title: "Chocolate Chip Cookies",
    ingredients: [
      { name: "Flour", quantity: "2 cups" },
      { name: "Sugar", quantity: "1 cup" },
    ],
    instructions: "...",
>>>>>>> 41d7ab369c9e98849911c632695ea5c1838075e5
  });