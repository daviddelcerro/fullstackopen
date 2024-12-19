/* eslint-disable react/prop-types */
export const Countrie = ({countrie, onHandleClick}) => {
    return (
      <p>{countrie.name.common} 
        <button onClick={() => onHandleClick(countrie = {countrie})}>Show info</button>
      </p>
    )
  }
export default Countrie