
import { storageService } from '../../../services/storage.service.js'
import { utilService } from '../../../services/util.service.js'
const KEY = "notesDB"

export const noteService = {
    query,
    addNote,
    removeNote,
    getNoteById,
    setNoteDone,
    pinedNote,
}


function removeNote(noteId) {
    let notes = _loadNotesFromStorage() || gNotes
    const newNotes = notes.filter(note => note.id !== noteId)
    _saveNotesToStorage(newNotes)
    return Promise.resolve(newNotes)
}
function pinedNote(noteId) {
    let notes = _loadNotesFromStorage() || gNotes
    const currNote = notes.find(note => note.id === noteId)
    const currNoteIdx = notes.findIndex(note => note.id === noteId)
    notes.splice(currNoteIdx, 1)
    notes.unshift(currNote)
    _saveNotesToStorage(notes)
    return Promise.resolve(notes)


}
function addNote(newTxt, newTitle, type, backgroundColor, image, urlVideo) {
    if (!newTxt || !newTitle) return alert('enter text')
    let notes = _loadNotesFromStorage() || gNotes
    const newNote = _creatNote(newTxt, newTitle, type, backgroundColor, image, urlVideo)
    console.log('addnewNote', newNote, urlVideo);
    notes.unshift(newNote)
    _saveNotesToStorage(notes)
    console.log(notes);
    return Promise.resolve(notes)
}
function setNoteDone(noteId, todoId) {
    let notes = _loadNotesFromStorage() || gNotes
    const currNote = notes.find(note => note.id === noteId)
    console.log('currNote', currNote);
    console.log('UserTodo', todoId);
    const cuurTodo = currNote.info.todos.find(todo => todo.id === todoId)
    console.log('cuurTodo', cuurTodo);
    cuurTodo.done = !cuurTodo.done
    _saveNotesToStorage(notes)
    return Promise.resolve(notes)

}

function getNoteById(noteId) {
    let notes = _loadNotesFromStorage() || gNotes
    const currNote = notes.find(note => note.id === noteId)
    return currNote

}
function _creatNote(newTxt, newTitle, type, backgroundColor = "#FFFFFF", image, urlVideo) {

    if (type === 'todos') {
        return {
            id: utilService.makeId(),
            type: "note-todos",
            info: {
                label: newTitle,
                todos: _splitTodos(newTxt)

            },
            style: {
                backgroundColor: backgroundColor,

            }
        }
    }
    if (type === 'note') {
        return {
            id: utilService.makeId(),
            type: "note-txt",
            isPinned: false,
            info: {
                title: newTitle,
                txt: newTxt
            },
            style: {
                backgroundColor: backgroundColor,

            }
        }
    }
    if (type === 'img') {
        return {
            id: utilService.makeId(),
            type: "note-img",
            info: {
                url: `${image}`,
                title: newTitle
            },
            style: {
                backgroundColor: backgroundColor,
            }
        }
    }
    if (type === 'video') {
        console.log('videovideovideovideovideo');
        return {
            id: utilService.makeId(),
            type: "note-video",
            info: {
                url: urlVideo,
                title: newTitle,
            },
            style: {
                backgroundColor: backgroundColor,

            }
        }
    }
}

function _splitTodos(newTxt) {
    const splitedTxt = newTxt.split(',')
    const todoArr = splitedTxt.map(todo => { return { txt: `${todo}`, done: false, id: utilService.makeId() } })
    return todoArr
}


function query() {

    let notes = _loadNotesFromStorage() || gNotes

    return Promise.resolve(notes)
}

function _saveNotesToStorage(notes) {
    storageService.saveToStorage(KEY, notes)
}

function _loadNotesFromStorage() {
    return storageService.loadFromStorage(KEY)
}

const gNotes = [
    {
        id: utilService.makeId(),
        type: "note-txt",
        isPinned: true,
        info: {
            txt: "Fullstack Me Baby!"
        },
        style: {
            backgroundColor: "#FFDC00",
            
        }
    },
    {
        id: utilService.makeId(),
        type: "note-video",
        info: {
            url: "https://www.youtube.com/watch?v=4Dzhgr8xBpI&t=1s&ab_channel=DEKEL",
            title: "my party"
        },
        style: {
            backgroundColor: "#FFFFFF",

        }
    },
    {
        id: utilService.makeId(),
        type: "note-txt",
        isPinned: true,
        info: {
            txt: "buy to Dekel underwer"
        },
        style: {
            backgroundColor: "#3D9970",

        }
    },
    {
        id: utilService.makeId(),
        type: "note-img",
        info: {
            url: "https://ynet-images1.yit.co.il/picserver5/crop_images/2021/07/22/10840408/10840408_0_0_1000_668_0_x-large.jpg",
            title: "Bobi and Me"
        },
        style: {
            backgroundColor: "#FFFFFF"
        }
    },
    {
        id: utilService.makeId(),
        type: "note-todos",
        info: {
            label: "Get my stuff together",
            todos: [
                { txt: "Driving liscence", done: false },
                { txt: "Coding power", done: false }
            ]
        },
        style: {
            backgroundColor: "#FFFFFF",

        }
    },
    {
        id: utilService.makeId(),
        type: "note-video",
        info: {
            url: "https://www.youtube.com/watch?v=2dSgVXqZ4xk&ab_channel=RelaxCafeMusic",
            title: "my party"
        },
        style: {
            backgroundColor: "#39CCCC",

        }
    },
    {
        id: utilService.makeId(),
        type: "note-todos",
        info: {
            label: "To buy:",
            todos: [
                { txt: "ice-cream", done: false },
                { txt: "bamba", done: false },
                { txt: "milk", done: false }
            ]
        },
        style: {
            backgroundColor: "#FF4136",
    
        }
    },
];

