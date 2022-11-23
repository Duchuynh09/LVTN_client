import { useState } from "react";
import SearchContext from "./SearchContext";

function SearchProvider({ children }) {
  const [idSeat, setIdSeat] = useState();
  const [isSearch, setIsSearch] = useState(false);
  return (
    <SearchContext.Provider
      value={{ isSearch, setIsSearch, idSeat, setIdSeat }}
    >
      {children}
    </SearchContext.Provider>
  );
}

export default SearchProvider;
