import { mailService } from "../services/mail.service.js"
import { showSuccessMsg } from "../../../services/event-bus.service.js"

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
        const { compose } = this.state
        const field = target.name
        const value = target.value

        this.setState((prevState) => ({
            compose: { ...prevState.compose, [field]: value }
        }))
    }

    onSendMail = () => {
        const { fullName, subject, textBody } = this.state.compose
        mailService.createNewMail(fullName, subject, textBody)
        showSuccessMsg('mail sent successfully')
        this.onGoBack()
    }

    render() {
        const { fullName, subject, textBody } = this.state
        const { onNewMail } = this.props

        return <React.Fragment>
            <form className="new-mail" onSubmit={this.onSendMail}  >
                <div className="up-new-mail"><span className="new-message-headline">new email</span><span onClick={() => onNewMail()} className="fa close-box icon"></span></div>
                <label htmlFor="send-mail"></label>
                <input
                    ref={this.inputRef}
                    type="text"
                    placeholder="example@gmail.com"
                    id="send-mail"
                    name="fullName"
                    onChange={this.handleChange}
                    value={fullName}
                />

                <label htmlFor="subject"></label>
                <input
                    placeholder="subject"
                    type="text"
                    id="subject"
                    name="subject"
                    value={subject}
                    onChange={this.handleChange}
                />
                <label htmlFor="textBody"></label>
                <input
                    placeholder="your message...."
                    type="text"
                    id="textBody"
                    name="textBody"
                    value={textBody}
                    onChange={this.handleChange}
                />
                <div className="flex footer-mail-compose">
                    <div>
                        <button className="send-mail-btn">Send</button>
                    </div>

                    <span onClick={() => onNewMail()} className="fa trash icon"></span>
                </div>
            </form>
        </React.Fragment>
    }
}