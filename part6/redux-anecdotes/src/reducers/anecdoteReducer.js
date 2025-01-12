import { createSlice } from '@reduxjs/toolkit'
import anecdoteService from '../services/anecdotes'



const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    createAnecdote(state, action) {
      state.push(action.payload)
    },
    vote(state, action) {
      const id = action.payload
      const anecdoteToVote = state.find(n => n.id === id)
      const votedAnecdote = {
        ...anecdoteToVote,
        votes: anecdoteToVote.votes + 1
      }
      anecdoteService.update(votedAnecdote)
      return state.map(anecdote => anecdote.id !== id ? anecdote : votedAnecdote)
      .sort((a, b) => b.votes - a.votes)
    },
    appendAnecdote(state, action) {
      state.push(action.payload)
    },
    setAnecdotes(state, action) {
      return action.payload
    }

  }
})


export const { vote, appendAnecdote, createAnecdote, setAnecdotes } = anecdoteSlice.actions

export default anecdoteSlice.reducer