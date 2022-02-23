import { useState, useEffect } from "react";

const useDeviceOrientation = () => {
  const [deviceOrientation, setDeviceOrientation] = useState({ absolute: false, alpha: Number, beta: Number, gamma: Number });

  function handleDeviceOrientation(event) {
    setDeviceOrientation({
      absolute: event.absolute,
      alpha: event.alpha,
      beta: event.beta,
      gamma: event.gamma
    })
  }

  useEffect(() => {
    window.addEventListener('deviceorientation', handleDeviceOrientation, true);

    return () => {
      window.removeEventListener('deviceorientation', handleDeviceOrientation);
    };
  }, [])

  return deviceOrientation;
}

export default useDeviceOrientation;