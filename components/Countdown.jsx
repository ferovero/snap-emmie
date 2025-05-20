"use client";
import { useEffect, useState } from "react";
import { startCountdown } from "./utils/utils";
const Countdown = ({ endSaleDate: date }) => {
  const [timer, setTimer] = useState("19:47");
  useEffect(() => {
    const clearItsInterval = startCountdown(19, 47, setTimer);
    return () => {
      clearItsInterval();
    };
  }, []);
  return (
    <span
      data-ws-tag="span"
      id="time"
      className="w-text czowava cw7a1ux c1dtukdu"
    >
      {timer}
    </span>
  );
};

export default Countdown;
