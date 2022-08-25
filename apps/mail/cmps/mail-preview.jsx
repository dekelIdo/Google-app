
const { Link } = ReactRouterDOM

export function MailPreview({ email,onRemoveMail,onMarkRead }) {


    const date = convertDate(email.sentAt)
    
    
    const classRead = email.isRead? 'read':'unread'
    console.log('readdddddddd',email.isRead)

    return  <tr  className={classRead} key={email.id}>
        <td className="inbox-mail-underline"><span className="fa star"></span></td>
        <td className="inbox-mail-underline"><span onClick={() => onMarkRead(email.id)} className="fa checked"></span></td>
        <td className="inbox-mail-underline"><span className="fa sent"></span></td>
        <Link to={`/mail/${email.id}`}>
                <td style={{width:"20%"}} className="inbox-mail "> {email.to}</td>
                <td style={{width:"20%"}} className="inbox-mail ">{email.subject}</td>
                <td className="inbox-mail ">{email.body}</td>
                <td className="inbox-mail">{date}</td>
                </Link>
                <td className="inbox-mail-underline"><span onClick={() => onRemoveMail(email.id)} className="fa trash"></span></td>
    </tr>
}





function convertDate(timeStamp) {
    const date = new Date(timeStamp).toLocaleDateString("en-IL");
    return date
}