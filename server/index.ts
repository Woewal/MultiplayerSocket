import express, { Express, Request, Response } from "express";
import * as https from "https";
import * as http from "http";
import next, { NextApiHandler } from "next";
import * as socketio from "socket.io";
import roomManager from "./../lib/roommanager";
import pointerSocketInfo from "types/PointerSocketInfo";
import clickSocketInfo from "types/ClickSocketInfo";
import playerSocketInfo from "types/PlayerSocketInfo";
import fs from "fs";
import { ServerOptions } from "https";

const port: number = parseInt(process.env.PORT || "3000", 10);
const dev: boolean = process.env.NODE_ENV !== "production";
const nextApp = next({ dev });
const nextHandler: NextApiHandler = nextApp.getRequestHandler();
let io: socketio.Server;

const environment = process.env.NODE_ENV ?? "development";

const createServer = (app: Express): https.Server | http.Server => {
	if (environment != "development") {
		return http.createServer(app);
	} else {
		const httpsOptions: ServerOptions = {
			key: fs.readFileSync("./cert/192.168.178.15-key.pem"),
			cert: fs.readFileSync("./cert/192.168.178.15.pem"),
		};
		return https.createServer(httpsOptions, app);
	}
};

nextApp.prepare().then(async () => {
	const app: Express = express();

	const server = createServer(app);

	io = new socketio.Server();
	io.attach(server);

	io.on("connection", (socket: socketio.Socket) => {
		console.log("Client connected");

		socket.on("createroom", (callback) => {
			const room = roomManager.createNewRoom(socket);
			socket.join(room.id);
			console.log(`Created room with id ${room.id}`);
			callback(room.id);
		});

		socket.on("roomexists", (roomid, callback) => {
			callback(roomManager.rooms.filter((x) => x.id == roomid).length > 0);
		});

		socket.on("joinroom", (roomid, callback) => {
			if (!roomManager.rooms) {
				callback(false);
				return;
			}
			const room = roomManager.rooms.find((x) => x.id == roomid);
			if (!room) {
				callback(false);
				return;
			}

			socket.join(room.id);

			const playerData: playerSocketInfo = {
				id: socket.id,
			};

			socket.to(room.host.id).emit("playerconnection", playerData);
			console.log(`Player joined room with id: ${room.id}`);
			callback(true);
		});

		socket.on("updatepointer", (data: pointerSocketInfo) => {
			const host = roomManager.rooms.find((x) => x.id == data.roomId).host;
			socket.to(host.id).emit("updatepointer", data);
		});

		socket.on("pointerDown", (data: clickSocketInfo) => {
			const host = roomManager.rooms.find((x) => x.id == data.roomId).host;
			socket.to(host.id).emit("pointerDown", data);
		});

		socket.on("pointerUp", (data: clickSocketInfo) => {
			const host = roomManager.rooms.find((x) => x.id == data.roomId).host;
			socket.to(host.id).emit("pointerUp", data);
		});

		socket.on("disconnect", async () => {
			const room = roomManager.rooms.find((x) => x.host.id == socket.id);
			if (room) {
				roomManager.rooms.filter((x) => x == room);

				await socket
					.to(room.id)
					.fetchSockets()
					.then((sockets) => {
						sockets.map((socket) => {
							socket.emit("disconnectroom");
						});
					});
				console.log("room disconnected");
			}
			console.log("client disconnectedt");
		});
	});

	app.all("*", (req: any, res: any) => nextHandler(req, res));

	server.listen(port, () => {
		console.log(
			`> Server listening at https://192.168.178.15:${port} as ${environment}`
		);
	});
});

export { io };
