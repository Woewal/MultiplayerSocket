import { Socket } from "socket.io";
import Room from "./room";

class RoomManager {
	rooms: Room[] = [];

	createNewRoom = (host: Socket) => {
		const room = new Room(host);
		this.rooms.push(room);
		return room;
	};
}

export default new RoomManager();
