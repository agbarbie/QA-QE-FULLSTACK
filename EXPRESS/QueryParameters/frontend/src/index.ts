type Book={
  id: number;
  title: string;
  author: string;
  genre: string;
  year: number;
  pages: number;
  publisher: string;
  price: string;
  image: string;
  quantity?:number;
}
type BooksData = Book[]

const fetchBooks = async (params: Record<string, string> = {}): Promise<Book[]> => {
  try {
    const queryParams = new URLSearchParams(params).toString();
    const url = `http://localhost:3000/api/books${queryParams ? `?${queryParams}` : ""}`;
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
  `
    )
    .join("");
};

// Fetch and display events on page load
const loadBooks = async () => {
  const events = await fetchBooks(); 
  console.log(events);
  displayBooks(events);
};

// Load all events initially
loadBooks();
function handleFilter(): Record<string, string> {
  const params: Record<string, string> = {};
  const selectedGenre = (document.getElementById("search") as HTMLInputElement).value;
  const publishYear = (document.getElementById("year") as HTMLInputElement).value;
  const pagesNumber = (document.getElementById("minPages") as HTMLInputElement).value;
  const sortBy = (document.getElementById("sort") as HTMLInputElement).value;
  
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

document.getElementById("searchBtn")?.addEventListener("click", async () => {
  const filterParams = handleFilter();
  console.log("Filter params:", filterParams); // Add this for debugging
  const filteredBooks = await fetchBooks(filterParams);
  displayBooks(filteredBooks);
});
