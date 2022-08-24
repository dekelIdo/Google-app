
const { Link } = ReactRouterDOM

export function MailPreview({email}) {

    return <tr className="inbox-mail-row" key={email.id}>
    <td  className="inbox-mail"><Link to={`/mail/${email.id}`}>{email.to}</Link> </td>
                <td className="inbox-mail subject">{email.subject}</td>
                <td className="inbox-mail">{email.sentAt}</td>
            </tr>
}