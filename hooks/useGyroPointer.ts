import { useState, useEffect } from "react";
import Quaternion from "quaternion";

interface PointerCoordinates {
  x: number;
  y: number;
}

const rad = Math.PI / 180;

const useGyroPointer = () => {
  const [pointerCoordinates, setPointerCoordinates] =
    useState<PointerCoordinates>({ x: 0, y: 0 });
  const [currentQuaternion, setCurrentQuaternion] = useState<Quaternion>(
    Quaternion.fromEuler(0, 0, 0, "ZXY")
  );
  const [calibratedPoint, setCalibratedPoint] = useState<Quaternion>(
    Quaternion.fromEuler(0, 0, 0, "ZXY")
  );
  const updateOrigin = () => {
    setCalibratedPoint(currentQuaternion);
  };

  function handleDeviceOrientation(event) {
    event.stopPropagation();
    const currentRotation: Quaternion = Quaternion.fromEuler(
      event.alpha * rad,
      event.beta * rad,
      event.gamma * rad,
      "ZXY"
    );

    const angles = toEuler(currentRotation.toVector());

    setCurrentQuaternion(currentRotation.toVector());
    console.log(angles);

    //let dist = euler.map((angle, i) => calcDist(angle, angle));


    setPointerCoordinates({
       x: angles[0],
       y: angles[1],
    });
  }

  useEffect(() => {
    window.addEventListener("deviceorientation", handleDeviceOrientation, true);

    return () => {
      window.removeEventListener("deviceorientation", handleDeviceOrientation);
    };
  }, []);

  return pointerCoordinates;
};

function toEuler(q) {
  let sinr_cosp = 2 * (q[3] * q[0] + q[1] * q[2]);
  let cosr_cosp = 1 - 2 * (q[0] * q[0] + q[1] * q[1]);
  let roll = Math.atan2(sinr_cosp, cosr_cosp);

  let siny_cosp = 2 * (q[3] * q[2] + q[0] * q[1]);
  let cosy_cosp = 1 - 2 * (q[1] * q[1] + q[2] * q[2]);
  let yaw = Math.atan2(siny_cosp, cosy_cosp);
  return [yaw, roll];
}

function calcDist(angle, initAngle) {
  angle = (angle - initAngle) * (180 / Math.PI);
  angle = angle < 0 ? angle + 360 : angle;
  angle = angle > 180 ? angle - 360 : angle;
  let dist = Math.round(-800 * Math.tan(angle * (Math.PI / 180)));
  return dist;
}

export default useGyroPointer;
