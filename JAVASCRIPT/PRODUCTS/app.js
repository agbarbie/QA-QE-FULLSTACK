<<<<<<< HEAD
document.addEventListener("DOMContentLoaded", () => {
    fetch("http://localhost:3000/products")
        .then(response => response.json())
        .then(products => {
            const productList = document.getElementById("product-list");

            products.forEach(product => {
                const productDiv = document.createElement("div");
                productDiv.classList.add("product");

                productDiv.innerHTML = `
                    <h2>${product.name}</h2>
                    <p id="Category"><strong>Category:</strong> ${product.category}</p>
                    <p id="Description">${product.description}</p>
                    <p id="price"><strong>Price:</strong> Ksh ${product.price}</p>
                    <button id="btn"><strong>Stock:</strong> ${product.stock}</p>
                `;
                productList.appendChild(productDiv);
            });
        })
        .catch(error => console.error("Error fetching products:", error));
});

=======
document.addEventListener("DOMContentLoaded", () => {
    fetch("http://localhost:3000/products")
        .then(response => response.json())
        .then(products => {
            const productList = document.getElementById("product-list");

            products.forEach(product => {
                const productDiv = document.createElement("div");
                productDiv.classList.add("product");

                productDiv.innerHTML = `
                    <h2>${product.name}</h2>
                    <p id="Category"><strong>Category:</strong> ${product.category}</p>
                    <p id="Description">${product.description}</p>
                    <p id="price"><strong>Price:</strong> Ksh ${product.price}</p>
                    <button id="btn"><strong>Stock:</strong> ${product.stock}</p>
                `;
                productList.appendChild(productDiv);
            });
        })
        .catch(error => console.error("Error fetching products:", error));
});

>>>>>>> 41d7ab369c9e98849911c632695ea5c1838075e5
