import Room from "./room";

class RoomManager {
    rooms : Room[] = [];

    createNewRoom = (host:string) => {
        const room = new Room(host);
        this.rooms.push(room);
        return room;
    }
}

export default new RoomManager();