
import { booksService } from "../services/books.service.js"

export class ReviewAdd extends React.Component {
    state = {
        review: {
            fullName: '',
            rate: 1,
            date: '',
            text: '',
        },
        isSendMsg: false
    }
    inputRef = React.createRef()
    componentDidMount() {
        this.inputRef.current.focus()
    }
    saveReview = (ev) => {
        ev.preventDefault()
        const toggleSendMsg = this.state.isSendMsg ? false : true
        this.setState({ isSendMsg: toggleSendMsg })
        booksService.addReview(this.props.bookId, this.state.review)
        this.setState((prevState) => ({ ...prevState, review }), this.props.loadBook())

        this.setReview()
    }
    setReview = () => {
        this.props.setReview()

    }
    handelChange = ({ target }) => {
        const { review } = this.state
        const filed = target.name
        const value = target.value
        this.setState((prevState) => ({
            review: {
                ...prevState.review,
                [filed]: value
            }
        }))
    }

    render() {
        const classSendMsg = this.state.isSendMsg ? "send-msg" : ""
        const { fullName, rate, date, text } = this.state.review

        return <section className="review-add">
            <h1>Enter Review </h1>
            <form className="review-form " >

                <label htmlFor="name" >Full Name: </label>
                <input type="text" ref={this.inputRef} name="fullName" value={fullName} id="name" onChange={this.handelChange} />

                <label className="rating-label">
                    <input
                        className="rating rating--nojs"
                        max="5"
                        step="1"
                        name="rate"
                        type="range"
                        value={rate}
                        onChange={this.handelChange}
                    />
                </label>


                <label htmlFor="date" >Date: </label>
                <input type="date" name="date" value={date} id="date" onChange={this.handelChange} />

                <label htmlFor="text" >Date: </label>
                <input className="input-area" type="textarea" name="text" value={text} id="text" onChange={this.handelChange} />
                <button onClick={this.saveReview}> send!</button>
                <div className={classSendMsg}> send!</div>
            </form>
        </section>
    }
}


