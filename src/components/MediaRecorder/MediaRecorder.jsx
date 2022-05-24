import React, { useRef, useState } from 'react';
import Button from '@mui/material/Button';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import IconButton from '@mui/material/IconButton';
import PlayCircleIcon from '@mui/icons-material/PlayCircle';
import StopCircleIcon from '@mui/icons-material/StopCircle';
import ReplayCircleFilledIcon from '@mui/icons-material/ReplayCircleFilled';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';

/**Los botones que se despliegan en la grabacion tiene posicion absoluta, por cuestiones de tiempo
 * no encontre una forma rapida de poder implementar una mejor forma de posicionar los botones dentro
 * de la caja de video **/
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


let mediaRecorder;
let recordedBlobs;
let idInterval;
export default function RecordWindow({ question, prevState, prevVideo, backToMain, goPrev, goNext, isTheLastVideo }) {
  if (prevVideo){
    recordedBlobs = prevVideo;
  }
  const [videoState, setVideoState] = useState(prevState);
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
      if (timeVar >= 120) { //Esto es el tiempo limite del video pero solo es una aproximacion
        clearInterval(idInterval);
        stopRecording();
      }

    }, 1000);

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
    videoRef.current.srcObject = null; //Se deja de transmitir la pantalla
    mediaRecorder.stop();
    setVideoState("RePlay");
  }

  const handleDataAvailable = (event) => {
    if (event.data && event.data.size > 0) {
      recordedBlobs=event.data;
    }
  }

  const playVideo = () => { //Esta funcion solo existe para corroborar que el video se grabo efectivamente
    const superBuffer = new Blob(Array(recordedBlobs));
    videoRef.current.src = null;
    videoRef.current.srcObject = null;
    videoRef.current.src = window.URL.createObjectURL(superBuffer);
    videoRef.current.controls = false;
    videoRef.current.play();
  }

  const time_convert = (num) => { //Funcion que se usa para convertir el contador en minutos y segundos
    let minutes = Math.floor(num / 60);
    let seconds = num % 60;
    return "0" + minutes + ":" + seconds;
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
        <Button id='buttonBack' onClick={() => backToMain(videoState, recordedBlobs)}>Volver</Button>
      </div>
      <div >
        <video ref={videoRef} ></video>
        <div className='questionConteiner'>
          <p className='textQuestion'>{question}</p>
        </div>
        {videoState === "Start" && videoButtonStart}

        {videoState === "Stop" && videoButtonStop}
        {videoState === "Stop" && <p style={textTimeVideoStyle}>{String(time_convert(timeVideo))}</p>}
        {videoState === "Stop" && timeVideo % 2 === 0 && <FiberManualRecordIcon sx={redButtonRecordingStyle} />}

        {videoState === "RePlay" && videoButtonReplay}

      </div>

      <div className='containerButtonsLoop'>
        <Button onClick={() => goPrev(videoState, recordedBlobs)}>Atras</Button>
        {isTheLastVideo && videoState === "RePlay" ?
        <Button onClick={() => backToMain(videoState, recordedBlobs)}>Terminar</Button>
        :
        <Button onClick={() =>goNext(videoState, recordedBlobs)}>Siguiente</Button>}
      </div>

    </div>
  )
}