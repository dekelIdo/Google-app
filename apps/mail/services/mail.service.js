import { storageService } from "../../../services/storage.service.js"

import { utilService } from "../../../services/util.service.js"

export const mailService = {
    // query,
    getInboxEmails,
    findEmailById,
    removeMail,
    getUserLogIn,
    markRead,
}

const loggedInUser = {
    email: 'user@appsus.com',
    fullname: 'Mahatma Appsus'
}

const KEY = 'emailsDB'

function getInboxEmails(filterBy) {
    let emails = _loadFromStorage()
    if (!emails) {
        emails = _createEmails()
        _saveToStorage(emails)
    }

    return Promise.resolve(emails)
}

function removeMail(mailId) {
    let mails = _loadFromStorage()
    mails = mails.filter(mail => mail.id !== mailId)
    _saveToStorage(mails)
    return mails
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

function markRead(email){
let emails = _loadFromStorage() || gEmails
 email.isRead = true 
 console.log('mail',email)
_saveToStorage(emails)
console.log('mlssssss',emails)
}


function _createEmail() {
    return {
        id: utilService.makeId(),
        subject: 'Miss you!',
        body: 'Would love to catch up sometimes',
        isRead: false,
        sentAt: 1551133930594,
        to: 'momo@momo.com'
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
        subject: 'Miss you!',
        body: 'Would love to catch up sometimes',
        isRead: false,
        sentAt: 1551133930594,
        to: 'momo@momo.com'
    }, {
        id: utilService.makeId(),
        subject: 'Love you',
        body: 'want to play together',
        isRead: false,
        sentAt: 1551133930594,
        to: 'momo@momo.com'
    }, {
        id: utilService.makeId(),
        subject: 'Hate YOU',
        body: 'i dont want to see you anymore',
        isRead: false,
        sentAt: 1551133930594,
        to: 'momo@momo.com'
    }
]

function _createEmails() {
    const emails = []
    for (let i = 0; i < 5; i++) {

        emails.push(_createEmail())
    }
    return emails
}
