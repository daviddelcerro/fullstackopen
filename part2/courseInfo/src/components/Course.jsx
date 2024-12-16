/* eslint-disable react/prop-types */
const Header = (props) => {
    return <h1>{props.course}</h1>
  }
  
  const Part = (props) => {
    return (
      <p>
        {props.name} {props.exercises}
      </p>
    )
  }
  
  const Total = (props) => {
    return <p>Number of exercises {props.total}</p>
  }
  
  const Content = (props) => {
    return (
      <div >
        {props.parts.map(part => <Part key={part.id} name={part.name} exercises={part.exercises} />)}
      </div>
    )
  }
  
  export const Course = ({course}) => {
      return(
        <div key={course.id}>
          <Header course={course.name} />
          <Content parts={course.parts} />
          <Total total={course.parts.reduce((sum, part) => sum + part.exercises, 0)} />
        
        </div>
        )
    }