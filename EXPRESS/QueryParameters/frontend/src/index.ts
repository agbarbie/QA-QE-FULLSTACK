type Book = {
  id: number;
  title: string;
  author: string;
  genre: string;
  year: number;
  pages: number;
  publisher: string;
  price: string;
  image: string;
  quantity?: number;
}

type BooksData = Book[]

// Define cart type
type CartItem = Book & { quantity: number };

// Initialize cart state
let cartItems: CartItem[] = [];
let isCartOpen = false;
let currentEditingBook: Book | null = null;

const fetchBooks = async (params: Record<string, string> = {}): Promise<Book[]> => {
  try {
    const queryParams = new URLSearchParams(params).toString();
    const url = `http://localhost:4000/api/books${queryParams ? `?${queryParams}` : ""}`;
    console.log("Fetching from URL:", url);
    
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    
    if (!response.ok) {
      throw new Error(`Failed to fetch books: ${response.status}`);
    }
    const data = await response.json();
    
    console.log("Received data:", data);
    return data;
  } catch (error) {
    console.error("Error fetching books:", error);
    return []; // Return empty array if fetch fails
  }
};

const displayBooks = (books: Book[]) => {
  const productList = document.getElementById("product-list");
  if (!productList) return;

  productList.innerHTML = books
    .map(
      (book) => `
   <div class="book-card" data-id="${book.id}">
  <div class="book-image-container">
    <img src="${book.image}" alt="${book.title}" />
    <div class="book-actions">
      <button class="edit-book" data-id="${book.id}" title="Edit Book">
        <i class="fas fa-edit"></i> Edit
      </button>
      <button class="delete-book" data-id="${book.id}" title="Delete Book">
        <i class="fas fa-trash"></i> Delete
      </button>
    </div>
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
      <button class="buy" data-id="${book.id}">Buy Now</button>
    </div>
  </div>
</div>
  `
    )
    .join("");
    
  // Add event listeners to buttons after displaying books
  addBuyButtonListeners(books);
  addEditButtonListeners(books);
  addDeleteButtonListeners(books);
};

// Add event listener for buy buttons
const addBuyButtonListeners = (books: Book[]) => {
  const buyButtons = document.querySelectorAll('.buy');
  buyButtons.forEach((button) => {
    button.addEventListener('click', () => {
      const bookId = Number((button as HTMLElement).getAttribute('data-id'));
      // Find the book by ID instead of index
      const bookIndex = books.findIndex(book => book.id === bookId);
      if (bookIndex !== -1) {
        addToCart(books[bookIndex]);
      }
    });
  });
};

// Add event listeners for edit buttons
const addEditButtonListeners = (books: Book[]) => {
  const editButtons = document.querySelectorAll('.edit-book');
  editButtons.forEach((button) => {
    button.addEventListener('click', (e) => {
      e.stopPropagation(); // Prevent event bubbling
      const bookId = Number((button as HTMLElement).getAttribute('data-id'));
      const book = books.find(book => book.id === bookId);
      if (book) {
        openEditForm(book);
      }
    });
  });
};

// Add event listeners for delete buttons
const addDeleteButtonListeners = (books: Book[]) => {
  const deleteButtons = document.querySelectorAll('.delete-book');
  deleteButtons.forEach((button) => {
    button.addEventListener('click', (e) => {
      e.stopPropagation(); // Prevent event bubbling
      const bookId = Number((button as HTMLElement).getAttribute('data-id'));
      if (confirm('Are you sure you want to delete this book?')) {
        deleteBook(bookId);
      }
    });
  });
};

// Function to delete a book
const deleteBook = async (bookId: number) => {
  try {
    const response = await fetch(`http://localhost:4000/api/books/${bookId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to delete book: ${response.status}`);
    }

    // Reload books after successful deletion
    showToast('Book deleted successfully!');
    loadBooks();
  } catch (error) {
    console.error('Error deleting book:', error);
    showToast('Failed to delete book. Please try again.');
  }
};

// Function to open the edit form and populate it with book data
const openEditForm = (book: Book) => {
  currentEditingBook = book;
  
  // Get the edit form
  const editForm = document.getElementById('edit-book-form') as HTMLFormElement;
  const editFormContainer = document.getElementById('edit-form-container') as HTMLElement;
  
  if (!editForm || !editFormContainer) {
    console.error('Edit form elements not found');
    return;
  }
  
  // Populate form fields with book data
  const titleInput = editForm.querySelector('#edit-title') as HTMLInputElement;
  const authorInput = editForm.querySelector('#edit-author') as HTMLInputElement;
  const genreInput = editForm.querySelector('#edit-genre') as HTMLInputElement;
  const yearInput = editForm.querySelector('#edit-year') as HTMLInputElement;
  const pagesInput = editForm.querySelector('#edit-pages') as HTMLInputElement;
  const publisherInput = editForm.querySelector('#edit-publisher') as HTMLInputElement;
  const priceInput = editForm.querySelector('#edit-price') as HTMLInputElement;
  const imageInput = editForm.querySelector('#edit-image') as HTMLInputElement;
  
  if (titleInput) titleInput.value = book.title;
  if (authorInput) authorInput.value = book.author;
  if (genreInput) genreInput.value = book.genre;
  if (yearInput) yearInput.value = book.year.toString();
  if (pagesInput) pagesInput.value = book.pages.toString();
  if (publisherInput) publisherInput.value = book.publisher;
  if (priceInput) priceInput.value = book.price;
  if (imageInput) imageInput.value = book.image;
  
  // Show the form
  editFormContainer.style.display = 'flex';
};

// Function to close the edit form
const closeEditForm = () => {
  const editFormContainer = document.getElementById('edit-form-container') as HTMLElement;
  if (editFormContainer) {
    editFormContainer.style.display = 'none';
  }
  currentEditingBook = null;
};

// Function to handle book update
const updateBook = async (formData: FormData) => {
  if (!currentEditingBook) {
    console.error('No book selected for editing');
    return;
  }
  
  try {
    const updatedBook = {
      id: currentEditingBook.id,
      title: formData.get('title') as string,
      author: formData.get('author') as string,
      genre: formData.get('genre') as string,
      year: parseInt(formData.get('year') as string),
      pages: parseInt(formData.get('pages') as string),
      publisher: formData.get('publisher') as string,
      price: formData.get('price') as string,
      image: formData.get('image') as string,
    };
    
    const response = await fetch(`http://localhost:4000/api/books/${currentEditingBook.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedBook),
    });
    
    if (!response.ok) {
      throw new Error(`Failed to update book: ${response.status}`);
    }
    
    // Close form and reload books after successful update
    closeEditForm();
    showToast('Book updated successfully!');
    loadBooks();
  } catch (error) {
    console.error('Error updating book:', error);
    showToast('Failed to update book. Please try again.');
  }
};

// Function to add a book to cart
const addToCart = (selectedBook: Book) => {
  try {
    if (!selectedBook) {
      console.error("Book not found");
      return;
    }

    // Check if the item already exists in the cart
    const existingItemIndex = cartItems.findIndex(item => item.id === selectedBook.id);

    if (existingItemIndex > -1) {
      // Increment quantity if the book is already in the cart
      cartItems[existingItemIndex].quantity += 1;
    } else {
      // Add the book to the cart with a quantity of 1
      cartItems.push({
        ...selectedBook,
        quantity: 1,
      });
    }

    console.log("Cart updated:", cartItems);

    // Update the cart UI
    updateCartCount();
    updateCartItems();

    // Show a confirmation message to the user
    showToast(`${selectedBook.title} added to cart!`);

    // Optionally open the cart
    openCart();
  } catch (error) {
    console.error("Error adding to cart:", error);
  }
};

// Function to update the cart count display
const updateCartCount = () => {
  const cartCount = document.querySelector('.cart-count');
  if (cartCount) {
    const totalItems = cartItems.reduce((total, item) => total + (item.quantity || 0), 0);
    cartCount.textContent = totalItems.toString();
    console.log("Updated cart count:", totalItems);
  } else {
    console.warn("Cart count element not found");
  }
};

// Function to update the cart items display
const updateCartItems = () => {
  const cartItemsContainer = document.querySelector('.cart-items');

  if (!cartItemsContainer) {
    console.error("Cart container not found!");
    return;
  }

  console.log("Updating cart items, current items:", cartItems);

  if (!Array.isArray(cartItems) || cartItems.length === 0) {
    cartItemsContainer.innerHTML = '<p class="empty-cart">Your cart is empty</p>';
    updateCartTotal(0);
    return;
  }

  let totalPrice = 0;

  cartItemsContainer.innerHTML = cartItems
    .map(item => {
      // Check if the item is valid
      if (!item || !item.id || !item.title || !item.author) {
        console.error("Invalid item in cart:", item);
        return '';
      }

      if (!item.price) {
        console.error("Item price is missing", item);
        return '';
      }

      // Parse the price string to get a number
      const priceValue = parseFloat(item.price.replace(/[^0-9.]/g, ''));
      const itemTotal = priceValue * (item.quantity || 1);
      totalPrice += itemTotal;

      return `
        <div class="cart-item" data-id="${item.id}">
          <div class="cart-item-info">
            <h3>${item.title}</h3>
            <p>by ${item.author}</p>
            <p>Price: ${item.price}</p>
          </div>
          <div class="cart-item-actions">
            <div class="quantity-controls">
              <button class="decrease-quantity">-</button>
              <span class="item-quantity">${item.quantity}</span>
              <button class="increase-quantity">+</button>
            </div>
            <button class="remove-item">Remove</button>
          </div>
        </div>
      `;
    })
    .join('');

  console.log("Cart HTML updated");

  // Reattach event listeners for cart item buttons
  addCartItemEventListeners();

  // Update the cart total price
  updateCartTotal(totalPrice);
};

// Function to add event listeners to cart item buttons
const addCartItemEventListeners = () => {
  console.log("Adding cart item event listeners");

  // Increase quantity buttons
  document.querySelectorAll('.increase-quantity').forEach(button => {
    button.addEventListener('click', (e) => {
      const cartItem = (e.target as HTMLElement).closest('.cart-item');
      if (cartItem) {
        const itemId = Number(cartItem.getAttribute('data-id'));
        increaseQuantity(itemId);
      }
    });
  });

  // Decrease quantity buttons
  document.querySelectorAll('.decrease-quantity').forEach(button => {
    button.addEventListener('click', (e) => {
      const cartItem = (e.target as HTMLElement).closest('.cart-item');
      if (cartItem) {
        const itemId = Number(cartItem.getAttribute('data-id'));
        decreaseQuantity(itemId);
      }
    });
  });

  // Remove item buttons
  document.querySelectorAll('.remove-item').forEach(button => {
    button.addEventListener('click', (e) => {
      const cartItem = (e.target as HTMLElement).closest('.cart-item');
      if (cartItem) {
        const itemId = Number(cartItem.getAttribute('data-id'));
        removeFromCart(itemId);
      }
    });
  });
};

// Function to increase item quantity
const increaseQuantity = (itemId: number) => {
  console.log("Increasing quantity for item:", itemId);
  const itemIndex = cartItems.findIndex(item => item.id === itemId);
  if (itemIndex > -1) {
    cartItems[itemIndex].quantity += 1;
    updateCartItems();
    updateCartCount();
  }
};

// Function to decrease item quantity
const decreaseQuantity = (itemId: number) => {
  console.log("Decreasing quantity for item:", itemId);
  const itemIndex = cartItems.findIndex(item => item.id === itemId);
  if (itemIndex > -1) {
    if (cartItems[itemIndex].quantity > 1) {
      cartItems[itemIndex].quantity -= 1;
    } else {
      // Remove the item if the quantity would be 0
      cartItems.splice(itemIndex, 1);
    }
    updateCartItems();
    updateCartCount();
  }
};

// Function to remove an item from the cart
const removeFromCart = (itemId: number) => {
  console.log("Removing item from cart:", itemId);
  cartItems = cartItems.filter(item => item.id !== itemId);
  updateCartItems();
  updateCartCount();
};

// Function to update the cart total price
const updateCartTotal = (total: number) => {
  const cartTotal = document.querySelector('.cart-total span:last-child');
  if (cartTotal) {
    cartTotal.textContent = `$${total.toFixed(2)}`;
    console.log("Updated cart total:", total);
  } else {
    console.warn("Cart total element not found");
  }
};

// Function to show a toast notification
const showToast = (message: string) => {
  // Create toast element if it doesn't exist
  let toast = document.querySelector('.toast-notification');
  if (!toast) {
    toast = document.createElement('div');
    toast.className = 'toast-notification';
    document.body.appendChild(toast);
  }
  
  // Set message and show toast
  toast.textContent = message;
  toast.classList.add('show');
  
  // Hide toast after 3 seconds
  setTimeout(() => {
    toast.classList.remove('show');
  }, 3000);
};

// Function to open cart
const openCart = () => {
  const cartDiv = document.querySelector('.cart-div');
  const cartOverlay = document.querySelector('.cart-overlay');
  
  if (cartDiv && cartOverlay) {
    cartDiv.classList.add('open');
    cartOverlay.classList.add('show');
    isCartOpen = true;
    console.log("Cart opened");
  } else {
    console.warn("Cart elements not found");
  }
};

// Function to close cart
const closeCart = () => {
  const cartDiv = document.querySelector('.cart-div');
  const cartOverlay = document.querySelector('.cart-overlay');
  
  if (cartDiv && cartOverlay) {
    cartDiv.classList.remove('open');
    cartOverlay.classList.remove('show');
    isCartOpen = false;
    console.log("Cart closed");
  }
};

function handleFilter(): Record<string, string> {
  const params: Record<string, string> = {};
  const selectedGenre = (document.getElementById("search") as HTMLInputElement)?.value;
  const publishYear = (document.getElementById("year") as HTMLInputElement)?.value;
  const pagesNumber = (document.getElementById("minPages") as HTMLInputElement)?.value;
  const sortBy = (document.getElementById("sort") as HTMLInputElement)?.value;
  
  if(selectedGenre) {
    params.genre = selectedGenre;
  }
  if(publishYear) {
    params.year = publishYear;
  }
  if(pagesNumber) {
    params.pages = pagesNumber;
  }
  if(sortBy) {
    params.sort = sortBy;
  }
  
  console.log("Filter parameters:", params);
  return params;
}

// Fetch and display books on page load
const loadBooks = async () => {
  const books = await fetchBooks();
  console.log("Loaded books:", books);
  displayBooks(books);
};

// Initialize the cart and event listeners when the page loads
document.addEventListener('DOMContentLoaded', () => {
  console.log("DOM loaded, initializing cart");
  
  // Create edit form if it doesn't exist
  createEditFormIfNeeded();
  
  // Initialize empty cart
  updateCartItems();
  updateCartCount();
  
  // Load all books initially
  loadBooks();
  
  // Set up cart toggle functionality
  document.querySelector('.cart-icon-container')?.addEventListener('click', () => {
    if (isCartOpen) {
      closeCart();
    } else {
      openCart();
    }
  });
  
  // Close cart button event
  document.querySelector('.close-cart')?.addEventListener('click', closeCart);
  
  // Cart overlay click to close cart
  document.querySelector('.cart-overlay')?.addEventListener('click', closeCart);
  
  // Checkout button event
  document.querySelector('.checkout-btn')?.addEventListener('click', () => {
    if (cartItems.length === 0) {
      showToast('Your cart is empty!');
      return;
    }
    
    // In a real application, this would redirect to checkout page
    showToast('Proceeding to checkout...');
    
    // For demo purposes, just clear the cart
    setTimeout(() => {
      cartItems = [];
      updateCartItems();
      updateCartCount();
      closeCart();
      showToast('Thank you for your purchase!');
    }, 1500);
  });
  
  // Search button event
  document.getElementById("searchBtn")?.addEventListener("click", async () => {
    const filterParams = handleFilter();
    console.log("Filter params:", filterParams);
    const filteredBooks = await fetchBooks(filterParams);
    displayBooks(filteredBooks);
  });
  
  // Set up event listeners for the edit form
  document.getElementById('edit-book-form')?.addEventListener('submit', (e) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);
    updateBook(formData);
  });
  
  // Close form button event
  document.getElementById('cancel-edit')?.addEventListener('click', () => {
    closeEditForm();
  });
});

// Function to create the edit form if it doesn't exist
const createEditFormIfNeeded = () => {
  if (!document.getElementById('edit-form-container')) {
    // Create the form container
    const formContainer = document.createElement('div');
    formContainer.id = 'edit-form-container';
    formContainer.className = 'modal-container';
    formContainer.style.display = 'none';
    
    formContainer.innerHTML = `
      <div class="modal-content">
        <h2>Edit Book</h2>
        <form id="edit-book-form">
          <div class="form-group">
            <label for="edit-title">Title:</label>
            <input type="text" id="edit-title" name="title" required>
          </div>
          <div class="form-group">
            <label for="edit-author">Author:</label>
            <input type="text" id="edit-author" name="author" required>
          </div>
          <div class="form-group">
            <label for="edit-genre">Genre:</label>
            <input type="text" id="edit-genre" name="genre" required>
          </div>
          <div class="form-group">
            <label for="edit-year">Year:</label>
            <input type="number" id="edit-year" name="year" required>
          </div>
          <div class="form-group">
            <label for="edit-pages">Pages:</label>
            <input type="number" id="edit-pages" name="pages" required>
          </div>
          <div class="form-group">
            <label for="edit-publisher">Publisher:</label>
            <input type="text" id="edit-publisher" name="publisher" required>
          </div>
          <div class="form-group">
            <label for="edit-price">Price:</label>
            <input type="text" id="edit-price" name="price" required>
          </div>
          <div class="form-group">
            <label for="edit-image">Image URL:</label>
            <input type="text" id="edit-image" name="image" required>
          </div>
          <div class="form-actions">
            <button type="submit">Update Book</button>
            <button type="button" id="cancel-edit">Cancel</button>
          </div>
        </form>
      </div>
    `;
    
    document.body.appendChild(formContainer);
  }
};

document.addEventListener("DOMContentLoaded", () => {
  const formContainer = document.getElementById("post-form-container") as HTMLDivElement;
  const form = document.getElementById("post-form") as HTMLFormElement;
  const toggleButton = document.getElementById("toggle-form-button") as HTMLButtonElement;

  // Toggle form visibility
  toggleButton.addEventListener("click", () => {
    form.style.display = form.style.display === "none" || form.style.display === "" ? "block" : "none";
  });

  // Handle form submission
  form.addEventListener("submit", async (event) => {
    event.preventDefault();

    // Get form data
    const formData = new FormData(form);
    const bookData: Record<string, string | number> = {};

    // Convert formData to object
    formData.forEach((value, key) => {
      if (key === "id" || key === "year" || key === "pages" || key === "price") {
        bookData[key] = Number(value);
      } else {
        bookData[key] = value.toString();
      }
    });

    try {
      const response = await fetch("/api/books", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(bookData),
      });

      const result = await response.json();

      if (response.ok) {
        alert("✅ Book successfully added!");
        form.reset(); // Clear the form
      } else {
        alert(`❌ Error: ${result.message}`);
      }
    } catch (error) {
      console.error("Error submitting book:", error);
      alert("❌ Internal server error.");
    }
  });
});
document.addEventListener("DOMContentLoaded", () => {
  const isLoggedIn = localStorage.getItem("isLoggedIn");

  if (!isLoggedIn) {
    // Redirect to login page if not logged in
    window.location.href = "login.html";
  }

  // Logout button functionality
  const logoutButton = document.getElementById("logout-button") as HTMLButtonElement;
  if (logoutButton) {
    logoutButton.addEventListener("click", () => {
      localStorage.removeItem("isLoggedIn");
      localStorage.removeItem("userEmail");
      window.location.href = "login.html";
    });
  }
});
document.addEventListener("DOMContentLoaded", () => {
  const isLoggedIn = localStorage.getItem("isLoggedIn");

  if (!isLoggedIn) {
    // Redirect to login page if not logged in
    window.location.href = "login.html";
  }

  // Logout button functionality
  const logoutButton = document.getElementById("logout-button") as HTMLButtonElement;
  if (logoutButton) {
    logoutButton.addEventListener("click", () => {
      localStorage.removeItem("isLoggedIn");
      localStorage.removeItem("userEmail");
      window.location.href = "login.html";
    });
  }
});