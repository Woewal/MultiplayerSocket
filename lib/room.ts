class Room {
    id : string;
    host : string;

    constructor(host : string) {
        this.host = host;
        this.id = Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0, 4).toUpperCase();
    }
}

export default Room;