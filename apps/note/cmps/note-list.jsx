import { NotePreview } from "../cmps/note-preview.jsx"
import { NoteEdit } from "./note-edit.jsx"

export class NoteList extends React.Component {

    render() {
        return <div>
            <NoteEdit/>

            <h1>note-List</h1>
            <NotePreview />
        </div>

    }
}