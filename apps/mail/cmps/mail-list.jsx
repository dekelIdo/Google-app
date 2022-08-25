import { MailPreview } from "./mail-preview.jsx"
import { mailService } from "../services/mail.service.js"

export function MailList ({emails, onActionClick}) {

        return <div className="inbox-mails main-row">
            {emails.map(email => {
                return <MailPreview key={email.id} email={email} onActionClick={onActionClick} />
            })}
        </div>

    
}
