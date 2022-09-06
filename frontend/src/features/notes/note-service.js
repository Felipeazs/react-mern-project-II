import axios from 'axios'

const API_URL = '/api/tickets/'

//get user ticket notes
const getNotes = async (id, token) => {
    const config = {
        headers: {
            Authorization: 'Bearer ' + token,
        },
    }

    const response = await axios.get(`${API_URL}${id}/notes`, config)

    return response.data
}
//create notes
const createNote = async (noteText, ticketId, token) => {
    const config = {
        headers: {
            Authorization: 'Bearer ' + token,
        },
    }

    console.log('noteText', noteText)
    const response = await axios.post(`${API_URL}${ticketId}/notes`, { text: noteText }, config)

    return response.data
}

const noteService = {
    getNotes,
    createNote,
}

export default noteService
