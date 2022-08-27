// import { BookPreview } from '../cmps/user-preview.jsx'
import { booksService } from "../services/books.service.js";
import { BookList } from "../cmps/book-list.jsx";
import { BookFilter } from "../cmps/book-filter.jsx"

export class BookApp extends React.Component {
    state = {
        books: [],
        filterBy: null,
    }

    componentDidMount() {
        this.loadbooks()

    }

    loadbooks = () => {
        const { filterBy } = this.state
        booksService.query(filterBy)
            .then((books) => this.setState({ books }))
    }

    onSetFilter = (filterBy) => {
        this.setState({ filterBy }, () => {
            this.loadbooks()
        })
    }

    render() {

        const { books} = this.state

        return (
            <section>
                {<BookFilter filterBy={this.state.filterBy} onSetFilter={this.onSetFilter} />}
                
                { <BookList  books={books} />}
            </section>
        )
    }
}