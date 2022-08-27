const { Link, NavLink, withRouter } = ReactRouterDOM
export class AppHeader extends React.Component {
    state = {
        isOpen: false
    }


    toggleMenu = () => {
        const { isOpen } = this.state
        this.setState({ isOpen: !isOpen })
    }
    render() {
        const { isOpen } = this.state

        return <header className="app-header">
            <Link to="/">
                <img className="logo" src="./img/google.png" />
            </Link>

            <nav className={isOpen ? 'menu-open' : ''}>
                <NavLink exact to="/"><img src="./img/home.png" onClick={this.toggleMenu}title='Home' /></NavLink>
                <NavLink to="/about"><img src="./img/about.png" onClick={this.toggleMenu} title='about us'/></NavLink>
                <NavLink to="/note"><img src="./img/notes.png" onClick={this.toggleMenu}title='notes' /></NavLink>
                <NavLink to="/mail"><img src="./img/gmailll.png" onClick={this.toggleMenu}title='mail' /></NavLink>
            </nav>
            <img src="../img/menu.png" className="menu" onClick={this.toggleMenu} />
        </header >
    }
}
