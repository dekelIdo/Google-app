import { MailPreview } from "./mail-preview.jsx"

export class MailList extends React.Component {

    state = {

    }



    render() {

        const { emails } = this.props

        return <table className="inbox-mails">
            <tbody>
                {emails.map(email => {
                    return <MailPreview key ={email.id} email = {email} /> 
                    })}
            </tbody>

        </table>

    }
}