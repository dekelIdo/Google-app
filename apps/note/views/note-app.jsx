import { NoteEdit } from "../cmps/note-edit.jsx"
import { NoteList } from "../cmps/note-list.jsx"
import { NoteFilter } from "../cmps/note-filter.jsx"
import { noteService } from "../services/note.service.js"
const Router = ReactRouterDOM.HashRouter
const { Route, Switch } = ReactRouterDOM

export class NoteApp extends React.Component {


    state = {
        notes:[]
    }

    componentDidMount() {
        this.loadNotes()
    }
    loadNotes = () => {

        noteService.query()
            .then((notes) => this.setState({ notes }))
    }


    render() {
        console.log(this.state.notes);
        if (!this.state.notes) return <span></span>
        const { notes } = this.state
        return <Router>
            <section className="note-app">
                
                
                <NoteList notes={notes} />
                {/* <NoteFilter /> */}

                <Switch>
                    <Route path="/note/:noteId" component={NoteEdit} />
                </Switch>
            </section>
        </Router>
    }
}