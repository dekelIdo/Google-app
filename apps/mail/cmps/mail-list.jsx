import { MailPreview } from "./mail-preview.jsx"
import { mailService } from "../services/mail.service.js"

export function MailList({ emails, onActionClick }) {

    if (emails.length === 0) return <div className="no-emails-display">no emails for display</div>
    return <div className="inbox-mails main-row">

        {emails.map(email => {
            return <MailPreview key={email.id} email={email} onActionClick={onActionClick} />
        })}
    </div>


}
