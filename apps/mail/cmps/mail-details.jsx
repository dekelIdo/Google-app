import { mailService } from "../services/mail.service.js"

export class MailDetails extends React.Component {

    state = {
        email:null

    }

    componentDidMount() {
        this.loadMail()
    }

    loadMail = () => {

        const { bookId } = this.props.match.params
        mailService.findEmailById(bookId).then((email) => {
            // if (!email) return this.onGoBack()
            this.setState({ email })
        })
    }

    onGoBack = () => {
        this.props.history.push('/mail')
    }


    render() {
        return <div>
            <h1>MailDetails</h1>
        </div>

    }
}
