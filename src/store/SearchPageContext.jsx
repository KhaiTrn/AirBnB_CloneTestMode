import { createContext, useContext, useState } from "react";

export const SearchPageContext = createContext();

export const SearchPageProvider = ({ children }) => {
  const [listRoom, setListRoom] = useState([]);
  const [originalListRoom, setOriginalListRoom] = useState([]);
  const value = {
    listRoom,
    setListRoom,
    originalListRoom,
    setOriginalListRoom,
  };
  return (
    <SearchPageContext.Provider value={value}>
      {children}
    </SearchPageContext.Provider>
  );
};

export const useSearchPageContext = () => {
  return useContext(SearchPageContext);
};
