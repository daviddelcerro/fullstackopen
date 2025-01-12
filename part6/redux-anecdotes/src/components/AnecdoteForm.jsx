import { useDispatch } from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteReducer'
import anecdoteService from '../services/anecdotes'
import { newNotification } from '../reducers/notificationReducer'

const AnecdoteForm = () => {
    const dispatch = useDispatch()
      const addAnecdote = async (event) => {
        event.preventDefault()
        const content = event.target.anecdote.value
        event.target.anecdote.value = ''
        const newAnecdote = await anecdoteService.createNew(content)
        dispatch(createAnecdote(newAnecdote)) 
        dispatch(newNotification((`you created '${content}'`) , 5))
      }

    return (
        <div>
          <h2>create new</h2>
          <form onSubmit={addAnecdote}>
            <div>
              <input name = "anecdote"/>
            </div>
            <button>create</button>
          </form>
        </div>
      )
}

export default AnecdoteForm