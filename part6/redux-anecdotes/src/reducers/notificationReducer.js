import { createSlice } from "@reduxjs/toolkit"


const notificationSlice = createSlice({
    name: 'notification',
    initialState: '',
    reducers: {
        setNotification(state, action) {
            return action.payload
        },
        removeNotification() {
            return ''
        }
    }
})

export const newNotification = (message, seconds) => {
    return async dispatch => {
        dispatch(setNotification(message))
        setTimeout(() => dispatch(removeNotification()), seconds * 1000)
    }
}

export const { setNotification, removeNotification } = notificationSlice.actions

export default notificationSlice.reducer