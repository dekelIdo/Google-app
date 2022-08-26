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
}

const loggedInUser = {
    email: 'user@appsus.com',
    fullname: 'Mahatma Appsus'
}

const KEY = 'emailsDB'

function getInboxEmails(criteria) {
    let emails = _loadFromStorage()
    if (!emails) {
        emails = _createEmails()
        _saveToStorage(emails)
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

        if (criteria.status === 'inbox') {
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
    }
    return Promise.resolve(emails)
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
    console.log('is you draft?',email)
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
        sentAt:  new Date(),
        isDeleted: false,
        isStared: false,
        isRead: true,
        isDraft: false,
        body: body ? body : 'body message',
    }

    emails.push(mailToSend)
    _saveToStorage(emails)
}

function _createEmail() {
    const sentFrom = Math.random() > 0.5 ? 'dr.dre@tupac.com' : 'eldadYikne@gmail.net.il'
    const randomSubject = Math.random() > 0.5 ? 'Would love to catch up sometimes' : 'I hope that in this year to come, you make mistakes'
    const randomSentence = Math.random() > 0.5 ? 'then you are making new things, trying new things, learning, living, pushing yourself, changing yourself, changing your world. Youre doing things youve never done before, and more importantly, you doing something. The year end brings no greater pleasure then the opportunity to ,express to you seasons greetings and good wishes, May your holidays and new year be filled with joy, As the old year retires and a new one is born, we commit into the hands of our creator the, happenings of the past year and ask for ,direction and guidance in the new one, May he grant us his grace, his tranquility and His wisdom!' : 'the color of television that i would like you to bring me, my darling you make mistakes his tranquility and His wisdom!'
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
        subject: 'Miss you!',
        body: 'Would love to catch up sometimes',
        isRead: false,
        isStared: false,
        isDeleted: false,
        sentAt: 1551133930594,
        to: 'momo@momo.com',
        labels: [],
        id: utilService.makeId(),
        subject: 'Love you',
        body: 'want to play together',
        isRead: false,
        sentAt: 1551133930594,
        to: 'momo@momo.com'
    },
    {
        id: utilService.makeId(),
        status: 'inbox',
        subject: 'Miss you!',
        body: 'Would love to catch up sometimes',
        isRead: false,
        isStared: false,
        isDeleted: false,
        sentAt: 1551133930594,
        to: 'momo@momo.com',
        labels: [],
        id: utilService.makeId(),
        subject: 'Love you',
        body: 'want to play together',
        isRead: false,
        sentAt: 1551133930594,
        to: 'momo@momo.com'
    },
]

function _createEmails() {
    const emails = []
    for (let i = 0; i < 7; i++) {

        emails.push(_createEmail())
    }
    return emails
}
