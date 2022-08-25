import { NotePreview } from "../cmps/note-preview.jsx"
import { NoteAdd } from '../cmps/note-add.jsx'


export class NoteList extends React.Component {


    state = {
        note: {
            text: '',
            backgroundColor: '',

        },

        isOnfocus: false
    }
    toogleFocus = (ev) => {
        const { isOnfocus } = this.state
        const focus = isOnfocus ? false : true
        this.setState({ isOnfocus: focus })
    }
    onAddNote = (ev) => {
        ev.preventDefault()
        carService.save(this.state.car)
            .then(() => {
                this.props.history.push('/car')
            })
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
        return <React.Fragment>
            <form className="note-add" onSubmit={this.getOptions}>
                <label htmlFor="note-google">   </label>
                <input
                    type="text"
                    onClick={this.toogleFocus}
                    placeholder="Add note"
                    id="note-google"
                    name="text"
                    value={text}
                    onChange={this.handleChange}
                />
                <button onClick={this.handleChange}>Search</button>
            </form>



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