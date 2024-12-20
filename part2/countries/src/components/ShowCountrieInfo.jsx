/* eslint-disable react/prop-types */
export const ShowCountrieInfo = ({countrie}) => {
    
    if(countrie === null) return null
    return (
        <>
        <div>
            <h2>{countrie.name.common}</h2>
            <p>capital {countrie.capital}</p>
            <p>area {countrie.area}</p>
        </div>
        <div>
            <h3>languages:</h3>
            <ul>
                {Object.keys(countrie.languages).map((language) => <li key={language}>{countrie.languages[language]}</li>)}
            </ul>
               
            <img src={countrie.flags.png} alt={countrie.flags.alt} width={300} height={200} />
        </div>
        </>
    )
}

export default ShowCountrieInfo