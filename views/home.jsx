const { Link, withRouter } = ReactRouterDOM

export function Home() {

    return <section className="home-page">
        <h1>Welcome to home page!</h1>

        <div className="mail-home-img">
        <Link to="/mail">

    <img src="./assets/img/gmail.jpg" alt=""></img>
        </Link>
        </div>

        <div className="note-home-img">
        <Link to="/note">
        <img src="./assets/img/note.jpg" alt=""></img>
        </Link>
        </div>

    </section>
}

