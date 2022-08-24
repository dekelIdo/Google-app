const { Link, Route, withRouter } = ReactRouterDOM

export class MailIndex extends React.Component {
    render() {
        return <section>
        <h2>Mail  </h2>
        <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Exercitationem, quod? Suscipit magni beatae eos. Ad exercitationem totam cupiditate quaerat sunt dicta debitis repellat alias eius soluta laboriosam culpa ratione amet recusandae eligendi quos, sit veritatis dolores magni aliquid. Quos nemo debitis atque ut optio provident, cupiditate quasi? Non, libero. Qui totam similique atque deserunt dolorum, rem explicabo expedita libero eaque molestiae a, quaerat quas, accusantium est perferendis ipsa suscipit. Cumque, incidunt placeat! Eaque, nostrum consequuntur! Itaque eum ducimus numquam maiores. </p>
        <Link className="group" to="/about/group" >Group</Link>
        <Link className="goals" to="/about/goals" >Goals</Link>
        <Link className="goals" to="/about/goals" >Goals</Link>
        <Link className="goals" to="/about/goals" >Goals</Link>
        <Link className="goals" to="/about/goals" >Goals</Link>
        <Route path="/about/goals" component={Goals} />
        <Route path="/about/group" component={Group} />
        <Route path="/about/group" component={Group} />
        <Route path="/about/group" component={Group} />
        <Route path="/about/group" component={Group} />
    </section>
    }
}

