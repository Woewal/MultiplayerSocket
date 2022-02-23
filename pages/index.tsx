import { DOMElement, useEffect, useRef, useState } from "react";
import Layout from "../components/Layout";
import { io, Socket } from "socket.io-client";
import { DefaultEventsMap } from "socket.io/dist/typed-events";
import useDeviceOrientation from "hooks/useDeviceOrientation";
import useGyroPointer from "hooks/useGyroPointer";

const IndexPage = () => {
  const [socket, setSocket] = useState<Socket>();
  const [pointerCoordinates, calibratePoint] = useGyroPointer();
  const deviceOrientation = useDeviceOrientation();
  const textInput = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const newSocket = io();
    setSocket(newSocket);
  }, []);
  
  useEffect(() => {
    const xDistance = ((pointerCoordinates.x / 180 + 1) * window.innerWidth / 2);
    const yDistance = ((pointerCoordinates.y / 180 + 1) * window.innerHeight / 2);
    textInput.current.setAttribute("style", `top:${yDistance}px; left:${xDistance}px`);
  }, [pointerCoordinates])

  const orientationInfo = (
    <li>
      x: <code>{pointerCoordinates.x}</code>
      <br />
      y: <code>{pointerCoordinates.y}</code>
    </li>
  );

  return (
    <Layout title="Home | Next.js + TypeScript Example">
      <div className="p-3">
        <div className="bg-white rounded p-3">
          <ul>{orientationInfo}</ul>
          <button
            className="bg-white rounded p-3"
            onClick={() => socket.emit("click")}
          >
            Fire
          </button>
          <button
            className="bg-white rounded p-3"
            onClick={() => calibratePoint()}
          >
            Calibrate
          </button>
          <div className="fixed w-20 h-20 rounded bg-pink-500 top-0 left-0" ref={textInput}></div>
        </div>
      </div>
    </Layout>
  );
};

export default IndexPage;
