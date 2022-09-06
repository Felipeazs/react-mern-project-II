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

const noteService = {
    getNotes,
}

export default noteService
