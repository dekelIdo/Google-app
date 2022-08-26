
const { Link } = ReactRouterDOM
const ACTIONS = {
    remove: 'remove',
    read: 'read',
    star: 'star',
    draft: 'draft'
}

export function MailPreview({ email, onActionClick }) {


    const date = convertDate(email.sentAt)
    const classRead = email.isRead ? ' read ' : 'unread'
    const classStar = email.isStared ? ' isStar ' : ''

    return <div className={classRead + ' row '} key={email.id}>
        <div className="inbox-mail-underline col">
            <input className="icon" type="checkbox" />
            <span onClick={() => onActionClick(ACTIONS.star, email.id)} className={"far star icon" + classStar}></span>
            <span onClick={() => onActionClick(ACTIONS.draft, email.id)} className="far sent icon"></span>
        </div>
      
            <Link to={`/mail/${email.id}`} className="large col" onClick={() => onActionClick(ACTIONS.read, email.id)}>
                <span className="inbox-mail email-list-address"> {email.to}</span>
                <span className="inbox-mail email-list-subject">{email.subject}</span>
                <span className="inbox-mail email-body">{email.body}</span>
                <span className="inbox-mail">{date}</span>
            </Link>
 

        <div className="col ">
            <span onClick={() => onActionClick(ACTIONS.read, email.id)} className="fa checked icon"></span>
            <span onClick={() => onActionClick(ACTIONS.remove, email.id)} className="fa trash icon"></span>
        </div>
    </div>
}


function convertDate(timeStamp) {
    const date = new Date(timeStamp).toLocaleDateString("en-IL");
    return date
}

// <tr className={classRead} key={email.id}>
//         <td className="inbox-mail-underline"><input type="checkbox" /></td>
//         <td className="inbox-mail-underline"><span onClick={() => onActionClick(ACTIONS.star,email.id)} className={"far star" + classStar}></span></td>
//         <td className="inbox-mail-underline"><span className="far sent"></span></td>

//         <Link to={`/mail/${email.id}`}>
//             <td style={{ width: "20%" }} className="inbox-mail "> {email.to}</td>
//             <td style={{ width: "20%" }} className="inbox-mail ">{email.subject}</td>
//             <td className="inbox-mail ">{email.body}</td>
//             <td className="inbox-mail">{date}</td>
//         </Link>

//         <td className="inbox-mail-underline"><span onClick={() =>onActionClick(ACTIONS.read,email.id)} className="fa checked"></span></td>
//         <td className="inbox-mail-underline"><span onClick={() =>onActionClick(ACTIONS.remove,email.id)} className="fa trash"></span></td>
//     </tr>