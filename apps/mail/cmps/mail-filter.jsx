
export class MailFilter extends React.Component {

    state = {
        text: ''

    }


    handleChange = ({target}) => {
        const value = target.value

        this.setState({text:value})
    }

    render() {
        let { value, text } = this.state

        return <div>
            <input className="main-email-search" type="search"
            placeholder='search'
                value={text}

                onChange={this.handleChange}
            />
        </div>

    }
}