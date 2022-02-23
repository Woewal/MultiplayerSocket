import express, { Express, Request, Response } from "express";
import * as http from "http";
import next, { NextApiHandler } from "next";
import * as socketio from "socket.io";
//import roomManager from "lib/roomManager";

const port: number = parseInt(process.env.PORT || "3000", 10);
const dev: boolean = process.env.NODE_ENV !== "production";
const nextApp = next({ dev });
const nextHandler: NextApiHandler = nextApp.getRequestHandler();

nextApp.prepare().then(async () => {
  const app: Express = express();
  const serveroptions: http.ServerOptions = {};
  const server: http.Server = http.createServer(app);
  const io: socketio.Server = new socketio.Server();
  io.attach(server);

  app.get("/hello", async (req: Request, res: Response) => {
    res.send("Hello World");
  });

  io.on("connection", (socket: socketio.Socket) => {
    console.log("Client connected");

    socket.on("createroom", () => {
      // const room = roomManager.createNewRoom(socket.id);
      // socket.emit("createdroom", room.id);
      // socket.join(room.id);
      // console.log(`Created room with id ${room.id}`);
    });

    socket.on("joinroom", (id, onSuccessCallback, onErrorCallback) => {
      // if(!roomManager.rooms) {
      //   onErrorCallback();
      // }
      // const room = roomManager.rooms.find(x => x.id == id);
      // if(!room) {
      //   onErrorCallback();
      // }

      // socket.join(room.id);
      // console.log(`Player joined room with id ${room.id}`);
      // onSuccessCallback();
    });

    socket.on("gyrovalues", value => {
      console.log(value);
    });
    
    socket.on("click", () => {
      console.log('click');
    })

    socket.on("disconnect", () => {
      console.log("client disconnected");
    });
  });

  app.all("*", (req: any, res: any) => nextHandler(req, res));

  server.listen(port, () => {
    console.log(
      `> Server listening at http://localhost:${port} as ${
        dev ? "development" : process.env.NODE_ENV
      }`
    );
  });
});
