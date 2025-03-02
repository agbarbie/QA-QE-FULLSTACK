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
export {
    Book, BooksData
}