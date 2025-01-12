import axios from 'axios'

export const getAnecdotes = () => {
    const request = axios.get('http://localhost:3001/anecdotes')
    return request.then(response => response.data)
}

export const createAnecdote = (anecdote) => {
    const request = axios.post('http://localhost:3001/anecdotes', anecdote)
    return request.then(response => response.data)
}

export const updateAnecdote = (anecdote) => {
    const request = axios.put(`http://localhost:3001/anecdotes/${anecdote.id}`, anecdote)
    return request.then(response => response.data)
}