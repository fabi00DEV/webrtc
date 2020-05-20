import React, { useState, useEffect } from 'react';
import './App.css';
import Peer from 'peerjs';
import Call from './components/call'
import Receiver from './components/receiver'
import SelectUserType from './components/selectUserType'

function App() {


  const [wichUser , setWichUser] = useState(null)
  

  const handleOption = (option) => setWichUser(option)

  const wichRender  = (option) => {
    const toRender = {
      'call' : <Call></Call> , 
      'receiver' : <Receiver></Receiver>
    }

    return toRender[option] || <SelectUserType option={wichUser} handle={handleOption}></SelectUserType>

  }

  return  wichRender(wichUser)
  
  // const [peerId, setPeerId] = useState(null)

  // const connectPeer = () => {
  //   if (!peerId) {
      // const peer = new Peer(null, {
      //   host: 'localhost',
      //   port: 9000,
      //   path: '/'
      // });

  //     peer.on('open', function (id) {
  //       console.log(id)
  //       setPeerId(id)
  //     });
  //   }

  // }

  // const audio = document.querySelector('audio')
  // const constraints = window.constraints = {
  //   audio: true,
  //   video: false
  // };

  // function handleSuccess(stream) {
    // const audioTracks = stream.getAudioTracks();
    // console.log('Got stream with constraints:', constraints);
    // console.log('Using audio device: ' + audioTracks[0].label);
    // stream.oninactive = function () {
    //   console.log('Stream ended');
    // };
    // window.stream = stream; // make variable available to browser console
    // audio.srcObject = stream;

  // }

  // function handleError(error) {
  //   const errorMessage = 'navigator.MediaDevices.getUserMedia error: ' + error.message + ' ' + error.name;
  //   // errorMsgElement.innerHTML = errorMessage;
  //   console.log(errorMessage);
  // }

  // const streamAudio = () => {
  //   console.log('aqui')
  //   navigator.mediaDevices.getUserMedia(constraints).then(handleSuccess).catch(handleError);
  // }

  // connectPeer()

  // return (<>
  //   {peerId ? peerId : 'ainda nao definido'}
  //   <audio id="gum-local" controls ></audio>
  //   <button onClick={streamAudio} >Stream Audio</button>
  // </>)
}

export default App;
