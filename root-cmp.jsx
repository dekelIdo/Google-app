import { AppHeader } from "./cmps/app-header.jsx"
import { About } from "./views/about.jsx"
import { Home } from "./views/home.jsx"
import { NoteApp } from "./apps/note/views/note-app.jsx"
import { MailApp } from "./apps/mail/views/mail-app.jsx"
import { NoteEdit } from './apps/note/cmps/note-edit.jsx'
import {BookAdd} from './apps/books/pages/book-add.jsx'
import {BookDetails} from './apps/books/pages/book-details.jsx'
import {BookApp} from './apps/books/pages/book-app.jsx'

// consts for route
const Router = ReactRouterDOM.HashRouter
const { Route, Switch } = ReactRouterDOM

export function App() {
    return <Router>
        <section className="app">
            <AppHeader />
            <Switch>


                <Route path="/book/add" component={BookAdd} />
                <Route path="/book/:bookId" component={BookDetails} />
                <Route path="/book" component={BookApp} />
                <Route path="/mail" component={MailApp} />
                <Route path="/note/:noteId" component={NoteEdit} />
                <Route path="/note" component={NoteApp} />
                <Route path="/about" component={About} />
                <Route exact path="/" component={Home} />
            </Switch>
        </section>
    </Router>
}

