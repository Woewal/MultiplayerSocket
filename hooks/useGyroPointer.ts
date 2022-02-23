import { useState, useEffect } from "react";

interface PointerCoordinates {
  x: number;
  y: number;
}

const useGyroPointer = () => {
  const [pointerCoordinates, setPointerCoordinates] =
    useState<PointerCoordinates>({x:0, y:0});

  function handleDeviceOrientation(event) {
    event.stopPropagation();
    setPointerCoordinates({
      x: Math.min(Math.max(Math.floor(event.beta), -45), 45),
      y: Math.min(Math.max(Math.floor(event.gamma), -45), 45),
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

export default useGyroPointer;
