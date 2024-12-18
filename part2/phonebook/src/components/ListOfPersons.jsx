/* eslint-disable react/prop-types */
import Person from './Person.jsx'
export const ListOfPersons = ({persons, onHandleClick}) => {
    return (
      <>
       {persons.map(person => <Person key={person.name} person={person} onHandleClick={onHandleClick} />)}
      </>
       
    )
  }