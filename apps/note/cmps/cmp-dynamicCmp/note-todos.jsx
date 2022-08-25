export function NoteToDos(props) {
    const { todos } = props.note.info
    const { info } = props.note

    return <div >
        <h5>{info.label}</h5>
        <ul>
            {todos.map(todo => {
                return <li key={`${todo.doneAt}`} >
                    {todo.txt} <input className="checkbox" type="checkbox"  name={`${todo.txt}`} />
                </li>
            })}
        </ul>

    </div>
}

