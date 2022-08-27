
const { Link } = ReactRouterDOM
const ACTIONS = {
    remove: 'remove',
    read: 'read',
    star: 'star',
    draft: 'draft'
}

export function MailPreview({ email, onActionClick }) {

    convertDateForMobile(1551133930594)
    const date = convertDate(email.sentAt)
    const dateForMobile = convertDateForMobile(email.sentAt)
    const classRead = email.isRead ? ' read ' : 'unread'
    const classStar = email.isStared ? ' isStar ' : ''

    return <div className={classRead + ' row no-hover '} key={email.id}>
        <div className="inbox-mail-underline col no-hover">
            <input className="icon check-box-list " type="checkbox" />
            <span onClick={() => onActionClick(ACTIONS.star, email.id)} className={"far star icon desktop-star " + classStar}></span> 
            <span title="save as important" onClick={() => onActionClick(ACTIONS.draft, email.id)} className="far sent icon icon-list-send"></span>

            <div className="div-for-mobile col">
                <div>
            <span onClick={() => onActionClick(ACTIONS.star, email.id)} className={"far star icon" + classStar}></span>
                </div>
            <span className="mail-date-list-mobile">{dateForMobile}</span>
            </div>

        </div>
      
            <Link to={`/mail/${email.id}`} className="large col no-hover" onClick={() => onActionClick(ACTIONS.read, email.id)}>
                <span className="email-list-address"> {email.to}</span>
                <span className="email-list-subject">{email.subject}</span>
                <span className="email-body">{email.body}</span>
                <span className="mail-date-list">{date}</span>
            </Link>
 
        <div className="col no-hover col-feature ">
            <span title="mark as read" onClick={() => onActionClick(ACTIONS.read, email.id)} className="fa checked icon"></span>
            <span title="remove mail" onClick={() => onActionClick(ACTIONS.remove, email.id)} className="fa trash icon"></span>
        </div>
    </div>
}


function convertDate(timeStamp) {
    const date = new Date(timeStamp).toLocaleDateString("en-IL");
    return date
}

function convertDateForMobile(timeStamp) {
    const date = new Date(timeStamp).toLocaleDateString(undefined, {month: "short", day: "numeric"});
    console.log('mamiiiii', date)
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