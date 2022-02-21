import { RootState } from "../store/store";
import { useSelector } from "react-redux";
import { useEffect, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMoneyBill } from "@fortawesome/free-solid-svg-icons";

const CurrencyDisplayer = () => {
  const currentAmount = useSelector((state: RootState) => state.currency.value);
  const currencyElement = useRef(null);
  
  return (
    <div
      ref={currencyElement}
      className="fixed bg-white bottom-3 right-3 p-3 rounded-full z-20"
    >
      <FontAwesomeIcon icon={faMoneyBill} /> {currentAmount}
    </div>
  );
};

export default CurrencyDisplayer;
