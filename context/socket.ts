import { createContext } from "react";
import { io, Socket } from "socket.io-client";

interface SocketContextInterface {
    socket : Socket,
    isConnected : boolean
}

const initialState = {
    socket: null,
    isConnected: false,
} as SocketContextInterface

export const SocketContext = createContext(initialState);