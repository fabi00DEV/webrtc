import React, { useState, useEffect } from 'react';
import Peer from 'peerjs';

export default function Receiver() {

    const [roomId, setRoomId] = useState(null)

    const initConnection = () => {
        const peer = new Peer(null, {
            host: '35.194.15.225',
            port: 9001,
            path: '/',
            key: 'peer'
        });

        peer.on('open', function (id) {
            if (!roomId) {
                setRoomId(id)
            }

            peer.on('call', (call) => {

                console.log('receiving a call')
                call.answer();
                call.on('stream', (remoteStream) => {
                    console.log(remoteStream)
                    var video = document.querySelector('video');
                    video.srcObject = remoteStream;
                    video.play();
                });
            })

        })
    }

    return (<>
        <h1>Receiver</h1>
        <h2>{roomId}</h2>
        <video autoPlay></video><br />
        <button onClick={initConnection}>ficar disponivel</button>
    </>)
}



