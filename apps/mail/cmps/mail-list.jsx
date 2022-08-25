import { MailPreview } from "./mail-preview.jsx"
import { mailService } from "../services/mail.service.js"

export class MailList extends React.Component {



    render() {
        
        const { emails, onRemoveMail,onMarkRead } = this.props

        return <table className="inbox-mails">
            <tbody style={{width:"100%"}}>
                {emails.map(email => {
                    return <MailPreview key ={email.id} email = {email} onRemoveMail={onRemoveMail} onMarkRead={onMarkRead}/> 
                    })}
          </tbody>
        </table>

    }
}
