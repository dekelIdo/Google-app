import { NotePreview } from "../cmps/note-preview.jsx"


export function NoteList({notes,onRemove}){

        return <div className="notes-list">
                {notes.map(note => {
                    return <NotePreview
                        onRemove={() => onRemove(note.id)}
                        key={note.id}
                        note={note} />
                })}

            </div>

}