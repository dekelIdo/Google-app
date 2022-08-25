export class InputArea extends React.Component {

    
    render(){
        console.log(this.props);
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

        <span onClick={onAddNote} name="img" className="fa foto"></span>
        <span onClick={onAddNote} name="todos" className="fa cheakbok"></span>
        <span onClick={onAddNote} name="background-color"  className="fa foto"></span>
        <span onClick={onAddNote} className="fa foto"></span>
        
        </div>
    </form>
}
}