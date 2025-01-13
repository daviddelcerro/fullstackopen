import { useMutation, useQueryClient } from '@tanstack/react-query'
import { createAnecdote } from '../request'
import { useContext } from 'react'
import NotificationContext from '../NotificationContext'
const AnecdoteForm = () => {

  const [notification, notificationDispatch] = useContext(NotificationContext)
  const queryClient = useQueryClient()

  const newAnecdoteMutation = useMutation({
    mutationFn: createAnecdote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['anecdotes'] })
    },
    onError: () => {
      notificationDispatch({ type: 'SET_NOTIFICATION', payload: 'too short anecdote, must have length 5 or more' })
      setTimeout(() => {
        notificationDispatch({ type: 'REMOVE_NOTIFICATION' })
      }, 5000)
    }
  })

  const onCreate = (event) => {
    event.preventDefault()


    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    console.log(content)
    notificationDispatch({ type: 'SET_NOTIFICATION', payload: `you created '${content}'` })
    newAnecdoteMutation.mutate({ content: content, votes: 0 })
   
}

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name='anecdote' />
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm
