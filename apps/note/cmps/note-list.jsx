import { NotePreview } from "../cmps/note-preview.jsx"


export function NoteList({ notes, onRemove, onDoneIsCheack,onPined }) {

    return <div className="notes-list">
        {notes.map(note => {
            console.log('note',note)
            
            return <NotePreview
                onDoneIsCheack={onDoneIsCheack}
                onRemove={() => onRemove(note.id)}
                onPined={() => onPined(note.id)}
                key={note.id}
                note={note} />
        })}

    </div>

}