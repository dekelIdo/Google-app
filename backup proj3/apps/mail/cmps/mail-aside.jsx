const { NavLink, withRouter, Link } = ReactRouterDOM

export const MailAside = withRouter(_MailAside)

function _MailAside(props) {

    const { onRouteClick , onClickDeleted, onClickInbox, onClickFavorite, onClickEmailThatSent } = props

    return <section className="mail-aside" >
        <nav>
            <ul>
                <li> <NavLink  exact to="/mail/compose">create new mail</NavLink></li>
                <li > <NavLink  onClick={() =>  onRouteClick ('inbox')} exact to="/mail/">inbox <span className="fa inbox"></span></NavLink></li>
                <li ><NavLink  onClick={() =>  onRouteClick ('trash')} exact to="/mail/"> trash<span className="fa trash"></span></NavLink></li>
                <li ><NavLink  onClick={() =>  onRouteClick ('stared')} exact to="/mail/"> favorite<span className="far star isStar"></span></NavLink></li>
                <li> <NavLink  onClick={() =>  onRouteClick ('sent')} to="/mail/">sent  <span className="fa sent"></span></NavLink></li>
            </ul>
        </nav>

    </section>
}