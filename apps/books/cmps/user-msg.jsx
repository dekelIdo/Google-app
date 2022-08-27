import { eventBusService } from "../services/event-bus.service.js";
import { booksService } from "../services/books.service.js";
const { Link } = ReactRouterDOM

export class UserMsg extends React.Component {
  unsubscribe
  state = {
    msg: null
  }

  componentDidMount() {
    this.unsubscribe = eventBusService.on('show-user-msg', (msg) => {
      this.setState({ msg })
      setTimeout(this.closeMsg, 3000)
    })
  }

  componentWillUnmount() {
    this.unsubscribe()
  }

  closeMsg = () => {
    this.setState({ msg: null })
  }
  getBooksFromLocalStoreage() {
     const books= booksService.getBooks()
     return books[0].id
  }
  render() {
    const { msg } = this.state
    const { closeMsg } = this
const bookId=this.getBooksFromLocalStoreage()
    if (!msg) return <span></span>
    return <Link to={`/book/${bookId}`}>
      <section className={'user-msg ' + msg.type}>
        <button onClick={closeMsg}>x</button>
        {msg.txt}
      </section>
    </Link>

  }
}
