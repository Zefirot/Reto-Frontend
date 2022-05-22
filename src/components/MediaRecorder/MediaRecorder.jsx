import React, { useRef } from 'react';
import Button from '@mui/material/Button';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

export default function RecordWindow() {
  let mediaRecorder;
  let recordedBlobs;
  const myContainer = useRef();

  const webCamOn = async () => {
    const constraints = { audio: true, video: true };

    try {
      const stream = await navigator.mediaDevices.getUserMedia(constraints);
      window.stream = stream;

      myContainer.current.srcObject = stream;
      myContainer.current.play()

    } catch (e) {
      console.error('navigator.getUserMedia error:', e);
    }
  };

  const startRecording = async () => {
    await webCamOn()

    recordedBlobs = [];

    try {
      mediaRecorder = new MediaRecorder(window.stream);
    } catch (e) {
      console.error('Exception while creating MediaRecorder:', e);
      return;
    }

    console.log('Created MediaRecorder', mediaRecorder);
    mediaRecorder.onstop = (event) => {
      console.log('Recorder stopped: ', event);
      console.log('Recorded Blobs: ', recordedBlobs);
    };
    mediaRecorder.ondataavailable = handleDataAvailable;
    mediaRecorder.start();
    console.log('MediaRecorder started', mediaRecorder);
  }

  const stopRecording = () => {
    mediaRecorder.stop();
  }

  const handleDataAvailable = (event) => {
    if (event.data && event.data.size > 0) {
      recordedBlobs.push(event.data);
    }
  }

  const playVideo = () => {
    const superBuffer = new Blob(recordedBlobs);
    myContainer.current.src = null;
    myContainer.current.srcObject = null;
    myContainer.current.src = window.URL.createObjectURL(superBuffer);
    myContainer.current.controls = true;
    myContainer.current.play();
  }

  return (
    <div className='conteinerVideo'>
      <div className='containerBackButton'>
        <ArrowBackIcon />
        <Button id='buttonBack' >Volver</Button>
      </div>
      <div className='contianerVideoWithDetails'>
        <video ref={myContainer} duration="5"></video>

        <button id='buttonStartRecording' onClick={startRecording} >Start</button>
        <button onClick={stopRecording}>Stop</button>
        <button onClick={playVideo}>Play Record</button>
      </div>

      <div className='containerButtonsLoop'>
        <Button>Atras</Button>
        <Button>Siguiente</Button>
      </div>

    </div>
  )
}