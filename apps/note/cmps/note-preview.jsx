import { NoteAudio } from "./note-audio.jsx"
import { NoteCanvas } from "./note-canvas.jsx"
import { NoteImg } from "./note-img.jsx"
import { NoteToDos } from "./note-todos.jsx"
import { NoteTxt } from "./note-txt.jsx"
import { NoteVideo } from "./note-video.jsx"

const { Link, Route, withRouter } = ReactRouterDOM

export class NotePreview extends React.Component {
   
   
   
   
    render() {


        
        return <section>
            <h2>Mail  </h2>
            <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Exercitationem, quod? Suscipit magni beatae eos. Ad exercitationem totam cupiditate quaerat sunt dicta debitis repellat alias eius soluta laboriosam culpa ratione amet recusandae eligendi quos, sit veritatis dolores magni aliquid. Quos nemo debitis atque ut optio provident, cupiditate quasi? Non, libero. Qui totam similique atque deserunt dolorum, rem explicabo expedita libero eaque molestiae a, quaerat quas, accusantium est perferendis ipsa suscipit. Cumque, incidunt placeat! Eaque, nostrum consequuntur! Itaque eum ducimus numquam maiores. </p>
   
            <NoteVideo/>
            <NoteTxt/>
            <NoteToDos/>
            <NoteImg/>
            <NoteCanvas/>
            <NoteAudio/>

        </section>

    }
}
