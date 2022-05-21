import React, { useRef } from 'react';

export default function RecordWindow() {
  let mediaRecorder;
  let recordedBlobs;
  const myContainer = useRef();

  const webCamOn = async () => {
    const constraints = { audio: true, video: { width: 1280, height: 720 } };

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
    <div>
      <video ref={myContainer}></video>
      <button onClick={startRecording}>Start</button>
      <button onClick={stopRecording}>Stop</button>
      <button onClick={playVideo}>Play Record</button>
    </div>
  )
}