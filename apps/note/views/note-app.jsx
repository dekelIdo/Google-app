import { NoteEdit } from "../cmps/note-edit.jsx"
import { NoteList } from "../cmps/note-list.jsx"
import { NoteFilter } from "../cmps/note-filter.jsx"
import { noteService } from "../services/note.service.js"
import { InputArea } from '../cmps/input-area.jsx'
import { OneLineInput } from "../cmps/cmp-dynamicCmp/one-line-input.jsx"
import { utilService } from "../../../services/util.service.js"
import { showSuccessMsg ,showErrorMsg} from "../../../services/event-bus.service.js"
import { UserMsg } from "../../../cmps/user-msg.jsx"
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
        console.log('this,state', this.state)

        noteService.query()
            .then((notes) => this.setState({ notes }))
    }
componentDidUpdate(prevProps, prevState) {
    if(prevState.note.name){

        this.setState({note: {name: '',title: '',text: '',backgroundColor: '',},isOnfocus: false})
    }

}
    toggleFocus = () => {
        const { isOnfocus } = this.state
        const focus = isOnfocus ? false : true
        this.setState({ isOnfocus: focus })
    }
    onDoneIsCheack = (noteId, cheakId) => {
        noteService.setNoteDone(noteId, cheakId).then((notes) => this.setState((prevState) => ({ notes }), this.loadNotes))
    }
    onAddNote = (ev) => {
        ev.preventDefault()
        const { target } = ev
        const { text, title, backgroundColor } = this.state.note
        const { note } = this.state
        const type = target.getAttribute('name')
        console.log(text, title, type);
        noteService.addNote(text, title, type, backgroundColor,this.onImageChange).then(notes => { this.setState((prevState) => ({ ...prevState, note: { ...note, name: type } })), this.loadNotes()  })
       

        console.log('this.state', this.state)
    }
    onChangeColor = (ev) => {
        console.log(ev.target.name);
        const{note}=this.state
        this.setState((prevState)=>({...prevState, note:{...note,backgroundColor:ev.target.name}}))
    }
    onImageChange=(ev)=>{
        if(ev.target.name!=='note-img') return 
        return ev.target.value
    }
    onRemove = (noteId) => {
        noteService.removeNote(noteId).then(notes => {
            this.loadNotes()
        })
        showSuccessMsg('note removed')

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

            {!isOnfocus && <OneLineInput toggleFocus={this.toggleFocus} handleChange={this.handleChange} text={text} onAddNote={this.onAddNote} />}
            {isOnfocus && <InputArea onImageChange={this.onImageChange} onChangeColor={this.onChangeColor} handleChange={this.handleChange} onAddNote={this.onAddNote} state={this.state} />}



            <NoteList onDoneIsCheack={this.onDoneIsCheack} onRemove={this.onRemove} notes={notes} />
            {/* <NoteFilter /> */}
            <UserMsg  />
        </section>

    }
}




