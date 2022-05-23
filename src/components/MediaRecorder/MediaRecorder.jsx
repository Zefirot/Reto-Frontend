import React, { useRef, useState } from 'react';
import Button from '@mui/material/Button';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import IconButton from '@mui/material/IconButton';
import PlayCircleIcon from '@mui/icons-material/PlayCircle';
import StopCircleIcon from '@mui/icons-material/StopCircle';
import ReplayCircleFilledIcon from '@mui/icons-material/ReplayCircleFilled';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';

const buttonStyle = {
  'color': 'white',
  'position': 'absolute',
  'top': '430px',
  'left': '530px',
  'width': '50px',
  'height': '50px'
}

const textTimeVideoStyle = {
  'color': 'white',
  'position': 'absolute',
  'top': '80px',
  'left': '1000px',
  'width': '50px',
  'height': '50px'
}

const redButtonRecordingStyle = {
  'color': 'red',
  'position': 'absolute',
  'top': '90px',
  'left': '1050px',
}



export default function RecordWindow({ question, backToMain, goPrev, goNext }) {
  let mediaRecorder;
  let recordedBlobs;
  let idInterval;
  const [videoState, setVideoState] = useState("Start");  
  const videoRef = useRef();
  const [timeVideo, setTimeVideo] = useState(0);
  
  const webCamOn = async () => {
    const constraints = { audio: true, video: true };

    try {
      const stream = await navigator.mediaDevices.getUserMedia(constraints);
      window.stream = stream;

      videoRef.current.srcObject = stream;
      videoRef.current.play()

    } catch (e) {
      console.error('navigator.getUserMedia error:', e);
    }
  };

  const startRecording = async () => {
    await webCamOn();

    recordedBlobs = [];


    let timeVar = 0
    idInterval = setInterval(() => {
      setTimeVideo(timeVar)

      timeVar++;
      if (timeVar >= 120){
        clearInterval(idInterval);
        stopRecording();
      }

    },1000);
    
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
    setVideoState("Stop");
  }

  const stopRecording = () => {
    clearInterval(idInterval);
    setTimeVideo(0);
    videoRef.current.srcObject = null; //Se limpia la pantalla
    mediaRecorder.stop();
    setVideoState("RePlay");
  }

  const handleDataAvailable = (event) => {
    if (event.data && event.data.size > 0) {
      recordedBlobs.push(event.data);
    }
  }

  const playVideo = () => {
    const superBuffer = new Blob(recordedBlobs);
    videoRef.current.src = null;
    videoRef.current.srcObject = null;
    videoRef.current.src = window.URL.createObjectURL(superBuffer);
    videoRef.current.controls = true;
    videoRef.current.play();
  }

  const time_convert = (num) =>{ 
  var hours = Math.floor(num / 60);  
  var minutes = num % 60;
  return "0"+hours + ":" + minutes;         
}

  const videoButtonStart = (
    <IconButton size="large" sx={buttonStyle} onClick={startRecording}>
      <PlayCircleIcon fontSize="large" />
    </IconButton>);

  const videoButtonStop = (
    <IconButton size="large" sx={buttonStyle} onClick={stopRecording}>
      <StopCircleIcon fontSize="large" />
    </IconButton>)

  const videoButtonReplay = (
    <IconButton size="large" sx={buttonStyle} onClick={startRecording}>
      <ReplayCircleFilledIcon fontSize="large" />
    </IconButton>)

  return (
    <div className='conteinerVideo'>
      <div className='containerBackButton'>
        <ArrowBackIcon />
        <Button id='buttonBack' onClick={backToMain}>Volver</Button>
      </div>
      <div >
        <video ref={videoRef} ></video>
        <div className='questionConteiner'>
          <p className='textQuestion'>{question}</p>
        </div>
        {videoState === "Start" && videoButtonStart}

        {videoState === "Stop" && videoButtonStop}
        {videoState === "Stop" &&<p style={textTimeVideoStyle}>{String(time_convert(timeVideo))}</p>}
        {videoState === "Stop" &&timeVideo%2===0 && <FiberManualRecordIcon sx={redButtonRecordingStyle} />}

        {videoState === "RePlay" && videoButtonReplay}

        <button onClick={playVideo}>Play Record</button> 
      </div>

      <div className='containerButtonsLoop'>
        <Button onClick={goPrev}>Atras</Button>
        <Button onClick={goNext}>Siguiente</Button>
      </div>

    </div>
  )
}