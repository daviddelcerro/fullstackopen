/* eslint-disable react/prop-types */
export const Person = ({person, onHandleClick}) => {
    return (
      <p>{person.name} {person.number}
        <button onClick={() => onHandleClick(person.id)}>delete</button>
      </p>
    )
  }
export default Person