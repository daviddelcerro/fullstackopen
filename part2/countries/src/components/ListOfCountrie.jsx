/* eslint-disable react/prop-types */
import Countrie from "./Countrie";

export const ListOfCountrie = ({listcountrie, onHandleClick}) => {
    if(listcountrie.length > 9) return <p>Too many matches, specify another filter</p>
    else{
        return (
            <>
                 {listcountrie.map(countrie => <Countrie key={countrie.name.common} countrie={countrie} onHandleClick={() => onHandleClick(countrie)} />)} 
            </>
        )
    }
}

export default ListOfCountrie