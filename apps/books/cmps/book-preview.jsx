
const { Link } = ReactRouterDOM

export function BookPreview({ book }) {
    
    console.log('book',book)
    return <Link to={`/book/${book.id}`}>
        <section className="book-preview">

            <h2> {book.title}</h2>
            <div className="container-img">
                <img src={`${book.thumbnail}`} />
            </div>
            <h3>Authors: {book.authors}</h3>
            <h3>Price: {book.listPrice.amount}  {_currrencyIcon(book.listPrice.currencyCode)}</h3>

        </section>
    </Link>
}


function _currrencyIcon(icon) {

    switch (icon) {
        case 'EUR':
            return '€'
        case 'ILS':
            return '₪'
        case 'USD':
            return '$'

    }
}