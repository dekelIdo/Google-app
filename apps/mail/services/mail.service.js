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
    createNewMail
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


// not in use
function getInboxEmailsSimple() {
    let emails = _loadFromStorage() || gEmails
    return emails
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
    // mails = mails.filter(mail => mail.id !== mailId)
    const email = mails.find(email => email.id === mailId)
    console.log('email:', email)

    if (email.isDeleted) {
        console.log('meawo')
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
    // ? email.isRead = false : email.isRead = true
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
        sentAt: 1551133930594,
        isDeleted: false,
        isStared: false,
        isRead: false,
        body: body ? body : 'body message',
    }

    emails.push(mailToSend)
    _saveToStorage(emails)
}

function _createEmail() {
    return {
        id: utilService.makeId(),
        status: 'inbox',
        subject: 'Miss you!',
        body: 'Would love to catch up sometimes',
        isRead: false,
        isStared: false,
        isDeleted: false,
        sentAt: 1551133930594,
        to: 'momo@momo.com',
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
