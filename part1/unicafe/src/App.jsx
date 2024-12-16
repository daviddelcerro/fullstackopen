/* eslint-disable react/prop-types */
import { useState } from 'react'
import './App.css'

const Button = (props) => {
  return <button onClick={props.handleClick}>{props.text}</button>
}

const StatisticsLine = (props) => {
  return (
    <tr>
      <td>
        {props.text} {props.value}
      </td>
    </tr>
    
  )
}

const Statistics = (props) => {
  if (props.good === 0 && props.neutral === 0 && props.bad === 0) {
    return (
      <div>
        <h1>Statistics</h1>
        <p>No feedback given</p>
      </div>
    )
  }
  return (
    <div>
      <h1>Statistics</h1>
      <table>
        <StatisticsLine text="good" value={props.good} />
        <StatisticsLine text="neutral" value={props.neutral} />
        <StatisticsLine text="bad" value={props.bad} />
        <StatisticsLine text="all" value={props.good + props.neutral + props.bad} />
        <StatisticsLine text="Average" value={(props.good - props.bad) / (props.good + props.neutral + props.bad)} />
        <StatisticsLine text="Positive" value={props.good / (props.good + props.neutral + props.bad) * 100} />
      </table>
    </div>
    
  )
}

function App() {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)


  return (
    
    <div>
      <h1>Give feedback</h1>
      <Button handleClick={() => setGood(good + 1)} text="good" />
      <Button handleClick={() => setNeutral(neutral + 1)} text="neutral" />
      <Button handleClick={() => setBad(bad + 1)} text="bad" />
      
      <Statistics good={good} neutral={neutral} bad={bad}/>
      </div>

    
  )
}

export default App
