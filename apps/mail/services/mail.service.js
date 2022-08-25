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

        if (criteria.status === 'trash') {
            emails = emails.filter(email => email.isDeleted === true)
         console.log('trash',emails)
         return Promise.resolve(emails)

        }
        
        if (criteria.status === 'inbox') {
            emails = emails.filter(email => email.isDeleted === false)
            console.log('inbose',emails)
            return Promise.resolve(emails)

        }
        if (criteria.status === 'sent') {
            emails = emails.filter(email => email.isDeleted === false)
            console.log('sent',emails)
            return Promise.resolve(emails)
        }

        if (criteria.txt) {
            emails = emails.filter(email => email.body === criteria.txt)
        }

        if (criteria.isRead) {
            emails = emails.filter(email => email.isRead)
        }

        if (criteria.isStared) {
            emails = emails.filter(email => email.isStared === criteria.isStared)
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
    email.isDeleted = true
    _saveToStorage(mails)
    return mails
}


function markRead(emailId) {
    let emails = _loadFromStorage() || gEmails

    const email = emails.find(email => email.id === emailId)

    email.isRead ? email.isRead = false: email.isRead = true

    _saveToStorage(emails)
    return emails
}

function MarkAsStared(emailId) {
    let emails = _loadFromStorage() || gEmails

    const email = emails.find(email => email.id === emailId)

    email.isStared? email.isStared = false : email.isStared = true
    _saveToStorage(emails)
    return emails
}

function createNewMail(address, subject, body) {
    const emails = _loadFromStorage() || gEmails

    const mailToSend = {
        id: utilService.makeId(),
        status: 'sent',
        subject: subject ? subject : 'nothing',
        to: address ? address : 'subject',
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
