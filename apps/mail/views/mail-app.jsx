import { MailFilter } from "../cmps/mail-filter.jsx"
import { MailList } from "../cmps/mail-list.jsx"
import { MailDetails } from "../cmps/mail-details.jsx"
import { MailCompose } from "../cmps/mail-compose.jsx"
import { mailService } from "../services/mail.service.js"
import { MailAside } from "../cmps/mail-aside.jsx"
import { UserMsg } from "../../../cmps/user-msg.jsx"
import { showSuccessMsg } from "../../../services/event-bus.service.js"


const ACTIONS = {
    remove: 'remove',
    read: 'read',
    star: 'star',
    draft: 'draft'
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
        },
        newMail: false,
        sideBarShown: false,
    }

    componentDidMount() {
        this.loadMails()
        
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevState.criteria.status !== this.state.criteria.status ||
            prevState.criteria.txt !== this.state.criteria.txt ||
            prevState.criteria.isRead !== this.state.criteria.isRead) {
            this.loadMails()
        }
    }

    loadMails = () => {
        const { criteria } = this.state
        mailService.getInboxEmails(criteria)
            .then(mails => this.setState({ mails }))
    }

    onUnReadRouteClick = () => {
        let { criteria } = this.state
        this.setState((prevState) => ({ ...prevState, criteria: { ...criteria, isRead: false } }), this.loadMails())
    }

    onRouteClick = (status) => {
        let { criteria } = this.state
        this.setState((prevState) => ({ ...prevState, criteria: { ...criteria, status, isRead: true } }), this.loadMails())
    }

    onSetSearch = (val) => {
        let { criteria } = this.state
        this.setState((prevState) => ({ ...prevState, criteria: { ...criteria, txt: val } }), this.loadMails())
    }

    onRemoveMail = (mailId) => {
        mailService.removeMail(mailId)
        showSuccessMsg('mail removed')
    }

    onMarkStared = (mailId) => {
        mailService.MarkAsStared(mailId)
    }

    onMarkRead = (mailId) => {
        mailService.markRead(mailId)
    }

    onMarkDraft = (mailId) => {
        mailService.markDraft(mailId)
        showSuccessMsg('save as important')
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
        if (action === ACTIONS.draft) {
            this.onMarkDraft(mailId)
        }
        this.loadMails()
    }

    onNewMail = () => {
        this.setState({ newMail: !this.state.newMail })
    }

    onClickGrip = () => {
        this.setState({ sideBarShown: !this.state.sideBarShown })
    }

    render() {
        const { mails, criteria, newMail, sideBarShown } = this.state
        const { onActionClick, onRouteClick, onSetSearch, onNewMail, onClickGrip, onUnReadRouteClick } = this
        const sideBarClass = sideBarShown? ' menu-open' : ''

        return <Router>
            <section className="mail-app">
                <UserMsg />
                <button className="mobile-new-mail" onClick={() => onNewMail()}><span className="fa pencil"></span>create new mail </button>
                <MailAside sideBarClass={sideBarClass} onRouteClick={onRouteClick} onNewMail={onNewMail} onUnReadRouteClick={onUnReadRouteClick} onClickGrip={onClickGrip} />
                {newMail && <MailCompose onNewMail={onNewMail} />}
                <MailFilter onClickGrip={onClickGrip} criteria={criteria} onSetSearch={onSetSearch} />
                <Switch>

                    <Route path="/mail/Compose" component={MailCompose} />
                    <Route path="/mail/:mailId" component={MailDetails} onActionClick={onActionClick} />

                    <MailList emails={mails} onActionClick={onActionClick} />
                </Switch>

            </section>
        </Router>
    }
}
