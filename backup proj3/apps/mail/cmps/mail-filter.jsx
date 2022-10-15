
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

        return <div>
            <input className="main-email-search" type="search"
            placeholder='search'
                value={text}

                onChange={this.handleChange}
            />
        </div>

    }
}