const { Link } = ReactRouterDOM

import { LongTxt } from '../cmps/book-description.jsx'
import { booksService } from '../services/books.service.js'
import { ReviewAdd } from '../cmps/review-add.jsx'
import { ShowReviews } from '../cmps/book-reviews.jsx'
export class BookDetails extends React.Component {

    state = {

        isLongTxtShown: true,
        addReview: false
    }
    setReview = () => {
        const addReviews = this.state.addReview ? false : true
        this.setState({ addReview: addReviews })
    }
    componentDidMount() {
        this.loadBook()

    }
    componentDidUpdate(prevProps) {
        if (prevProps.match.params.bookId !== this.props.match.params.bookId)
            this.loadBook()
    }
    loadBook = () => {
        const { bookId } = this.props.match.params
        booksService.findBookById(bookId).then(book => {
            if (!book) return this.onGoBack()
            this.setState(({ book }),)
            console.log('book', book)

        })
    }
    setBookDescription = () => {
        const { description } = this.state.book
        const descriptionLength = description.split('').length
        this.setState({ isLongTxtShown: descriptionLength > 100 ? true : false })
    }
    toggleBookDescription = () => {
        const { isLongTxtShown } = this.state
        this.setState({ isLongTxtShown: isLongTxtShown ? false : true })

    }
    onGoBack = () => {
        this.props.history.push('/book')
    }

    render() {

        const { book } = this.state
        if (!this.state.book) return <span></span>
        const { description } = this.state.book
        const nextBook = booksService.getNextPageIdx(this.state.book.id)
        const prevBook = booksService.getPrevPageIdx(this.state.book.id)


        console.log(book.review);
        return <section className="book-details">
            {!book && <p>🔃</p>}
            {book && <React.Fragment>
                <div className="container-text">
                    <h2>{book.title} </h2>
                    <h1>{book.subtitle} </h1>
                    <h3>{book.authors} </h3>
                    <h2>{publishedDate(book.publishedDate)} </h2>
                    <LongTxt toggle={this.toggleBookDescription} bookDescription={description} isLongTxtShown={this.state.isLongTxtShown} />
                    <p>Language: {book.language}</p>
                    <p>Pages: {pageCount(book.pageCount)} </p>
                    <p className={`price ${priceClass(book.listPrice.amount)}`} >Price: {book.listPrice.amount}  {currrencyIcon(book.listPrice.currencyCode)}</p>
                    <div className="btn-container">
                    <Link to={`/book/${prevBook}`}><button> Prev Book </button></Link>
                    <button onClick={this.onGoBack}> back </button>
                    <Link to={`/book/${nextBook}`}><button> Next Book </button></Link>
                    </div>

                </div>

                <div className="container-img-details">
                    <img src={`${book.thumbnail}`} />
                    {book.listPrice.isOnSale && <img className="slae-img" src="./assets/img/sale.png" />}
                    <div className="review-add">
                        {!this.state.addReview && <button onClick={this.setReview}> Add review!</button>}
                    </div>
                    <ShowReviews book={book} />
                    {this.state.addReview &&
                        <div className="modal-Review">
                            <ReviewAdd loadBook={this.loadBook} setReview={this.setReview} bookId={book.id} />
                        </div>}
                </div>

            </React.Fragment>}
        </section>
    }


}


function priceClass(price) {
    if (price > 150) return 'red'
    else if (price < 20) return 'green'
}

function publishedDate(date) {
    const currDate = new Date()
    const currYear = currDate.getFullYear()
    if (currYear - date > 10) return ' Veteran Book'
    else if (currYear - date < 10) return 'New!'
}

function pageCount(pages) {
    switch (true) {
        case pages > 500:
            return 'Long reading'
        case pages > 100:
            return 'Decent Reading'
        case pages < 100:
            return 'Light Reading'

    }
}

function currrencyIcon(icon) {

    switch (icon) {
        case 'EUR':
            return '€'
        case 'ILS':
            return '₪'
        case 'USD':
            return '$'

    }
}