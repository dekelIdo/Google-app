import { storageService } from "../../../services/storage.service.js"
import { utilService } from "../../../services/util.service.js"


export const mailService = {
    // query,
    getInboxEmails,
    findEmailById,
    findById,
    removeMail,
    getUserLogIn,
    markRead,
    MarkAsStared,
    createNewMail,
    markDraft,
    getCountUnreadMails,
}

const loggedInUser = {
    email: 'dekel@appsus.com',
    fullName: 'Dekel Ido'
}

const KEY = 'emailsDB'

function getInboxEmails(criteria) {
    let emails = _loadFromStorage() || gEmails
    if (!emails) {
        emails = gEmails
        _saveToStorage(emails)
        // emails = _createEmails()
        // _saveToStorage(emails)
    }

    if (criteria) {
        if (criteria.txt) {
            emails = emails.filter(email => email.body.includes(criteria.txt) || email.to.includes(criteria.txt)
                && criteria.status === 'inbox' && email.isDeleted === false)
            return Promise.resolve(emails)
        }

        if (criteria.status === 'trash') {
            emails = emails.filter(email => email.isDeleted === true)
            return Promise.resolve(emails)
        }

        if (criteria.status === 'draft') {
            emails = emails.filter(email => email.isDeleted === false && email.isDraft === true)
            return Promise.resolve(emails)
        }

        if (criteria.status === 'inbox' && criteria.isRead === true) {
            emails = emails.filter(email => email.isDeleted === false && email.status === 'inbox')
            return Promise.resolve(emails)
        }

        if (criteria.status === 'sent') {
            emails = emails.filter(email => email.isDeleted === false && email.status === 'sent')
            return Promise.resolve(emails)
        }

        if (criteria.status === 'stared') {
            emails = emails.filter(email => email.isStared === true)
            return Promise.resolve(emails)
        }

        if (criteria.isRead === false && criteria.status === 'inbox') {
            console.log(criteria)
            emails = emails.filter(email => email.isRead === false
                && email.isDeleted === false
                && criteria.status === 'inbox')
            return Promise.resolve(emails)
        }
    }
    return Promise.resolve(emails)
}

function getCountUnreadMails() {
    let emails = _loadFromStorage()
    if (!emails) {
        emails = gEmails
        _saveToStorage(emails)
        // emails = _createEmails()
        // _saveToStorage(emails)
    }

    let unReadMails = emails.filter(email => !email.isRead)
    console.log(unReadMails.length)
    return unReadMails.length
}

function findEmailById(emailId) {
    if (!emailId) Promise.resolve(null)
    const emails = _loadFromStorage() || gEmails
    const currEmail = emails.find(email => email.id === emailId)
    return Promise.resolve(currEmail)
}

function findById(emailId) {
    if (!emailId) Promise.resolve(null)
    const emails = _loadFromStorage() || gEmails
    const currEmail = emails.find(email => email.id === emailId)
    return currEmail
}

function removeMail(mailId) {
    let mails = _loadFromStorage()
    const email = mails.find(email => email.id === mailId)

    if (email.isDeleted) {
        const filteredMails = mails.filter(mail => mail.id !== mailId)
        _saveToStorage(filteredMails)
    } else {
        email.isRead = true
        email.isDeleted = true
        _saveToStorage(mails)
    }
}

function markRead(emailId) {
    let emails = _loadFromStorage() || gEmails
    const email = emails.find(email => email.id === emailId)

    email.isRead = !email.isRead
    _saveToStorage(emails)
}

function markDraft(emailId) {
    let emails = _loadFromStorage() || gEmails
    const email = emails.find(email => email.id === emailId)
    email.isDraft = !email.isDraft
    console.log('is you draft?', email)
    _saveToStorage(emails)
}

function MarkAsStared(emailId) {
    let emails = _loadFromStorage() || gEmails
    const email = emails.find(email => email.id === emailId)
    email.isStared = !email.isStared
    _saveToStorage(emails)

}

function createNewMail(address, subject, body) {
    const emails = _loadFromStorage() || gEmails

    const mailToSend = {
        id: utilService.makeId(),
        status: 'sent',
        subject: subject ? subject : 'write somthing',
        to: address ? address : 'nowhere',
        sentAt: new Date(),
        isDeleted: false,
        isStared: false,
        isRead: true,
        isDraft: false,
        body: body ? body : 'body message',
    }

    emails.push(mailToSend)
    _saveToStorage(emails)
}

function _createEmails() {
    const emails = []
    for (let i = 0; i < 7; i++) {

        emails.push(_createEmail())
    }
    return emails
}

function _createEmail() {
    const sentFrom = Math.random() > 0.5 ? 'dr.dre@tupac.com' : 'eldadYikne@gmail.net.il'
    const randomSubject = Math.random() > 0.5 ? 'Would love to catch up sometimes' : 'I hope that in this year to come, you make mistakes'
    // const randomSentence = Math.random() > 0.5 ? 'then you are making new things, trying new things, learning, living, pushing yourself, changing yourself, changing your world. Youre doing things youve never done before, and more importantly, you doing something. The year end brings no greater pleasure then the opportunity to ,express to you seasons greetings and good wishes, May your holidays and new year be filled with joy, As the old year retires and a new one is born, we commit into the hands of our creator the, happenings of the past year and ask for ,direction and guidance in the new one, May he grant us his grace, his tranquility and His wisdom!' : 'the color of television that i would like you to bring me, my darling you make mistakes his tranquility and His wisdom!'
    const randomSentence = utilService.makeLorem(70)
    return {
        id: utilService.makeId(),
        status: 'inbox',
        subject: randomSubject,
        body: randomSentence,
        isRead: false,
        isStared: false,
        isDeleted: false,
        isDraft: false,
        sentAt: 1551133930594,
        to: sentFrom,
        labels: []
    }
}

function getUserLogIn() {
    return loggedInUser
}

function _saveToStorage(emails) {
    storageService.saveToStorage(KEY, emails)
}

function _loadFromStorage() {
    return storageService.loadFromStorage(KEY)
}

const gEmails = [
    {
        id: utilService.makeId(),
        status: 'inbox',
        subject: 'Diesel pre sale',
        body: 'Mens clothing and fashion accessories: explore this exclusive collection and shop online on the Official Store. Diesel fast delivery and easy returns!',
        isRead: false,
        isStared: false,
        isDeleted: false,
        isDraft: false,
        sentAt: 1661133930594,
        to: 'Diesel@brand.com',
        labels: []
    },
    {
        id: utilService.makeId(),
        status: 'inbox',
        subject: 'Best social for developers',
        body: '2022 LinkedIn Ireland Unlimited Company, Wilton Plaza, Wilton Place, Dublin 2. LinkedIn is a registered business name of LinkedIn Ireland Unlimited Company. LinkedIn and the LinkedIn logo are registered trademarks of LinkedIn.',
        isRead: false,
        isStared: false,
        isDeleted: false,
        isDraft: false,
        sentAt: 1661033930594,
        to: 'res@Linkedin.com',
        labels: []
    },
        {
        id: utilService.makeId(),
        status: 'inbox',
        subject: 'Just do it',
        body: 'While the Air Jordan XXXVII is built for multidirectional play, the shoe’s components are rooted in the NSRL’s study of the three stages of jumping: crash, load and launch. For the crash phase (think the instant deceleration on the jump, or even the landing on a rebound), the shoe’s heel features a TPU mold encasing responsive Formula 23 foam, which acts as a crash-landing pad for all of that energy striking down into the floor. The newest flagship foam from Jordan Brand, Formula 23 is designed to be lightweight and',
        isRead: false,
        isStared: false,
        isDeleted: false,
        isDraft: false,
        sentAt: 1656133930594,
        to: 'Nike@JustDoIt.com',
        labels: []
    },
    {
        id: utilService.makeId(),
        status: 'inbox',
        subject: 'Udacity response',
        body: 'Increase your earning potential by enrolling in a Udacity Nanodegree program tod‍‍ay! For as few as 1‍‍0 hou‍‍rs a we‍‍ek, you can get the in-demand skills you need to help land a high-paying tech job!',
        isRead: false,
        isStared: false,
        isDeleted: false,
        isDraft: false,
        sentAt: 1646131930594,
        to: 'support@udacity.com',
        labels: []
    },
    {
        id: utilService.makeId(),
        status: 'inbox',
        subject: 'Diesel pre sale',
        body: 'Mens clothing and fashion accessories: explore this exclusive collection and shop online on the Official Store. Diesel fast delivery and easy returns!',
        isRead: false,
        isStared: false,
        isDeleted: false,
        isDraft: false,
        sentAt: 1616131920594,
        to: 'Diesel@brand.com',
        labels: []
    },
    {
        id: utilService.makeId(),
        status: 'inbox',
        subject: 'Ready for your coming',
        body: 'al issues and clears leading global brand credit cards: Visa, MasterCard and Diners Club (marketed exclusively by Cal) and pro¬vides non-bank credit to its ..',
        isRead: false,
        isStared: false,
        isDeleted: false,
        isDraft: false,
        sentAt: 1606131920594,
        to: 'Cal@visa.com',
        labels: []
    },
    {
        id: utilService.makeId(),
        status: 'inbox',
        subject: 'New summer is here',
        body: 'first show has sold out in one day. A second and final show will take place on Wednesday, October 19, 2022 in the Ziggo Dome, Amsterdam Prepare for an audiovisual experience that pushes light & audio technology to the limits, and submerge yourself into the sounds of Eric Prydz. Register now for the pre-sale at reduced price and prepare for an',
        isRead: false,
        isStared: false,
        isDeleted: false,
        isDraft: false,
        sentAt: 1551133950694,
        to: 'res@tomorrow.com',
        labels: []
    },
    {
        id: utilService.makeId(),
        status: 'inbox',
        subject: 'Terms for login',
        body: 'eview Terms and Rates for New Accounts. Important information on redeeming Cash Rewards: You need to have a PayPal Balance account to transfer your Cash',
        isRead: false,
        isStared: false,
        isDeleted: false,
        isDraft: false,
        sentAt: 1551133940564,
        to: 'paypal@mail.com',
        labels: []
    },
    {
        id: utilService.makeId(),
        status: 'inbox',
        subject: 'ZOOM',
        body: 'This offer is only available to new customers purchasing a Pro Annual Plan Online. This offer is not available to customers with pre-existing discounts. Maximum of 9 Annual Licenses per Purchase. This coupon has no cash value and can only be used for up to 9 Pro Annual Licenses. Coupon must be redeemed by 12/31/22 at 11:59PM PT and will be effective for 1 annual billing cycle. This cannot be combined, exchanged, or used in conjunction with any other offer. Please note that Federal, State and Local governments are not',
        isRead: false,
        isStared: false,
        isDeleted: false,
        isDraft: false,
        sentAt: 1551133930594,
        to: 'Team@zoom.us',
        labels: []
    },

]

