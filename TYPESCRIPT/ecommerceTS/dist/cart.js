import { products } from "./types";
let cart = [];
export function addToCart(id) {
    const product = products.find((p) => p.id === id);
    if (product) {
        cart.push(product);
        console.log(`Added ${product.name} to cart.`);
    }
}
//# sourceMappingURL=cart.js.map