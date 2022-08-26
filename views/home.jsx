const { Link, withRouter } = ReactRouterDOM

export function Home() {

    return <section className="home-page">

        <h1 className="home-title">Welcome to AppSus !</h1>
        <div className="links-container-home">

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
        </div>

    </section>
}

