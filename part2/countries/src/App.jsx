import { useState,useEffect } from 'react'
import './App.css'
import axios from 'axios'

function App() {
  const [countrie,setCountrie] = useState(null)
  const [listcountrie,setListCountrie] = useState([])

 
  const request = axios.get('https://studies.cs.helsinki.fi/restcountries/api/all')
  request.then((response) => {setListCountrie(response.data)})
  

  useEffect(() => {
    console.log(listcountrie)

  },[countrie])

  return (
    <>
      <h1>Countries</h1>
      <div>
        <form>
          <input type="text" onChange={(event) => setCountrie(event.target.value)}/>
          <button type="submit">find</button>
        </form>
      </div>
    </>
  )
}

export default App
