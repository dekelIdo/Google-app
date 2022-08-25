import { NoteEdit } from "../cmps/note-edit.jsx"
import { NoteList } from "../cmps/note-list.jsx"
import { NoteFilter } from "../cmps/note-filter.jsx"
import { noteService } from "../services/note.service.js"
import { InputArea } from '../cmps/input-area.jsx'
const Router = ReactRouterDOM.HashRouter
const { Route, Switch } = ReactRouterDOM
export class NoteApp extends React.Component {


    state = {
        notes: [],
        note: {
            name: '',
            title: '',
            text: '',
            backgroundColor: '',
        },

        isOnfocus: false
    }

    componentDidMount() {
        this.loadNotes()
    }
    componentDidUpdate(prevProps, prevState) {
        // if (prevState.state)
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
        noteService.addNote(text, title, type).then(notes => { this.setState((prevState) => ( {...prevState , note: { ...note, name: type }}) ),this.loadNotes() })
        


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

    render() {
        if (!this.state.notes) return <span></span>
        const { notes, text, isOnfocus } = this.state

        return <section className="note-app">
            <div className="note-inputs-container" onClick={isOnfocus ? this.toggleFocus : ""}>

            </div>

            {!isOnfocus && <form className="note-add" onSubmit={this.getOptions}>
                <label htmlFor="note-google">   </label>
                <input
                    className="input-note"
                    type="text"
                    onClick={this.toggleFocus}
                    placeholder="Add note"
                    id="note-google"
                    name="text"
                    value={text}
                    onChange={this.handleChange}

                />

                <span onClick={this.onAddNote} name="img" className="fa foto"></span>
            </form>}
            {isOnfocus && <InputArea handleChange={this.handleChange} onAddNote={this.onAddNote} state={this.state} />}



            <NoteList onRemove={this.onRemove} notes={notes} />
            {/* <NoteFilter /> */}

        </section>

    }
}