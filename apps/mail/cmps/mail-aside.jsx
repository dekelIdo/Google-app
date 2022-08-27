const { NavLink, withRouter, Link } = ReactRouterDOM
import { mailService } from "../services/mail.service.js"

export const MailAside = withRouter(_MailAside)

function _MailAside(props) {
    const { onRouteClick, onNewMail,sideBarClass,onUnReadRouteClick, onClickGrip } = props
    const unReadMails = mailService.getCountUnreadMails()

    return <section className={`mail-aside   ${sideBarClass}`} >
        
        <nav>
            <ul className="ul-side-bar">
                <li><button className="new-mail-btn" onClick={() => onNewMail()}><span className="fa pencil"></span>create new mail </button></li>
                <li > <NavLink activeClassName="selected" className="nav-link-aside" onClick={() => (onRouteClick('inbox'),onClickGrip())} exact to="/mail/"><span className="fa inbox"></span> Inbox </NavLink></li>
                <li > <NavLink activeClassName="selected" className="nav-link-aside" onClick={() => onUnReadRouteClick()} exact to="/mail/"><span className="fa inbox-unread"></span>Unread <span className="unread-mails-count">{unReadMails}</span></NavLink></li>
                <li ><NavLink  activeClassName="selected" className="nav-link-aside" onClick={() => (onRouteClick('trash'),onClickGrip())} exact to="/mail/"><span className="fa trash"></span> Trash</NavLink></li>
                <li ><NavLink  activeClassName="selected" className="nav-link-aside" onClick={() => (onRouteClick('draft'),onClickGrip())} exact to="/mail/"> <span className="far sent"></span>Important</NavLink></li>
                <li ><NavLink activeClassName="selected" className="nav-link-aside" onClick={() => (onRouteClick('stared'),onClickGrip())} exact to="/mail/"> <span className="far star isStar"></span>Favorite</NavLink></li>
                <li> <NavLink activeClassName="selected" className="nav-link-aside" onClick={() => (onRouteClick('sent'),onClickGrip())} to="/mail/"><span className="fa outbox"></span>Sent</NavLink></li>
            </ul>
        </nav>
    </section>
}