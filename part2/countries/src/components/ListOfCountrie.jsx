/* eslint-disable react/prop-types */
import Countrie from "./Countrie";
import ShowCountrieInfo from "./ShowCountrieInfo";
import ShowWeatherInfo from "./showWeatherInfo";

export const ListOfCountrie = ({listcountrie, onHandleClick}) => {
    if(listcountrie.length > 9) return <p>Too many matches, specify another filter</p>
    else if(listcountrie.length > 2 && listcountrie.length < 10 || listcountrie.length === 0){
        return (
            <>
                 {listcountrie.map(countrie => <Countrie key={countrie.name.common} countrie={countrie} onHandleClick={() => onHandleClick(countrie)} />)} 
            </>
        )
    }else {
        return (
            <>
            <ShowCountrieInfo countrie={listcountrie[0]} />
            <ShowWeatherInfo countrie={listcountrie[0]} />
            </>
        )

        
    }
}

export default ListOfCountrie