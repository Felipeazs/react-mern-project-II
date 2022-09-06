import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import noteService from './note-service'

const initialState = {
    notes: [],
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: '',
}

export const getNotes = createAsyncThunk('notes/getAll', async (id, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.token
        const notes = await noteService.getNotes(id, token)
        return notes
    } catch (error) {
        const message =
            (error.response && error.response.data && error.response.data.message) ||
            error.message ||
            error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

export const noteSlice = createSlice({
    name: 'notes',
    initialState,
    reducers: {
        reset: state => initialState,
    },
    extraReducers: builders => {},
})

export const { reset } = noteSlice.actions
export default noteSlice.reducer
