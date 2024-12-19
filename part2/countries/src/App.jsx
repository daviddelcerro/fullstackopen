/* eslint-disable react-hooks/exhaustive-deps */
import { useState,useEffect } from 'react'
import './App.css'
import axios from 'axios'
import ListOfCountrie from './components/ListOfCountrie.jsx'
import ShowCountrieInfo from './components/ShowCountrieInfo.jsx'


function App() {
  const [countrie,setCountrie] = useState(null)
  const [listcountrie,setListCountrie] = useState([])
  const [showListCountrie,setShowListCountrie] = useState([])
  const [firstTime,setFirstTime] = useState(true)
  const [showCountrie,setShowCountrie] = useState(null)

  function handleClickShowInfo(countrie) {
    setShowCountrie(countrie)
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
    console.log('listcountrie',listcountrie)
    const filtered = listcountrie.filter(countrieN => countrieN.name.common.toLowerCase().includes(countrie.toLowerCase()))
    setShowListCountrie(filtered)
    console.log('filtered',filtered)

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
      <div>
        <ShowCountrieInfo countrie={showCountrie}> </ShowCountrieInfo>
      </div>
    </>
  )
}

export default App
