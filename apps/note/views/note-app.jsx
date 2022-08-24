import { NoteEdit } from "../cmps/note-edit.jsx"
import { NoteList } from "../cmps/note-list.jsx"
import { NoteFilter } from "../cmps/note-filter.jsx"

const Router = ReactRouterDOM.HashRouter
const { Route, Switch } = ReactRouterDOM

export function NoteApp() {
    return <Router>
        <section className="note-app">
            <NoteFilter />
            <NoteList />
            
            <Switch>

               
                <Route path="/note/:noteId" component={NoteEdit} />
               
            </Switch>
        </section>
    </Router>
}