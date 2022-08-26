const { NavLink, withRouter, Link } = ReactRouterDOM

export const MailAside = withRouter(_MailAside)

function _MailAside(props) {

    const { onRouteClick, onNewMail } = props

    return <section className="mail-aside" >

        <nav>
            <ul>
                <li><button className="new-mail-btn" onClick={() => onNewMail()}><span className="fa pencil"></span>create new mail </button></li>
                {/* <li> <NavLink  exact to="/mail/compose">create new mail</NavLink></li> */}
                <li > <NavLink activeClassName="inbox-nav-link" className="nav-link-aside" onClick={() => onRouteClick('inbox')} exact to="/mail/"><span className="fa inbox"></span> inbox </NavLink></li>
                <li ><NavLink activeClassName="trash-nav-link" className="nav-link-aside" onClick={() => onRouteClick('trash')} exact to="/mail/"><span className="fa trash"></span> trash</NavLink></li>
                <li ><NavLink activeClassName="draft-nav-link" className="nav-link-aside" onClick={() => onRouteClick('draft')} exact to="/mail/"> <span className="far sent"></span>draft</NavLink></li>
                <li ><NavLink activeClassName="selected" className="nav-link-aside" onClick={() => onRouteClick('stared')} exact to="/mail/"> <span className="far star isStar"></span>favorite</NavLink></li>
                <li> <NavLink activeClassName="selected" className="nav-link-aside" onClick={() => onRouteClick('sent')} to="/mail/"><span className="fa outbox"></span>sent  </NavLink></li>
            </ul>
        </nav>
    </section>
}