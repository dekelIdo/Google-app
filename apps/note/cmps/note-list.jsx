import { NotePreview } from "../cmps/note-preview.jsx"



export function NoteList({ notes }) {
console.log(notes);
    return <div className="notes-list">
        {notes.map(note => {
          
            console.log(note.id);

            return <NotePreview
                key={note.id}
                note={note} />
        })}
   
    </div>


}