


export class BookFilter extends React.Component {

    state = {
        filterBy: {
            name:'',
            price:0,
        }
    }

    handleNameChange = ({ target }) => {
        const { filterBy } = this.state
        const filed = target.name
        const value = target.value
        console.log(filed, value);
        this.setState((prevState) => ({ filterBy:{...prevState.filterBy,[filed]: value}}),
         () => {this.props.onSetFilter(filterBy)})
    }

    render() {
        const { name, price } = this.state.filterBy
        const { filterBy, onSetFilter } = this.props
        return <div className="book-filter">
            <label htmlFor="by-book-name">  search:    </label>
            <input
                type="search"
                placeholder="search by name"
                id="by-book-name"
                name="name"
                value={name}
                onChange={this.handleNameChange}
            />

            <label htmlFor="by-book-price">  price:  </label>
            <input
                type="range"
                id="by-book-price"
                value={price}
                name="price"
                min="0"
                max="400"
                onChange={this.handleNameChange}
            />
            <span>{price}</span>

        </div>
    }
}