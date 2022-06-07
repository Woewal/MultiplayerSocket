import { Socket } from "socket.io";

class Room {
	id: string;
	host: Socket;

	constructor(host: Socket) {
		this.host = host;
		this.id = Math.random()
			.toString(36)
			.replace(/[^a-z]+/g, "")
			.substr(0, 4)
			.toUpperCase();
	}
}

export default Room;
