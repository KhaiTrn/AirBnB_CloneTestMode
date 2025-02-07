import { createContext, useContext, useState } from "react";

export const RoomDetailContext = createContext();

export const RoomDetailProvider = ({ children }) => {
  const [listComment, setListComment] = useState([]);
  const value = {
    listComment,
    setListComment,
  };
  return (
    <RoomDetailContext.Provider value={value}>
      {children}
    </RoomDetailContext.Provider>
  );
};

export const useRoomDetailContext = () => {
  return useContext(RoomDetailContext);
};
