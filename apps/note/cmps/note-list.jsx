import { NotePreview } from "../cmps/note-preview.jsx"


export function NoteList({ notes, onRemove, onDoneIsCheack }) {

    return <div className="notes-list">
        {notes.map(note => {
            return <NotePreview
                onDoneIsCheack={onDoneIsCheack}
                onRemove={() => onRemove(note.id)}
                key={note.id}
                note={note} />
        })}

    </div>

}