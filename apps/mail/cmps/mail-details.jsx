import { mailService } from "../services/mail.service.js"
const ACTIONS = {
    remove: 'remove',
    read: 'read',
    star: 'star'
}
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


    render() {
        const { mail } = this.state
        
        if (!mail) return <div>wait a second</div>
        const classStar = mail.isStared ? ' isStar ' : ''
        const date = this.convertDate(mail.sentAt)
        const {onActionClick} = this.props 
        
        return <section className="mail-details">
            <div className="flex  mail-details-icons">
                <span onClick={this.onGoBack} className="fa go-back icon"></span>
                <div>
                <span className="fa trash icon"></span>
                <span className="far sent icon"></span>
                <span className={"far star icon" + classStar}></span>

                </div>
            </div>
            <h4 className="main-details-subject">{mail.subject}</h4>
            <div className="mail-details-header"><span>{mail.to}</span><span>{date}</span></div>
            <span className="mail-text">
                <p className="mail-details-body">{mail.body}</p>
                <p>{mail.id}</p>
            </span>
        </section>
    }
    convertDate = (timeStamp) => {
        const date = new Date(timeStamp).toLocaleDateString("en-IL");
        return date
    }
}
