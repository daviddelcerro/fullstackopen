/* eslint-disable react-hooks/exhaustive-deps */
import { useState,useEffect } from 'react'
import './App.css'
import axios from 'axios'
import ListOfCountrie from './components/ListOfCountrie.jsx'



function App() {
  
  const [countrie,setCountrie] = useState(null)
  const [listcountrie,setListCountrie] = useState([])
  const [showListCountrie,setShowListCountrie] = useState([])
  const [firstTime,setFirstTime] = useState(true)
  function handleClickShowInfo(countrie) {
    setShowListCountrie([countrie])
  }
  function getAllFirstTime() {
    if(firstTime){ 
      const request = axios.get('https://studies.cs.helsinki.fi/restcountries/api/all')
      request.then((response) => {setListCountrie(response.data)})
      setFirstTime(false)
    }
    return 
  }

  getAllFirstTime()  



  useEffect(() => {
    const filtered = listcountrie.filter(countrieN => countrieN.name.common.toLowerCase().includes(countrie.toLowerCase()))
    setShowListCountrie(filtered)

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
      
      <div>
        <h2>Results</h2>
        <ListOfCountrie listcountrie = {showListCountrie} onHandleClick={handleClickShowInfo}></ListOfCountrie>

      </div>

    </>
  )
}

export default App
