import Layout from "components/Layout";
import { useRouter } from "next/router";
import { ChangeEventHandler, useContext, useState } from "react";
import { SocketContext } from "context/socket";

const IndexPage = () => {
	const router = useRouter();
	const socketContext = useContext(SocketContext);
	const [roomId, setRoomId] = useState("");
	const [name, setName] = useState("");

	const changeHandler = (event: React.FormEvent<HTMLInputElement>) => {
		if (event.currentTarget.name == "name") setName(event.currentTarget.value);
		else if (event.currentTarget.name == "roomcode")
			setRoomId(event.currentTarget.value);
	};

	const joinRoom = () => {
		if (!socketContext.isConnected) alert("Not connected");

		const roomIdUpper = roomId.toUpperCase();

		socketContext.socket.emit("roomexists", roomIdUpper, (exists) => {
			if (!exists) {
				alert("Room doesn't exist");
				return;
			}
			router.push(`/${roomIdUpper}`);
		});
	};

	return (
		<Layout title="Home | Next.js + TypeScript Example">
			<div className="bg-white flex flex-col gap-3 p-3 bg-white rounded">
				<h2 className="font-bold text-xl uppercase">Join game</h2>
				<div className="flex gap-3">
					<input
						type="text"
						name="roomcode"
						placeholder="Room code"
						className="border-2 rounded p-3 w-full"
						value={roomId}
						onChange={changeHandler}
					/>
					<button
						className="bg-secondary rounded p-3 text-white flex-none"
						onClick={joinRoom}
					>
						Join room
					</button>
				</div>
			</div>
		</Layout>
	);
};

export default IndexPage;
