import { NotePreview } from "../cmps/note-preview.jsx"
import { NoteAdd } from '../cmps/note-add.jsx'
import { noteService } from "../services/note.service.js"
import { InputArea } from '../cmps/input-area.jsx'
export class NoteList extends React.Component {

    state = {
        note: {
            title: '',
            text: '',
            backgroundColor: '',
        },

        isOnfocus: false
    }

    toggleFocus = (ev) => {
        const { isOnfocus } = this.state
        const focus = isOnfocus ? false : true
        this.setState({ isOnfocus: focus })
    }

    onAddNote = (ev) => {
        ev.preventDefault()
        const {text,title}=this.state.note
       console.log( ev.target.name);
        noteService.addNote(text,title).then(notes => { notes })
        this.props.loadNotes()
    }

    handleChange = ({ target }) => {
        const field = target.name
        const value = target.type === 'number' ? +target.value : target.value
        this.setState(({ note }) => ({
            note: { ...note, [field]: value }
        }))

    }

    render() {
        const { notes } = this.props
        const { text } = this.state
        console.log(this.state);
        const { isOnfocus } = this.state

        return <React.Fragment>
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



            <div className="notes-list">

                {notes.map(note => {

                    console.log(note.id);

                    return <NotePreview
                        key={note.id}
                        note={note} />
                })}

            </div>


        </React.Fragment>
    }


}