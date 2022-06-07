import { DOMElement, useContext, useEffect, useRef, useState } from "react";
import Layout from "../../components/Layout";
import { io, Socket } from "socket.io-client";
import useGyroPointer from "hooks/useGyroPointer";
import { useRouter } from "next/router";
import { SocketContext } from "context/socket";
import pointerSocketInfo from "types/PointerSocketInfo";
import clickSocketInfo from "types/ClickSocketInfo";

const IndexPage = () => {
	const [pointerCoordinates, calibratePoint] = useGyroPointer();
	const router = useRouter();
	const socketContext = useContext(SocketContext);
	const { roomid } = router.query;

	useEffect(() => {
		if (!socketContext.isConnected) return;
		const socket = socketContext.socket;
		socket.emit("joinroom", roomid, (succeeded) => {
			if (!succeeded) alert("connection failed");
		});
	}, [socketContext.socket, socketContext.isConnected]);

	useEffect(() => {
		const xDistance = ((pointerCoordinates.x + 1) * window.innerWidth) / 2;
		const yDistance = ((pointerCoordinates.y + 1) * window.innerHeight) / 2;
		if (!socketContext.isConnected) return;

		const pointer: pointerSocketInfo = {
			playerId: socketContext.socket.id,
			roomId: roomid as string,
			x: pointerCoordinates.x,
			y: -pointerCoordinates.y,
		};

		socketContext.socket.emit("updatepointer", pointer);
	}, [pointerCoordinates]);

	const pointerDown = () => {
		if (!socketContext.isConnected) return;

		const clickInfo: clickSocketInfo = {
			playerId: socketContext.socket.id,
			roomId: roomid as string,
		};

		socketContext.socket.emit("pointerDown", clickInfo);
	};

	const pointerUp = () => {
		if (!socketContext.isConnected) return;

		const clickInfo: clickSocketInfo = {
			playerId: socketContext.socket.id,
			roomId: roomid as string,
		};

		socketContext.socket.emit("pointerUp", clickInfo);
	};

	return (
		<Layout title={`${roomid} | join now!`}>
			<div className="absolute top-0 bottom-0 left-0 right-0 flex flex-col gap-3 p-3">
				<button className="bg-white rounded p-3" onClick={calibratePoint}>
					Calibrate
				</button>
				<button
					className="bg-white rounded p-3 h-full"
					onPointerDown={pointerDown}
					onPointerUp={pointerUp}
				>
					Fire
				</button>
			</div>
		</Layout>
	);
};

export default IndexPage;
