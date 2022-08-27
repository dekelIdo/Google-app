import { BookPreview } from "./book-preview.jsx"


export function BookList({ books }) {
    return <div className="books-list">
        {books.map(book => {
            
            return <BookPreview
                key={book.id}
                book={book}
              />

        })}
    </div>
}