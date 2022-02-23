import { useState, useEffect } from "react";

interface Orientation {
    absolute: boolean;
    alpha: number;
    beta: number;
    gamma: number;
}

const useDeviceOrientation = () => {
  const [deviceOrientation, setDeviceOrientation] = useState<Orientation>({absolute: false, alpha: 0, beta:0, gamma:0});

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