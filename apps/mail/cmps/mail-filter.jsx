
export class MailFilter extends React.Component {

    state = {
        text: ''
    }


    handleChange = ({target}) => {
        const value = target.value
        const {onSetSearch} = this.props
        const {text} = this.state

        this.setState({text:value},onSetSearch(text))
    }

    render() {
        let { text } = this.state
        const {onClickGrip} = this.props

        return <div className="flex">
            <input className="main-email-search" type="search"
            placeholder='search'
                value={text}
                onChange={this.handleChange}
            />
            <span onClick={()=>onClickGrip()} className="fa grip"></span>
        </div>

    }
}