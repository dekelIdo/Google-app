import { mailService } from "../services/mail.service.js"

export class MailDetails extends React.Component {

    state = {
        mail: null,
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

            this.setState({ mail })
        })
    }


    onGoBack = () => {
        this.props.history.push('/mail')
    }

    onRead = ()=>{
    }


    render() {
        const { mail } = this.state
        // console.log(mail)
        if (!mail) return <div>wait a second</div>
        
        const date = this.convertDate(mail.sentAt)

        return <section className="mail-details">
            <div className="mail-details-main"><span>{mail.to}</span><span>{date}</span></div>
            <span className="mail-text">

            <h4>{mail.subject}</h4>
            <p>{mail.body}</p>
            <p>{mail.id}</p>

            </span>
        </section>



    }

    convertDate=(timeStamp)=> {
        const date = new Date(timeStamp).toLocaleDateString("en-IL");
        return date
    }
}
