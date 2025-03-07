import { Book, BooksData } from "./types";
const filtering= document.getElementById("search") as HTMLSelectElement;
const searchBtn = document.getElementById("searchBtn") as HTMLButtonElement;
const sortSelect = document.getElementById("sort") as HTMLSelectElement;
const sortOrderBtn = document.getElementById("sortOrderBtn") as HTMLButtonElement;
const yearFilter = document.getElementById("year") as HTMLSelectElement;
const minPages = document.getElementById("minPages") as HTMLInputElement;
const productList = document.querySelector("#product-list") as HTMLDivElement;
const selectedItems = document.getElementById('selectedItems')
let booksData: BooksData = [];
let sortAscending = true;

// Update sort button text based on current order
function updateSortButtonText() {
    if (!productList || !sortOrderBtn) {
        console.error("Products list or sort button is not available.");
        return;
    }
    
    sortOrderBtn.textContent = `Sort ${sortAscending ? '↑' : '↓'}`;
}

// Fetch books asynchronously
async function fetchProducts():Promise<void>{
  if(!productList) {
    throw new Error(`Products list not available`)
  } else {

    try {
      const response = await fetch("http://localhost:3000/books");
      booksData = await response.json();
      displayBooks(booksData);
      updateSortButtonText();
  } catch (error) {
      console.error("Error fetching books:", error);
      productList.innerHTML = `
          <div class="error-message">
              <p>Failed to load books. Please try again later.</p>
              <button onclick="fetchProducts()">Retry</button>
          </div>`;
  }

  }
    
}

// Function to display books
function displayBooks(books:BooksData):void {
    if (!productList) {
        console.error("Product list container is not available.");
        return;
    }

    productList.innerHTML = "";

    if (!books || books.length === 0) {
        productList.innerHTML = `
            <div class="no-results">
                <p>No books found. Try adjusting your filters.</p>
                <button onclick="resetFilters()">Reset Filters</button>
            </div>`;
        return;
    }

    // Proceed with rendering books if available
    books.forEach((book:Book) => {
      const productDiv = document.createElement("div");
      productDiv.classList.add("book-card");
    
      const warningMessage = book.pages > 500 
          ? `<div class="warning-badge">Long Read: ${book.pages} pages</div>` 
          : "";
    
      productDiv.innerHTML = `
          <div class="book-image">
              <img src="${book.image}" alt="${book.title}" 
                   onerror="this.src='placeholder-book.jpg'">
              ${warningMessage}
          </div>
          <div class="book-details">
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
      `;
      if (productList) {
        productList.appendChild(productDiv);
        console.log(`Debug: Book "${book.title}" added to productList.`);
    } else {
        console.error("Error: productList became null before appending.");
    }
    });
}


// Function to reset all filters
function resetFilters():void {
    filtering.value = "";
    yearFilter.value = "";
    minPages.value = "";
    sortSelect.value = "";
    sortAscending = true;
    updateSortButtonText();
    displayBooks(booksData);
}
const filterBooks = () => {
    const genre = filtering.value.trim().toLowerCase();
    const selectedYear = parseInt(yearFilter.value);
    const minPageCount = parseInt(minPages.value);
    
    let filteredBooks = [...booksData];
    
    if (genre) {
        filteredBooks = filteredBooks.filter(book => 
            book.genre.toLowerCase().includes(genre));
    }
    if (!isNaN(selectedYear)) {
        filteredBooks = filteredBooks.filter(book => book.year >= selectedYear);
    }
    if (!isNaN(minPageCount)) {
        filteredBooks = filteredBooks.filter(book => book.pages >= minPageCount);
    }
    
    const sortBy = sortSelect.value;
    if (sortBy === "year" || sortBy === "pages") {
        filteredBooks.sort((a, b) => {
            const aValue = a[sortBy];
            const bValue = b[sortBy];
            return sortAscending ? aValue - bValue : bValue - aValue;
        });
    }
    
    displayBooks(filteredBooks);
};

// Toggle sorting order
function toggleSortOrder() :void{
    sortAscending = !sortAscending;
    updateSortButtonText();
    filterBooks();
}

// Event Listeners
document.addEventListener("DOMContentLoaded", () => {
    fetchProducts();
    updateSortButtonText();
});

// Input event listeners for real-time filtering
filtering.addEventListener("input", filterBooks);
yearFilter.addEventListener("input", filterBooks);
minPages.addEventListener("input", filterBooks);

// Button event listeners
searchBtn.addEventListener("click", filterBooks);
sortSelect.addEventListener("change", filterBooks);
sortOrderBtn.addEventListener("click", toggleSortOrder);

const cartIcon = document.querySelector('.cart-icon-container');
const cartDiv = document.querySelector('.cart-div') as HTMLDivElement;
const cartOverlay = document.querySelector('.cart-overlay') as HTMLDivElement;
const closeCart = document.querySelector('.close-cart');

function toggleCart():void {
    cartDiv.classList.toggle('active');
    cartOverlay.classList.toggle('active');
}

// Cart state management
let cartItems:BooksData = [];
const cartItemsContainer = document.querySelector('.cart-items') as HTMLDivElement; 
const cartCount = document.querySelector('.cart-count') as HTMLDivElement;
const cartTotal = document.querySelector('.cart-total span:last-child') as HTMLDivElement;

// Function to add item to cart
function addToCart(id: number): void {
    const book = booksData.find(book => book.id === id);
    if (!book) return;
    
    const existingBook = cartItems.find(item => item.id === id);
  
    if (existingBook) {
      existingBook.quantity = (existingBook.quantity || 0) + 1;
    } else {
      cartItems.push({ ...book, quantity: 1 });
    }
  
    updateCartDisplay(cartItems);
  }
// Function to remove item from cart
function removeFromCart(bookId:number):void {
    cartItems = cartItems.filter(item => item.id !== bookId);
    updateCartDisplay(cartItems);
    updateCartCount();
    saveCartToLocalStorage();
}

// Function to update quantity
function updateQuantity(bookId:number, newQuantity:number) :void{
    const item = cartItems.find(item => item.id === bookId);
    if (item) {
        if (newQuantity <= 0) {
            removeFromCart(bookId);
        } else {
            item.quantity = newQuantity;
            updateCartDisplay(cartItems);
            updateCartCount();
            saveCartToLocalStorage();
        }
    }
}

// Function to update cart display
function updateCartDisplay(cartItems: BooksData):void{
    cartItemsContainer.innerHTML = '';
    let total = 0;

    cartItems.forEach(item => {
      const price = parseFloat(String(item.price).replace('$', ''));
      const itemTotal = price * item.quantity;
        total += itemTotal;

        const cartItemElement = document.createElement('div');
        cartItemElement.classList.add('cart-item');
        cartItemElement.innerHTML = `
            <div class="cart-item-content">
                <img src="${item.image}" alt="${item.title}" class="cart-item-image">
                <div class="cart-item-details">
                    <h3>${item.title}</h3>
                    <p>by ${item.author}</p>
                    <div class="cart-item-price">$${price.toFixed(2)}</div>
                </div>
            </div>
            <div class="cart-item-actions">
                <button class="quantity-btn minus" data-id="${item.id}">-</button>
                <span class="quantity">${item.quantity}</span>
                <button class="quantity-btn plus" data-id="${item.id}">+</button>
                <button class="remove-btn" data-id="${item.id}">
                    <i class="fa-solid fa-trash"></i>
                </button>
            </div>
        `;
        cartItemsContainer.appendChild(cartItemElement);
    });

    cartTotal.textContent = `$${total.toFixed(2)}`;
}

// Function to update cart count badge
function updateCartCount():void {
    const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);
    cartCount.textContent = totalItems;
}

// Local storage functions
function saveCartToLocalStorage():void{
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
}

function loadCartFromLocalStorage():void{
    const savedCart = localStorage.getItem('cartItems');
    if (savedCart) {
        cartItems = JSON.parse(savedCart);
        updateCartDisplay(cartItems);
        updateCartCount();
    }
}

// Event delegation for buy buttons
productList.addEventListener('click', (e) => {
    if (e.target.classList.contains('buy')) {
        const bookCard = e.target.closest('.book-card');
        const bookData = {
            id: Date.now(), // Using timestamp as a simple unique ID
            title: bookCard.querySelector('h2').textContent,
            author: bookCard.querySelector('.author').textContent.replace('by ', ''),
            image: bookCard.querySelector('img').src,
            price: bookCard.querySelector('.book-metadata p:last-of-type').textContent.split('Price: ')[1]
        };
        
        addToCart(bookData);
        // Removed the automatic cart opening here
    }
});

// Event delegation for cart item actions
cartItemsContainer.addEventListener('click', (e) => {
    if (e.target.classList.contains('quantity-btn')) {
        const bookId = parseInt(e.target.dataset.id);
        const item = cartItems.find(item => item.id === bookId);
        if (item) {
            if (e.target.classList.contains('plus')) {
                updateQuantity(bookId, item.quantity + 1);
            } else if (e.target.classList.contains('minus')) {
                updateQuantity(bookId, item.quantity - 1);
            }
        }
    } else if (e.target.classList.contains('remove-btn') || e.target.closest('.remove-btn')) {
        const bookId = parseInt(e.target.closest('.remove-btn').dataset.id);
        removeFromCart(bookId);
    }
});

// function toggleCart() {
//     cartDiv.classList.toggle('active');
//     cartOverlay.classList.toggle('active');
// }

cartIcon.addEventListener('click', toggleCart);
closeCart.addEventListener('click', toggleCart);
cartOverlay.addEventListener('click', toggleCart);

// Initialize cart from local storage on page load
document.addEventListener('DOMContentLoaded', () => {
    loadCartFromLocalStorage();
});

cartIcon.addEventListener('click', toggleCart);
closeCart.addEventListener('click', toggleCart);
cartOverlay.addEventListener('click', toggleCart);