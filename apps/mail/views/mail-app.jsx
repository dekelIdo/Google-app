import { MailFilter } from "../cmps/mail-filter.jsx"
import { MailList } from "../cmps/mail-list.jsx"
import { MailDetails } from "../cmps/mail-details.jsx"
import { MailCompose } from "../cmps/mail-compose.jsx"
import { mailService } from "../services/mail.service.js"
import { MailAside } from "../cmps/mail-aside.jsx"

const Router = ReactRouterDOM.HashRouter
const { Route, Switch, Link } = ReactRouterDOM

export class MailApp extends React.Component {

    state = {
        mails: [],
        filterBy: null
    }

    componentDidMount() {
        this.loadMails()
    }

    loadMails = () => {
        mailService.getInboxEmails(this.state)
            .then(mails => this.setState({ mails }))
    }


    onMarkRead = (mailId) => {
        const { mails } = this.state
        mailService.findEmailById(mailId)
            .then((mail) => {
                if (!mail) return this.onGoBack()
                mailService.markRead(mail), this.setState({ mails })
            })

    }


    onRemoveMail = (mailId) => {
        mailService.removeMail(mailId)
        let { mails } = this.state

        mails = mails.filter(mail => mail.id !== mailId)

        this.setState({ mails })
    }

    render() {
        const { mails } = this.state
        const { onRemoveMail, onMarkRead } = this

        return <Router>
            <section className="mail-app">
                <MailAside />
                {/* <MailCompose /> */}
                <MailFilter />

                <Switch>
                    <Route path="/mail/Compose" component={MailCompose} />
                    <Route path="/mail/:mailId" component={MailDetails} />
                    <MailList emails={mails} onRemoveMail={onRemoveMail} onMarkRead={onMarkRead} />
                </Switch>

            </section>
        </Router>
    }
}