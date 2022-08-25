const { NavLink, withRouter, Link } = ReactRouterDOM

export const MailAside = withRouter(_MailAside)

function _MailAside(props) {

    return <section className="mail-aside" >
        <nav>
            <ul>
                <li><NavLink to="/mail/">mail inbox</NavLink></li>
                <li> <NavLink exact to="/mail/compose">create new mail</NavLink></li>
                <li> <NavLink exact to="/mail/compose">deleted <span className="fa trash"></span></NavLink></li>
                <li> <NavLink exact to="/mail/compose">sent <span className="fa sent"></span></NavLink></li>
            </ul>
        </nav>

    </section>
}