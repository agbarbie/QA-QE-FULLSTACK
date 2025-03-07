"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var _a;
const fetchBooks = (...args_1) => __awaiter(void 0, [...args_1], void 0, function* (params = {}) {
    try {
        const queryParams = new URLSearchParams(params).toString();
        const url = `http://localhost:3000/api/books${queryParams ? `?${queryParams}` : ""}`;
        console.log("Fetching from URL:", url);
        const response = yield fetch(url, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });
        if (!response.ok) {
            throw new Error(`Failed to fetch books: ${response.status}`);
        }
        const data = yield response.json();
        console.log("Received data:", data);
        return data;
    }
    catch (error) {
        console.error("Error fetching books:", error);
        return []; // Return empty array if fetch fails
    }
});
const displayBooks = (books) => {
    const productList = document.getElementById("product-list");
    if (!productList)
        return;
    productList.innerHTML = books
        .map((book) => `
    <div class="book-details">
    <img src=${book.image} alt=${book.title}/>
              <h2>${book.title}</h2>
              <p class="author">by ${book.author}</p>
              <span class="genre">${book.genre}</span>
              <div class="book-metadata">
                  <p><span>Published:</span> ${book.year}</p>
                  <p><span>Pages:</span> ${book.pages}</p>
                  <p><span>Publisher:</span> ${book.publisher}</p>
                  <p><span>Price:</span> ${book.price}</p>
                  <button class="buy">Buy Now</button>
              </div>
          </div>
  `)
        .join("");
};
// Fetch and display events on page load
const loadBooks = () => __awaiter(void 0, void 0, void 0, function* () {
    const events = yield fetchBooks();
    console.log(events);
    displayBooks(events);
});
// Load all events initially
loadBooks();
function handleFilter() {
    const params = {};
    const selectedGenre = document.getElementById("search").value;
    const publishYear = document.getElementById("year").value;
    const pagesNumber = document.getElementById("minPages").value;
    const sortBy = document.getElementById("sort").value;
    if (selectedGenre) {
        params.genre = selectedGenre;
    }
    if (publishYear) {
        params.year = publishYear;
    }
    if (pagesNumber) {
        params.pages = pagesNumber;
    }
    if (sortBy) {
        params.sort = sortBy;
    }
    console.log("Filter parameters:", params);
    return params;
}
(_a = document.getElementById("searchBtn")) === null || _a === void 0 ? void 0 : _a.addEventListener("click", () => __awaiter(void 0, void 0, void 0, function* () {
    const filterParams = handleFilter();
    console.log("Filter params:", filterParams); // Add this for debugging
    const filteredBooks = yield fetchBooks(filterParams);
    displayBooks(filteredBooks);
}));
//# sourceMappingURL=index.js.map