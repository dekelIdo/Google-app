


export function ShowReviews({ book }) {
    if (!book.review) return <h1> No review for display.</h1>
    return <div>{book.review.map(review => {
        return <div className="modal-reviews" key={review.id}>

            <h1>Name:{review.fullName}</h1>
            <h1>Rate:{starCounter(review.rate)}</h1>
            <h1>date:{review.date}</h1>
            <h1>{review.text}</h1>
        </div>

    })} </div>
}

function starCounter(rate) {
    switch (rate) {
        case  '1':
            return '⭐'
            break;
        case '2':
            return '⭐⭐'
            break;
        case '3':
            return '⭐⭐⭐'
            break;
        case '4':
            return '⭐⭐⭐⭐'
            break;
        case '5':
            return '⭐⭐⭐⭐⭐'
            break;
        case '0':
            return 'els'
            break;
            default: '😀'
            break;
    }

}