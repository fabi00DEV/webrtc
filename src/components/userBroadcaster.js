import React, { useState, useEffect, useRef, useCallback } from 'react';
import Peer from 'peerjs';

const UserBroadcaster = () => {

    // const peerRef = useRef(null)
    const [stream, setStream] = useState(null)
    const [peerId, setPeerId] = useState(null)
    const [input, setInput] = useState('');

    const streamRef = useRef()
    const peerRef = useRef()

    useEffect(() => {
        setMedia()    
        initPeerConnection()
    },[stream])

    const screenSharing = () => {
        return new Promise((resolve, reject) => {
            if (navigator.getDisplayMedia) {
                resolve(navigator.getDisplayMedia({ video: true }))
            } else if (navigator.mediaDevices.getDisplayMedia) {
                resolve(navigator.mediaDevices.getDisplayMedia({ video: true }))
            } else {
                resolve(navigator.mediaDevices.getUserMedia({ video: { mediaSource: 'screen' } }))
            }
        })
    }

    const getScreenSharing = () => {
        const stream = screenSharing().then((stream) => {
            setStream(stream)
        })
    }

    const setMedia = () => {
        var video = document.querySelector('video');
        video.srcObject = stream;
        video.play();
    }

    const initPeerConnection = () => {
        if(!peerId){
            peerRef.current = new Peer(null, {
                host: 'localhost',
                port: 9000,
                path: '/'
            });
        
            peerRef.current.on('open', (peer_id) => {
                console.log('broadcaster_id', peer_id);
                setPeerId(peer_id)
            })
        }
    }

    

    const makeCall = () => {
        console.log('making a caall ')
        console.log(stream)
        peerRef.current.call(input, stream)
    }

    return (
        <>
            <div>
                screen sharing on: {peerId}
            </div>
            <button onClick={getScreenSharing}>starting record</button>
            <input value={input} onInput={e => setInput(e.target.value)} />
            <button onClick={makeCall}>call to new peer</button>
            <video autoPlay></video><br />
        </>
    );
};

export default UserBroadcaster;