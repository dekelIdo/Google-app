
import { storageService } from '../../../services/storage.service.js'
import { utilService } from '../../../services/util.service.js'
const KEY="notesDB"

export const noteService = {
    query,
    creatNote,
}
function creatNote(newTxt){
    return {
        id: utilService.makeId(),
        type: "note-txt",
        isPinned: false,
        info: {
            txt: newTxt
        },
        style: {
            backgroundColor: "#00d",
            
        }
    }

}



function query() {

    let notes = _loadFromStorage() || gNotes

    return Promise.resolve(notes)
}

function _saveBooksToStorage(notes) {
    storageService.saveToStorage(KEY, notes)
}

function _loadFromStorage() {
    return storageService.loadFromStorage(KEY)
}

const gNotes = [
    {
        id: utilService.makeId(),
        type: "note-txt",
        isPinned: true,
        info: {
            txt: "Fullstack Me Baby!"
        }
    },
    {
        id:  utilService.makeId(),
        type: "note-img",
        info: {
            url: "https://ynet-images1.yit.co.il/picserver5/crop_images/2021/07/22/10840408/10840408_0_0_1000_668_0_x-large.jpg",
            title: "Bobi and Me"
        },
        style: {
            backgroundColor: "#00d"
        }
    },
    {
        id:  utilService.makeId(),
        type: "note-todos",
        info: {
            label: "Get my stuff together",
            todos: [
                { txt: "Driving liscence", doneAt: null },
                { txt: "Coding power", doneAt: 187111111 }
            ]
        }
    },
    {
        id:  utilService.makeId(),
        type: "note-video",
        info: {
            url: "https://www.youtube.com/watch?v=4Dzhgr8xBpI&ab_channel=DEKEL",
            title: "my party"
        },
        style: {
            backgroundColor: "#00d",
            
        }
    },
];

