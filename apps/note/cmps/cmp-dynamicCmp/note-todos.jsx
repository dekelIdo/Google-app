import { utilService } from "../../../../services/util.service.js";
export function NoteToDos(props) {
    const { todos } = props.note.info
    const { info } = props.note
    const { onDone } = props

    console.log(props.note);

    return <div >
        <h5>{info.label}</h5>
        <ul>
            {todos.map(todo => {
                return <li className={todo.done ? " done-todo" : ""} key={`${todo.txt + Math.random() * 9}`} >
                    {todo.txt} <input className="checkbox" onChange={onDone} id={todo.id} type="checkbox" name={`${todo.txt}`} />
                </li>
            })}
        </ul>
    </div>
}

