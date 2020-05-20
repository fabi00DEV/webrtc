import React, { useState, useEffect } from 'react';
import Peer from 'peerjs';

export default function Call() {


    const [input, setInput] = useState('');

    const makeCall = () => {

        const peer = new Peer(null, {
            host: 'localhost',
            port: 9000,
            path: '/'
        });

        peer.on('open', (id) => {
            console.log(`getting id ${id}`)
            navigator.mediaDevices.getUserMedia({video: false, audio: true}).then((stream => {
                const call = peer.call(input, stream);
                call.on('stream', (remoteStream) => {
                    console.log('streaming')
                    // Show stream in some <video> element.
                });

            })).catch((e) => {
                console.log(e)
            });
        })

    }

    return (<>
        <h1>call</h1>
        <br></br>
        <div>
            <audio controls></audio>
            <label>Please specify:</label>
            <h1>{input}</h1>
            <input value={input} onInput={e => setInput(e.target.value)} />
        </div>
        <button onClick={makeCall}>Call</button>
    </>)
}



