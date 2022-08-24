import { MailFilter } from "./mail-filter.jsx"
import { MailList } from "./mail-list.jsx"
import { MailDetails } from "./mail-details.jsx"
import { MailCompose } from "./mail-compose.jsx"

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