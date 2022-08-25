

export function NoteTxt (props){
    
    return <div className="note-container"><h1>{props.note.info.title}</h1>{props.note.info.txt}</div>
}