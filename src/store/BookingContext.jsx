import dayjs from "dayjs";
import React, { createContext, useContext, useEffect, useState } from "react";

const BookingContext = createContext();

export const BookingProvider = ({ children }) => {
  const tomorrow = dayjs().add(1, "day").format("DD-MM-YYYY");
  const nextWeek = dayjs().add(8, "day").format("DD-MM-YYYY");
  const [isSelectedDay, setIsSelectedDay] = useState(false);
  const [daysSelected, setDaysSelected] = useState(0);
  const [dayStart, setDayStart] = useState(tomorrow);
  const [dayEnd, setDayEnd] = useState("");
  const [price, setPrice] = useState(0);
  const [counterAdult, setConterAdult] = useState(1);
  const [counterChild, setCounterChild] = useState(0);
  const [counterBaby, setCounterBaby] = useState(0);
  const [maxPeople, setMaxPeople] = useState(0);
  const [idRoomContext, setIdRoomContext] = useState(0);

  const totalPerson = counterAdult + counterChild;
  const isBlockMax = totalPerson >= maxPeople;
  const handleDecreasesAdult = () => {
    if (counterAdult > 1) {
      setConterAdult((prev) => prev - 1);
    }
  };

  const handleIncreasesAdult = () => {
    if (totalPerson < maxPeople) {
      setConterAdult((prev) => prev + 1);
    }
  };
  const handleDecreasesChild = () => {
    if (counterChild > 0) {
      setCounterChild((prev) => prev - 1);
    }
  };
  const handleIncreasesChild = () => {
    if (totalPerson < maxPeople) {
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
    if (dayStart && dayEnd) {
      setIsSelectedDay(true);
      const totalDays = calculateTotalDays([dayStart, dayEnd]);
      setDaysSelected(totalDays);
    }
  }, [dayStart, dayEnd]);

  function calculateTotalDays(dateArray) {
    if (dateArray.length !== 2) {
      return 0;
    }

    function convertToDateFormat(dateString) {
      const [day, month, year] = dateString.split("-");
      return `${year}-${month}-${day}`;
    }

    const startDate = new Date(convertToDateFormat(dateArray[0]));
    const endDate = new Date(convertToDateFormat(dateArray[1]));

    if (isNaN(startDate) || isNaN(endDate)) {
      return 0;
    }

    // Tính số ngày giữa hai ngày
    const timeDifference = endDate - startDate;
    return Math.abs(timeDifference / (1000 * 60 * 60 * 24));
  }
  const values = {
    isBlockMax,
    totalPerson,
    isSelectedDay,
    setIsSelectedDay,
    daysSelected,
    setDaysSelected,
    dayStart,
    setDayStart,
    dayEnd,
    setDayEnd,
    price,
    setPrice,
    counterAdult,
    setConterAdult,
    counterChild,
    setCounterChild,
    counterBaby,
    setCounterBaby,
    maxPeople,
    setMaxPeople,
    handleDecreasesAdult,
    handleIncreasesAdult,
    handleDecreasesChild,
    handleIncreasesChild,
    handleDecreasesBaby,
    handleIncreasesBaby,
    idRoomContext,
    setIdRoomContext,
  };

  return (
    <BookingContext.Provider value={values}>{children}</BookingContext.Provider>
  );
};

export const useBooking = () => useContext(BookingContext);
