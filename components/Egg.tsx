import { useEffect, useState } from "react";
import { addNewEgg } from "../routes/eggs.router";
import Egg from "../models/egg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEgg } from "@fortawesome/free-solid-svg-icons";
import Button from "./Button";
import Bar from "./Bar";

type EggProps = {
  egg: Egg;
};

function padTo2Digits(num: Number) {
  return num.toString().padStart(2, "0");
}

function formatDate(date: Date) {
  return [
    padTo2Digits(date.getDate()),
    padTo2Digits(date.getMonth() + 1),
    date.getFullYear(),
  ].join("/");
}

const EggDisplayer = ({ egg }: EggProps) => {
  const [progressPercentage, setProgressPercentage] = useState(0);
  const [timeRemaining, setTimeRemaining] = useState({
    hours: 0,
    mins: 0,
    secs: 0,
  });
  const [canHatch, setHatch] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      if(progressPercentage >= 100) return;
      const remaining = egg.hatchDate - new Date().getTime();
      const hours = Math.floor(remaining / (60 * 60 * 1000));
      const mins = Math.floor(
        (remaining - hours * 60 * 60 * 1000) / (60 * 1000)
      );
      const secs = Math.floor(
        (remaining - hours * 60 * 60 * 1000 - mins * 60 * 1000) / 1000
      );

      if (remaining <= 0) setHatch(true);

      setTimeRemaining({ hours, mins, secs });

      let percentage = (new Date().valueOf() - egg.createdDate.valueOf()) / (egg.hatchDate.valueOf() - egg.createdDate.valueOf()) * 100;

      if(percentage > 100) percentage = 100;
      setProgressPercentage(percentage);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-white rounded-xl p-5 flex gap-5 shadow hover:shadow-lg transition-shadow relative mt-10 pt-14">
      <div className="flex-none w-20 h-20 rounded-full bg-purple-500 absolute -top-10 border-solid border-white border-4 shadow left-0 right-0 mx-auto"></div>
      <div className="w-full">
        <Bar percentage={progressPercentage}></Bar>
        <Button className="w-full" disabled={!canHatch} callback={() => {console.log('click')}}>
          <>
            <FontAwesomeIcon icon={faEgg} /> Hatch
          </>
        </Button>
      </div>
    </div>
  );
};

export default EggDisplayer;
