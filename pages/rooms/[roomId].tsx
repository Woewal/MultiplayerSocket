import { useRouter } from 'next/router'
import { useEffect } from 'react';
import io from 'Socket.IO-client'
let socket;

const Room = () => {
    const router = useRouter()
    const { roomId } = router.query;

    useEffect(() => {socketInitializer()}, []);

    const socketInitializer = async () => {
         socket = io()

        // console.log(socket);

        // socket.on('connect', msg => {
        //     console.log(msg);
        // })

        socket.on('ping', msg => {
            console.log(msg);
        })

        // socket.emit('joinroom', 'hallo');
    }

    return <div>
        welcome to room {roomId}
    </div>    
}

export default Room;