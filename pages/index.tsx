import { useEffect, useState } from "react";
import Layout from "../components/Layout";
import { io, Socket } from "socket.io-client";
import { DefaultEventsMap } from "socket.io/dist/typed-events";
import useDeviceOrientation from "hooks/useDeviceOrientation";
import useGyroPointer from "hooks/useGyroPointer";

const IndexPage = () => {
  const [socket, setSocket] = useState<Socket>();
  const gyroPointer = useGyroPointer();
  const deviceOrientation = useDeviceOrientation();

  useEffect(() => {
    const newSocket = io();
    setSocket(newSocket);
  }, []);

  const orientationInfo = (
    <li>
      x: <code>{gyroPointer.x}</code>
      <br />
      y: <code>{gyroPointer.y}</code>
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
        </div>
      </div>
    </Layout>
  );
};

export default IndexPage;
