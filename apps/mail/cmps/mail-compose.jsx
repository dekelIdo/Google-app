
export class MailCompose extends React.Component {
    inputRef = React.createRef()
    state = {
        compose: {
            fullName: '',
            subject: '',
            textBody: '',
        }
    }

    handleChange = ({ target }) => {
        const {compose} = this.state
        const field = target.name
        const value = target.value

        this.setState((prevState) => ({
           compose: { ...prevState.compose, [field]: value }
        }))

    }

    onSendMail = () => {

    }

    // handleNameChange = ({ target: { value } }) => {
    //     this.setState((prevState) => ({ ...prevState, name: value }))
    // }



    render() {
        const { fullName, subject, textBody } = this.state
        // onSubmit={this.onSendMail}
        return <React.Fragment>
            <form className="book-add"   >
                <label htmlFor="send-mail">  to </label>
                <input
                    ref={this.inputRef}
                    type="text"
                    placeholder="example@gmail.com"
                    id="send-mail"
                    name="fullName"
                    onChange={this.handleChange}
                    value={fullName}
                />

                <label htmlFor="subject">name:</label>
                <input
                    placeholder="subject"
                    type="text"
                    id="subject"
                    name="subject"
                    value={subject}
                    onChange={this.handleChange}
                />
                <label htmlFor="textBody">name:</label>
                <input
                    placeholder="your message...."
                    type="text"
                    id="textBody"
                    name="textBody"
                    value={textBody}
                    onChange={this.handleChange}
                />
                <button>Send</button>
            </form>
        </React.Fragment>
    }
}