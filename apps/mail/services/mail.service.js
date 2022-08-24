import { storageService } from "../../../services/storage.service.js"

import { utilService } from "../../../services/util.service.js"

export const mailService = {
    // query,
    getInboxEmails,
    findEmailById,
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


function findEmailById(emailId){
if(!emailId) Promise.resolve(null)
const emails = _loadFromStorage()|| gEmails
const cureEmail = emails.find(email=> email.id=== emailId)
return Promise.resolve(cureEmail)

}


function _createEmail() {
    return    {
        id: utilService.makeId(),
        subject: 'Miss you!',
        body: 'Would love to catch up sometimes',
        isRead: false,
        sentAt: 1551133930594,
        to: 'momo@momo.com'
    }
}

function  _createEmails() {
    const emails = []
    for (let i = 0; i < 5; i++) {

        emails.push(_createEmail())
    }
    return emails
}


function _saveToStorage(emails) {
    storageService.saveToStorage(KEY ,emails)
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