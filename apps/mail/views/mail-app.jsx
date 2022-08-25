import { MailFilter } from "../cmps/mail-filter.jsx"
import { MailList } from "../cmps/mail-list.jsx"
import { MailDetails } from "../cmps/mail-details.jsx"
import { MailCompose } from "../cmps/mail-compose.jsx"
import { mailService } from "../services/mail.service.js"
import { MailAside } from "../cmps/mail-aside.jsx"

const ACTIONS = {
    remove: 'remove',
    read: 'read',
    star: 'star'
}
const Router = ReactRouterDOM.HashRouter
const { Route, Switch, Link } = ReactRouterDOM

export class MailApp extends React.Component {
    state = {
        mails: [],
        criteria: {
            status: 'inbox',
            txt: null,
            isRead: true,
            isStared: false,
        }
    }

    componentDidMount() {
        this.loadMails()
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevState.criteria.status !== this.state.criteria.status || prevState.criteria.txt !== this.state.criteria.txt) {
            this.loadMails()
        }
    }

    loadMails = () => {
        const { criteria } = this.state

        mailService.getInboxEmails(criteria)
            .then(mails => this.setState({ mails }))
    }

    onRouteClick = (status) => {
        let { criteria } = this.state
        this.setState((prevState) => ({ ...prevState, criteria: { ...criteria, status } }), this.loadMails())
    }

    onSetSearch = (val) => {
        let { criteria } = this.state
        this.setState((prevState) => ({ ...prevState, criteria: { ...criteria, txt: val } }), this.loadMails())
    }

    onRemoveMail = (mailId) => {
        mailService.removeMail(mailId)
    }

    onMarkStared = (mailId) => {
        mailService.MarkAsStared(mailId)
    }

    onMarkRead = (mailId) => {
        mailService.markRead(mailId)
    }

    onActionClick = (action, mailId) => {

        if (action === ACTIONS.remove) {
            this.onRemoveMail(mailId)
        }
        if (action === ACTIONS.read) {
            this.onMarkRead(mailId)
        }
        if (action === ACTIONS.star) {
            this.onMarkStared(mailId)
        }
        this.loadMails()
    }
    render() {
        const { mails, criteria } = this.state
        const { onActionClick, onRouteClick, onSetSearch } = this

        return <Router>
            <section className="mail-app">
                <MailAside onRouteClick={onRouteClick} />
                {/* <MailCompose /> */}
                <MailFilter criteria={criteria} onSetSearch={onSetSearch} />
                <Switch>
                    <Route path="/mail/Compose" component={MailCompose} />
                    <Route path="/mail/:mailId" component={MailDetails} />
                    <MailList emails={mails} onActionClick={onActionClick} />
                </Switch>

            </section>
        </Router>
    }
}