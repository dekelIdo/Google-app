const { Link, NavLink, withRouter } = ReactRouterDOM
import { BookApp } from "../views/Miss-Books/pages/book-app.jsx"

export function AppHeader() {

    return <header className="app-header">
        <Link to="/">
             <img className="logo" src="../img/google.png"/>
        </Link>
        <nav>
            <NavLink exact to="/">Home</NavLink>
            <NavLink to="/about">About</NavLink>
            <NavLink  to="/note">Note</NavLink>
            <NavLink to="/mail">Mail</NavLink>
        </nav>
    </header>
}
