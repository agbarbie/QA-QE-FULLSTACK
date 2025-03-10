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
  });