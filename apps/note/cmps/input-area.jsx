export class InputArea extends React.Component {

    
    render(){
    const {text ,title} = this.props.state.note
    const{onAddNote, toggleFocus,handleChange}= this.props
    return <form className="note-onfocus" onSubmit={this.getOptions}>
       
        <input
            className="input-note"
            type="text"
            onClick={toggleFocus}
            placeholder="title"
            id="note-google"
            name="title"
            value={title}
            onChange={handleChange}
        />
        
        <input
            className="input-note"
            type="text"
            onClick={toggleFocus}
            placeholder="Add note"
            id="note-google"
            name="text"
            value={text}
            onChange={handleChange}
        />
        <div className="container-input-btn">

        <span onClick={onAddNote} name="note" className="fa add-note"></span>
        <span onClick={onAddNote} name="todos" className="fa cheakbok"></span>
        <span onClick={onAddNote}  name="background-color" className="fa color"></span>
        <span onClick={onAddNote} name="video" className="fa video"></span>
        
        </div>
    </form>
}
}