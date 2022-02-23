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
  const currentPoint = useRef([0, 0]);
  const calibratePoint = () => {
    setPointerCoordinates({ x: 0, y: 0 });
    calibratedPoint.current = currentPoint.current;
  };

  function handleDeviceOrientation(event) {
    event.stopPropagation();
    const currentRotation: Quaternion = Quaternion.fromEuler(
      event.alpha * rad,
      event.beta * rad,
      event.gamma * rad,
      "ZXY"
    );

    let angles = toEuler(currentRotation.toVector());
    console.log(`Yaw: ${angles[0]}, Pitch: ${angles[1]}`);

    angles = angles.map((angle, i) =>
      calcDist(calibratedPoint.current[i], angle)
    );

    currentPoint.current = angles;
    
    setPointerCoordinates({
      x: map(angles[0], -15, 15, -1, 1),
      y: map(angles[1], -15, 15, -1, 1),
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
  angle = angle - initAngle;
  angle = angle < -180 ? angle + 360 : angle;
  angle = angle > 180 ? angle - 360 : angle;
  return angle;
}

function clamp(input: number, min: number, max: number): number {
  return input < min ? min : input > max ? max : input;
}

function map(current: number, in_min: number, in_max: number, out_min: number, out_max: number): number {
  const mapped: number = ((current - in_min) * (out_max - out_min)) / (in_max - in_min) + out_min;
  return clamp(mapped, out_min, out_max);
}

export default useGyroPointer;
