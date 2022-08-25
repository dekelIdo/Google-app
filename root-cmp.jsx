import { AppHeader } from "./cmps/app-header.jsx"
import { About } from "./views/about.jsx"
import { Home } from "./views/home.jsx"
import { NoteApp } from "./apps/note/views/note-app.jsx"
import { MailApp } from "./apps/mail/views/mail-app.jsx"
import { MailList } from "../cmps/mail-list.jsx"
import { MailDetails } from "../cmps/mail-details.jsx"
import { MailCompose } from "../cmps/mail-compose.jsx"

const Router = ReactRouterDOM.HashRouter
const { Route, Switch } = ReactRouterDOM

export function App() {
    return <Router>
        <section className="app">
            <AppHeader />
            <Switch>

                <Route path="/mail" component={MailApp} />
                {/* <Route path="/mail" component={MailList} /> */}

                <Route path="/note" component={NoteApp} />
                <Route path="/about" component={About} />
                <Route exact path="/" component={Home} />
            </Switch>
        </section>
    </Router>
}

