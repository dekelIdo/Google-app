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

    DynamicCmp = (props) => {
        const { note } = this.props
        switch (note.type) {
            case 'note-txt':
                return <NoteTxt {...props} />
            case 'note-img':
                return <NoteImg {...props} />
            case 'note-todos':
                return <NoteToDos {...props} />
            case 'note-video':
                return <NoteVideo {...props} />
            case 'note-audio':
                return <NoteAudio {...props} />
            case 'note-canvas':
                return <NoteCanvas {...props} />
        }
    }


    render() {
        const { DynamicCmp } = this

        console.log('this.props', this.props)
        if (!this.props.note) return <h1>not props</h1>
        return <DynamicCmp />


    }
}
