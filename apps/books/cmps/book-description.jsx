


export class LongTxt extends React.Component {
    render() {
        const hundredWords = []
        const { bookDescription, isLongTxtShown, toggle } = this.props
        const hundredsWords = bookDescription.slice(0, 100)
        const btnTxt = isLongTxtShown ? ' more...' : 'less'
        return <div>
            {!isLongTxtShown && <p>{bookDescription}</p>}
            {isLongTxtShown && <p>{hundredsWords}</p>}
            <button onClick={toggle} > {btnTxt} </button>
        </div>

    }

}