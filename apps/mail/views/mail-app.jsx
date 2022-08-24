import { MailFilter } from "../cmps/mail-filter.jsx"
import { MailList } from "../cmps/mail-list.jsx"
import { MailDetails } from "../cmps/mail-details.jsx"
import { MailCompose } from "../cmps/mail-compose.jsx"

const Router = ReactRouterDOM.HashRouter
const { Route, Switch } = ReactRouterDOM

export function MailApp() {
    return <Router>
        <section className="mail-app">
            <MailCompose />
            <MailFilter />
            <MailList />

            <Switch>

                <Route path="/mail/:mailId" component={MailDetails} />

            </Switch>
        </section>
    </Router>
}