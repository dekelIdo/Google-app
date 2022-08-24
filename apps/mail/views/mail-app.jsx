import { MailFilter } from "../cmps/mail-filter.jsx"
import { MailList } from "../cmps/mail-list.jsx"
import { MailDetails } from "../cmps/mail-details.jsx"
import { MailCompose } from "../cmps/mail-compose.jsx"
import { mailService } from "../services/mail.service.js"

const Router = ReactRouterDOM.HashRouter
const { Route, Switch } = ReactRouterDOM

export class MailApp extends React.Component {

    state = {
        emails: []
    }

    componentDidMount() {
        this.loadMails()
    }

    loadMails = () => {
        mailService.getInboxEmails(this.state)
            .then(emails => this.setState({ emails }))
    }


    render() {
        const { emails } = this.state

        return <Router>
            <section className="mail-app">

                <MailCompose />

                <MailFilter />
                
                <Switch>
                <MailList emails={emails} />
                </Switch>

                <Switch>
                    <Route path="/mail/:mailId" component={MailDetails} />
                </Switch>
            </section>
        </Router>
    }
}