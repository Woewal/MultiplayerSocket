import { useEffect, useState } from "react";
import Layout from "../components/Layout";
import { io, Socket } from "socket.io-client";
import { DefaultEventsMap } from "socket.io/dist/typed-events";
import useDeviceOrientation from "hooks/useDeviceOrientation";

const IndexPage = () => {
  const [socket, setSocket] =
    useState<Socket<DefaultEventsMap, DefaultEventsMap>>();

  const deviceOrientation = useDeviceOrientation();

  useEffect(() => {
    const newSocket = io();
    setSocket(newSocket);

    setInterval(() => {
      if (!socket) return;
      socket.emit("gyrovalues", deviceOrientation);
    }, 3000);
  }, []);

  const orientationInfo = (
    <li>
      ɑ: <code>{deviceOrientation.alpha}</code>
      <br />
      b: <code>{deviceOrientation.beta}</code>
      <br />
      c: <code>{deviceOrientation.gamma}</code>
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
