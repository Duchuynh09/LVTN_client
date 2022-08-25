import { useState } from 'react';
import SearchContext from './SearchContext';

function SearchProvider({ children }) {
    const [idSeat,setIdSeat] = useState();
    console.log(idSeat);
    return <SearchContext.Provider value={{ idSeat ,setIdSeat}}>{children}</SearchContext.Provider>;
}

export default SearchProvider;