export function NoteVideo(props) {
    const { url } = props.note.info
    const src = url

 
    return  <video width="200" height="240" controls autoPlay>
            <source src={url} />
        </video>



    



}

