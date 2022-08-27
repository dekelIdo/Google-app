const { Link, Route, withRouter } = ReactRouterDOM

export function About() {

    return <section>
        <h2>About us </h2>
        <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Exercitationem, quod? Suscipit magni beatae eos. Ad exercitationem totam cupiditate quaerat sunt dicta debitis repellat alias eius soluta laboriosam culpa ratione amet recusandae eligendi quos, sit veritatis dolores magni aliquid. Quos nemo debitis atque ut optio provident, cupiditate quasi? Non, libero. Qui totam similique atque deserunt dolorum, rem explicabo expedita libero eaque molestiae a, quaerat quas, accusantium est perferendis ipsa suscipit. Cumque, incidunt placeat! Eaque, nostrum consequuntur! Itaque eum ducimus numquam maiores. </p>
        <Link className="group" to="/about/group" >Group</Link>
        <Link className="goals" to="/about/goals" >Goals</Link>
        <Route path="/about/goals" component={Goals} />
        <Route path="/about/group" component={Group} />
    </section>
}

function Group() {
    return <div>
        <h1>Us Group :  </h1>
        <ul>
            <li>Dekel🌴</li>
            <li>Yaara🍩</li>
            <li>Eldad😸</li>
        </ul>
    </div>
}
function Goals() {
    return <div>
        <h1>Us Goals : </h1>
        <ul>
            <li>Happy😆</li>
            <li>Smile😋</li>
            <li>To code💻</li>
        </ul>
    </div>
}
