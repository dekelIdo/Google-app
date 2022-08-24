import { NotePreview } from "../cmps/note-preview.jsx"



export function NoteList({ notes }) {
console.log(notes);
    return <div className="notes-list">
        {notes.map(note => {
            // const { id } = note
            console.log(note.id);

            return <NotePreview
                key={note.id}
                note={note} />
        })}
        {/* <h1> {JSON.stringify(notes)}</h1> */}
    </div>


}