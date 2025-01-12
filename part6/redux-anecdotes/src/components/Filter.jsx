import { useDispatch } from 'react-redux'
import { setFilter } from '../reducers/filterReducer'
const Filter = () => {
    const dispatch = useDispatch()
    const handleChange = (event) => {
        event.preventDefault()
        console.log(event.target.value)
        dispatch(setFilter(event.target.value))
    }

    const style = {
        marginBottom: 10
    }

    return (
        <div style={style}>
            Filter : 
            <input name='filter' onChange={handleChange} /> 
        </div>
    )
}

export default Filter