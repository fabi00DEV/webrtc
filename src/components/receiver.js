import React, { useState, useEffect } from 'react';
import Peer from 'peerjs';

export default function Receiver() {
    
    const [roomId, setRoomId] = useState(null)

    const initConnection = () => {
        const peer = new Peer(null, {
            host: 'localhost',
            port: 9000,
            path: '/'
          });

        peer.on('open', function(id){
            if(!roomId){
                setRoomId(id)
            }

            peer.on('call', (call) => {
                console.log('receiving a call')
                navigator.mediaDevices.getUserMedia({video: false, audio: true}).then((stream) => {
                    call.answer(stream); // Answer the call with an A/V stream.
                    call.on('stream', (remoteStream) => {
                        const audioTracks = stream.getAudioTracks();
                        const audio = document.querySelector('audio')  
                        console.log('Got stream with constraints:', {video: false, audio: true});
                        console.log('Using audio device: ' + audioTracks[0].label);
                        stream.oninactive = function () {
                          console.log('Stream ended');
                        };  
                        window.stream = stream; // make variable available to browser console
                        audio.srcObject = stream;

                    });
                }).catch((e) => console.log(e))
              });

        })
       
    }
    
    
    return (<>
        <h1>Receiver</h1>
        <h2>{roomId}</h2>
        <audio controls></audio>
        <br></br>
        <button onClick={initConnection}>ficar disponivel</button>
    </> )
}



