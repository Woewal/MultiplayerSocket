import { useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";
import { useRouter } from "next/router";

const useSocketClient = (): [Socket, boolean] => {
	const router = useRouter();
	const [socket, setSocket] = useState<Socket>();
	const [isConnected, setIsConnected] = useState(false);

	useEffect(() => {
		const socket = io();
		setSocket(socket);
		socket.on("connect", () => {
			setIsConnected(true);
		});
		socket.on("disconnectroom", () => {
			router.push("/");
		});
	}, []);

	return [socket, isConnected];
};

export default useSocketClient;
