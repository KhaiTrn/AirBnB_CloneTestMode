import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { locationService } from "../services/location.service";
import removeVietnameseTones from "../common/removeVietnameseTones";

export const HeaderContext = createContext();

export const HeaderProvider = ({ children }) => {
  const [listLocation, setListLocation] = useState([]);
  const [counterAdult, setConterAdult] = useState(0);
  const [counterChild, setCounterChild] = useState(0);
  const [counterBaby, setCounterBaby] = useState(0);

  const [keySearch, setKeySearch] = useState(null);
  const totalPerson = counterAdult + counterChild;
  const max = 16;
  const isBlockMax = totalPerson >= max;
  const handleDecreasesAdult = () => {
    if (counterAdult > 0) {
      setConterAdult((prev) => prev - 1);
    }
  };

  const handleIncreasesAdult = () => {
    if (totalPerson < max) {
      setConterAdult((prev) => prev + 1);
    }
  };

  const handleDecreasesChild = () => {
    if (counterChild > 0) {
      setCounterChild((prev) => prev - 1);
    }
  };
  const handleIncreasesChild = () => {
    if (totalPerson < max) {
      setCounterChild((prev) => prev + 1);
    }
  };

  const handleDecreasesBaby = () => {
    if (counterBaby > 0) {
      setCounterBaby((prev) => prev - 1);
    }
  };
  const handleIncreasesBaby = () => {
    if (counterBaby < 5) {
      setCounterBaby((prev) => prev + 1);
    }
  };

  useEffect(() => {
    locationService
      .getListLocation()
      .then((res) => {
        // console.log(res.data.content);
        setListLocation(res.data.content);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <HeaderContext.Provider
      value={{
        handleDecreasesAdult,
        handleDecreasesBaby,
        handleDecreasesChild,
        handleIncreasesAdult,
        handleIncreasesBaby,
        handleIncreasesChild,
        max,
        totalPerson,
        isBlockMax,
        counterAdult,
        counterBaby,
        counterChild,
        listLocation,
        keySearch,
        setKeySearch,
      }}
    >
      {children}
    </HeaderContext.Provider>
  );
};

export const useHeaderContext = () => {
  return useContext(HeaderContext);
};
