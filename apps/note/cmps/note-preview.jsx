import { NoteAudio } from "./cmp-dynamicCmp/note-audio.jsx"
import { NoteCanvas } from "./cmp-dynamicCmp/note-canvas.jsx"
import { NoteImg } from "./cmp-dynamicCmp/note-img.jsx"
import { NoteToDos } from "./cmp-dynamicCmp/note-todos.jsx"
import { NoteTxt } from "./cmp-dynamicCmp/note-txt.jsx"
import { NoteVideo } from "./cmp-dynamicCmp/note-video.jsx"

const { Link, Route, withRouter } = ReactRouterDOM

export class NotePreview extends React.Component {

    state = {

    }

    componentDidMount() {
        this.setNote()
    }
    setNote=()=>{
        const { note } = this.props
        this.setState({note} )
    }

    DynamicCmp = (note) => {
        const { type } = this.props.note
        console.log(type);
        switch (type) {
            case 'note-txt':
                return <NoteTxt {...note} />
            case 'note-img':
                return <NoteImg {...note} />
            case 'note-todos':
                return <NoteToDos {...note} />
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
        console.log('this.props', this.props)
        if (!this.props.note) return <h1>not props</h1>
        return <div className="note-container">

            <DynamicCmp note={note} />

        </div>


    }
}
