const { Link, NavLink, withRouter } = ReactRouterDOM

function _AppHeader() {

    return <section className="app-header flex space-between">
        <Link to="/book">
            <h2 > BOOKS </h2>
        </Link>

        <nav>
            <ul>
                <NavLink exact to="/">Home</NavLink>
                <NavLink exact to="/book">Books</NavLink>
                <NavLink to="/about">About</NavLink>
                <NavLink  to="/book/add" >Add Book</NavLink>
            </ul>

        </nav>
    </section>

}

export const AppHeader = withRouter(_AppHeader) 

