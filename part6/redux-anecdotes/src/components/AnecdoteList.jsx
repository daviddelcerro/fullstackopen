import { useSelector, useDispatch } from 'react-redux'
import { vote } from '../reducers/anecdoteReducer'
import { newNotification } from '../reducers/notificationReducer'

const AnecdoteList = () => {
  const anecdotesState = useSelector(state => state.anecdotes)
  const filterState = useSelector(state => state.filter)
  const anecdotes = anecdotesState.filter(a => a.content.toLowerCase().includes(filterState.toLowerCase()))
  const dispatch = useDispatch()

  const addVote = (id) => {
    console.log('vote', id)
    dispatch(vote(id))
    dispatch(newNotification((`you voted '${anecdotes.find(a => a.id === id).content}'`), 3))
  }

  return (
    <div>
    {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => addVote(anecdote.id)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default AnecdoteList