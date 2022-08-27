import { booksService } from "../services/books.service.js"
import { showSuccessMsg,showErrorMsg } from "../services/event-bus.service.js"
import { UserMsg } from '../cmps/user-msg.jsx'

export class BookAdd extends React.Component {

    state = {
        name: '',
        options: [

        ]



    }
    inputRef = React.createRef()

    componentDidMount() {

    }
    handleNameChange = ({ target: { value } }) => {
        this.setState((prevState) => ({ ...prevState, name: value }))

    }
    getOptions = (ev) => {
        ev.preventDefault()
        const { name } = this.state
        booksService.getGoogleBook(name)
        .then((res) => {
            this.setState((prevState) => ({ ...prevState, options: res }))
        })

        console.log(this.state);
    }

    onAddBook = (book) => {
        booksService.addBook(book)
        .then(()=>{showSuccessMsg('Book Add')})
        .catch(()=>{showErrorMsg('Book is already exist')})
        }


    render() {
        console.log(this.state);

        const { name, options } = this.state

        return <React.Fragment>

            <form className="book-add" onSubmit={this.getOptions}>
                <label htmlFor="book-google">  search:    </label>
                <input
                    ref={this.inputRef}
                    type="search"
                    placeholder="search by book name..."
                    id="book-google"
                    name="name"
                    value={name}
                    onChange={this.handleNameChange}
                />
                <button>Search</button>
            </form>
            {options && <div className="books-options">
                <ul>
                    {options.map(book => {
                        return <li key={book.id}> {book.volumeInfo.title} <button onClick={() => this.onAddBook(book)} >'➕'</button></li>
                    })}
                </ul>

            </div>}
            <UserMsg  />
        </React.Fragment>

    }
}