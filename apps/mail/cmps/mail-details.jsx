import { mailService } from "../services/mail.service.js"

export class MailDetails extends React.Component {

    state = {
        mail: null

    }

    componentDidMount() {
        this.loadMail()
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.match.params.mailId !== this.props.match.params.mailId) {
            this.loadMail()
        }
    }

    loadMail = () => {

        const { mailId } = this.props.match.params

        mailService.findEmailById(mailId).then((mail) => {
            if (!mail) return this.onGoBack()

            this.setState({mail })
        })
    }


    onGoBack = () => {
        this.props.history.push('/mail')
    }

    render() {

        const { mail } = this.state
        console.log(mail)
        if (!mail) return <div>wait a second</div>

        return <section className="mail-details">
            <div className="mail-details-main"><span>{mail.to}</span><span>{mail.sentAt}</span></div>
            <h1>{mail.subject}</h1>
            <h1>{mail.body}</h1>
            <h1>{mail.id}</h1>
            
        </section>



    }
}
