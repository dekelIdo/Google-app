import { NoteEdit } from "../cmps/note-edit.jsx"
import { NoteList } from "../cmps/note-list.jsx"
import { NoteFilter } from "../cmps/note-filter.jsx"
import { noteService } from "../services/note.service.js"
import { InputArea } from '../cmps/input-area.jsx'
const Router = ReactRouterDOM.HashRouter
const { Route, Switch } = ReactRouterDOM
export class NoteApp extends React.Component {


    state = {
        notes: []
    }

    componentDidMount() {
        this.loadNotes()
    }
    loadNotes = () => {

        noteService.query()
            .then((notes) => this.setState({ notes }))
    }

    toggleFocus = (ev) => {
        const { isOnfocus } = this.state
        const focus = isOnfocus ? false : true
        this.setState({ isOnfocus: focus })
    }
    onAddNote = (ev) => {
        ev.preventDefault()
        const { target } = ev
        const { text, title } = this.state.note
        const { note } = this.state
        const type = target.getAttribute('name')
        noteService.addNote(text, title, type).then(notes => { this.setState((prevState) => ({ ...prevState, note: { ...note, name: type } })), this.loadNotes() })



        console.log('this.state', this.state)
    }
    onRemove = (noteId) => {
        noteService.removeNote(noteId).then(notes => {
            this.loadNotes()
        })

    }
    handleChange = (ev) => {
        const { target } = ev
        const field = target.name
        const value = target.type === 'number' ? +target.value : target.value
        this.setState(({ note }) => ({
            note: { ...note, [field]: value }
        }))

    }

>>>>>>> 3d65c60bfd05bec3f93cce1d24b2bdaeccaa6577
    render() {
        console.log(this.state.notes);
        if (!this.state.notes) return <span></span>
        const { notes } = this.state
        return <Router>
            <section className="note-app">
                <NoteList loadNotes={this.loadNotes} notes={notes} />
                {/* <NoteFilter /> */}
                <Switch>
                    <Route path="/note/:noteId" component={NoteEdit} />
                </Switch>
            </section>
        </Router>
    }
}