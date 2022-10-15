import { NoteAudio } from "./cmp-dynamicCmp/note-audio.jsx"
import { NoteCanvas } from "./cmp-dynamicCmp/note-canvas.jsx"
import { NoteImg } from "./cmp-dynamicCmp/note-img.jsx"
import { NoteToDos } from "./cmp-dynamicCmp/note-todos.jsx"
import { NoteTxt } from "./cmp-dynamicCmp/note-txt.jsx"
import { NoteVideo } from "./cmp-dynamicCmp/note-video.jsx"
import { noteService } from "../services/note.service.js"

const { Link, Route, withRouter } = ReactRouterDOM

export class NotePreview extends React.Component {

    state = {

    }
    onDone = (ev) => {
        this.props.onDoneIsCheack(this.state.note.id,ev.target.id,ev.target.checked)       
        console.log('ev.target',ev.target.id)
        console.log('ev.target',ev.target.checked)
      
        console.log(this.state.note.info.todos);
        ev.target.checked=!ev.target.checked

    }
    componentDidMount() {
        this.setNote()
    }
    setNote = () => {
        const { note } = this.props
        this.setState({ note })
    }

    DynamicCmp = (note) => {
        const { type } = this.props.note
        switch (type) {
            case 'note-txt':
                return <NoteTxt {...note} />
            case 'note-img':
                return <NoteImg  {...note} />
            case 'note-todos':
                return <NoteToDos onDone={this.onDone} {...note} />
            case 'note-video':
                return <NoteVideo {...note} />
            case 'note-audio':
                return <NoteAudio {...note} />
            case 'note-canvas':
                return <NoteCanvas {...note} />
        }
    }


    render() {

        const { DynamicCmp } = this
        const { note } = this.props
        if (!this.props.note) return <h1>not props</h1>
        if (!this.state.note) return <h1>not state</h1>
        const {backgroundColor}= this.state.note.style
        return <React.Fragment>                         
            <div className="note-container"  style={{backgroundColor: backgroundColor}}>
                
                <span onClick={this.props.onRemove} className="fa close"></span>
                <span onClick={this.props.onPined} className="fa pin"></span>

                <DynamicCmp note={note} />

            </div>
        </React.Fragment>


    }
}
