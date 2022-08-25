const { NavLink, withRouter, Link } = ReactRouterDOM

export const MailAside = withRouter(_MailAside)

function _MailAside(props) {

    const { onClickDeleted, onClickInbox } = props

    return <section className="mail-aside" >
        <nav>
            <ul>
                <li> <NavLink activeClassName="selected" exact to="/mail/compose">create new mail</NavLink></li>
                <li > <NavLink activeClassName="selected" onClick={() => onClickInbox()} exact to="/mail/">inbox <span className="fa inbox"></span></NavLink></li>
                <li ><NavLink activeClassName="selected" onClick={() => onClickDeleted()} exact to="/mail/"> trash<span className="fa trash"></span></NavLink></li>
                <li ><NavLink activeClassName="selected" exact to="/mail/"> favorite<span className="far star isStar"></span></NavLink></li>
                <li> <NavLink activeClassName="selected" to="/mail/">sent  <span className="fa sent"></span></NavLink></li>
            </ul>
        </nav>

    </section>
}