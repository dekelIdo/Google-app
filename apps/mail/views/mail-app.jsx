import { MailFilter } from "../cmps/mail-filter.jsx"
import { MailList } from "../cmps/mail-list.jsx"
import { MailDetails } from "../cmps/mail-details.jsx"
import { MailCompose } from "../cmps/mail-compose.jsx"
import { mailService } from "../services/mail.service.js"
import { MailAside } from "../cmps/mail-aside.jsx"
// import { MailTrash } from "../cmps/mail-trash.jsx"

const Router = ReactRouterDOM.HashRouter
const { Route, Switch, Link } = ReactRouterDOM

export class MailApp extends React.Component {
    state = {
        mails: [],
        criteria: {
            status: 'inbox',
            txt: 'puki', 
            isRead: true, 
            isStared: true,  
        }
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevState.criteria.status !== this.state.criteria.status) {
            this.loadMails()
        }
    }
    onClickDeleted = () => {
        console.log('show me trash')
        let { criteria } = this.state

        this.setState((prevState) => ({ ...prevState, criteria: { ...criteria, status: 'trash' } }), this.loadMails())

    }
    
    onClickFavorite = () => {
        console.log('show favorite')
        let { criteria } = this.state
        this.setState((prevState) => ({ ...prevState, criteria: { ...criteria, isStared: isStared? false : true } }), this.loadMails())

    }

    onClickInbox = () => {
        let { criteria } = this.state

        this.setState((prevState) => ({ ...prevState, criteria: { ...criteria, status: 'inbox' } }), this.loadMails())
    }

    componentDidMount() {
        this.loadMails()
    }

    loadMails = () => {
        const { criteria } = this.state

        mailService.getInboxEmails(criteria)
            .then(mails => this.setState({ mails }))
    }

    onMarkStared =(mailId)=>{
        const mails = mailService.MarkAsStared(mailId)

        this.setState({mails:mails})
    }

    onMarkRead = (mailId) => {
        const mails = mailService.markRead(mailId)
        this.setState({ mails: mails })
    }


    onRemoveMail = (mailId) => {
        mailService.removeMail(mailId)
        let { mails } = this.state

        mails = mails.filter(mail => mail.id !== mailId)

        this.setState({ mails })
    }

    render() {
        const { mails } = this.state
        const { onRemoveMail, onMarkRead, onClickDeleted,onMarkStared } = this

        return <Router>
            <section className="mail-app">
                <MailAside onClickDeleted={onClickDeleted} onClickInbox={this.onClickInbox} />
                {/* <MailCompose /> */}
                <MailFilter />

                <Switch>
                    <Route path="/mail/Compose" component={MailCompose} />
                    {/* <Route path="/mail/trash" component={MailTrash} /> */}
                    <Route path="/mail/:mailId" component={MailDetails} />
                    <MailList emails={mails} onRemoveMail={onRemoveMail} onMarkRead={onMarkRead} onMarkStared={onMarkStared} />
                </Switch>

            </section>
        </Router>
    }
}