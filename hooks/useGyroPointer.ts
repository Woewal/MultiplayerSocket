import { useState, useEffect, useRef } from "react";
import Quaternion from "quaternion";

interface PointerCoordinates {
  x: number;
  y: number;
}

const rad = Math.PI / 180;

const useGyroPointer = (): [PointerCoordinates, () => void] => {
  const [pointerCoordinates, setPointerCoordinates] =
    useState<PointerCoordinates>({ x: 0, y: 0 });
  const calibratedPoint = useRef([0, 0]);
  const calibratePoint = () => {
    calibratedPoint.current = [pointerCoordinates.x, pointerCoordinates.y];
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
    console.log(`Yaw: ${angles[0]}, Pitch: ${angles[1]}`);

    let dist = angles.map((angle, i) =>
      calcDist(calibratedPoint.current[i], angle)
    );

    setPointerCoordinates({
      x: dist[0],
      y: dist[1],
    });
  }

  useEffect(() => {
    window.addEventListener("deviceorientation", handleDeviceOrientation, true);

    return () => {
      window.removeEventListener("deviceorientation", handleDeviceOrientation);
    };
  }, [calibratedPoint]);

  return [pointerCoordinates, calibratePoint];
};

function toEuler(q) {
  let sinr_cosp = 2 * (q[3] * q[0] + q[1] * q[2]);
  let cosr_cosp = 1 - 2 * (q[0] * q[0] + q[1] * q[1]);
  let yaw = Math.atan2(sinr_cosp, cosr_cosp);
  yaw *= 180 / Math.PI;
  yaw += 180;
  if (yaw < -180) {
    yaw += 180;
  } else if (yaw > 180) {
    yaw -= 360;
  }

  let siny_cosp = 2 * (q[3] * q[2] + q[0] * q[1]);
  let cosy_cosp = 1 - 2 * (q[1] * q[1] + q[2] * q[2]);
  let pitch = Math.atan2(siny_cosp, cosy_cosp);
  pitch *= 180 / Math.PI;

  return [yaw, pitch];
}

function calcDist(initAngle, angle) {
  console.log(`Init: ${initAngle} , Fromangle: ${angle}`);

  angle = angle - initAngle;
  console.log(`Angle difference: ${angle}`);
  angle = angle < -180 ? angle + 180 : angle;
  console.log(angle);
  angle = angle > 180 ? angle - 180 : angle;
  console.log(`Init: ${initAngle} , Currentangle: ${angle}`);

  // angle = angle < 0 ? angle + 360 : angle;
  // angle = angle > 180 ? angle - 360 : angle;
  //let dist = Math.round(-800 * Math.tan(angle * (Math.PI / 180)));
  //let dist = Math.atan2(Math.sin(angle-initAngle), Math.cos(angle-initAngle));
  //let dist = Math.tan(angle * (Math.PI / 180));
  return angle;
}

export default useGyroPointer;
