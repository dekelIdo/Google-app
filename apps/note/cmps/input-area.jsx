export class InputArea extends React.Component {
    state = {
        isColorShown: false
    }

    onToggleColor = () => {
        const { isColorShown } = this.state
        this.setState({ isColorShown: isColorShown ? false : true })
    }
    render() {
        const { text, title,backgroundColor } = this.props.state.note
        const { onAddNote, toggleFocus, handleChange, onChangeColor ,onImageChange} = this.props
        const classColor = 'colors'
        const { isColorShown } = this.state
        return <form className="note-onfocus" style={{backgroundColor: backgroundColor,  transition: '0.5s'}} onSubmit={this.getOptions}>

            <input
            style={{backgroundColor: backgroundColor,  transition: '0.5s'}}
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
            style={{backgroundColor: backgroundColor,  transition: '0.5s'}}
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
                <span onClick={this.onToggleColor} name="background-color" className='fa color' ></span>
                <span onClick={onAddNote} name="video" className="fa video"></span>
                <span name="foto" className="fa foto"> <input onChange={onImageChange} type="file" className="foto-input" multiple accept="image/*"  /></span>
               

            <div className={isColorShown ? 'colors-container block' : 'colors-container none'}>
                <div onClick={onChangeColor} className={classColor} ><img name="#001f3f" className="colors" src="../img/color0.png" /></div>
                <div onClick={onChangeColor} className={classColor} ><img name="#0074D9" className="colors" src="../img/color1.png" /></div>
                <div onClick={onChangeColor} className={classColor} ><img name="#7FDBFF" className="colors" src="../img/color2.png" /></div>
                <div onClick={onChangeColor} className={classColor} ><img name="#39CCCC" className="colors" src="../img/color3.png" /></div>
                <div onClick={onChangeColor} className={classColor} ><img name="#B10DC9" className="colors" src="../img/color4.png" /></div>
                <div onClick={onChangeColor} className={classColor} ><img name="#F012BE" className="colors" src="../img/color5.png" /></div>
                <div onClick={onChangeColor} className={classColor} ><img name="#85144b" className="colors" src="../img/color6.png" /></div>
                <div onClick={onChangeColor} className={classColor} ><img name="#FF4136" className="colors" src="../img/color7.png" /></div>
                <div onClick={onChangeColor} className={classColor} ><img name="#FF851B" className="colors" src="../img/color8.png" /></div>
                <div onClick={onChangeColor} className={classColor} ><img name="#FFDC00" className="colors" src="../img/color9.png" /></div>
                <div onClick={onChangeColor} className={classColor} ><img name="#3D9970" className="colors" src="../img/color10.png" /></div>
                <div onClick={onChangeColor} className={classColor} ><img name="#2ECC40" className="colors" src="../img/color11.png" /></div>
            </div>
            </div>

        </form>
    }
}