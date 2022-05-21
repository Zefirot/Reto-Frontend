import React, {useRef} from 'react';
//import './src/components/MediaRecorder/MediaRecorder.css';

export default function MediaRecorder() {
  let mediaRecorder;
  let recordedBlobs;
  const myContainer = useRef();
  /* const style = {
    '--width':'25vw',
    'width': 'var(--width)',
    'height':'calc(var(--width) * 0.5625)',
    'background': '#222'
  }
 */
  const webCamOn = async () => {
    const constraints = {audio: true, video: {width: 1280, height: 720}};

    try {
      const stream = await navigator.mediaDevices.getUserMedia(constraints);
      window.stream = stream;

      myContainer.current.srcObject = stream;
      myContainer.current.play()
    } catch (e) {
      console.error('navigator.getUserMedia error:', e);
    }
  };

  return (
    <div>
      <video ref={myContainer} >
        <button>asd</button>
      </video>
      <button onClick={webCamOn}>Start</button>
      <button>Stop</button>
    </div>
  )
}




/* function startRecording() {
  recordedBlobs = [];

  try {
    mediaRecorder = new MediaRecorder(window.stream);
  } catch (e) {
    console.error('Exception while creating MediaRecorder:', e);
    errorMsgElement.innerHTML = `Exception while creating MediaRecorder: ${JSON.stringify(e)}`;
    return;
  }

  console.log('Created MediaRecorder', mediaRecorder, 'with options', options);
  recordButton.textContent = 'Stop Recording';
  mediaRecorder.onstop = (event) => {
    console.log('Recorder stopped: ', event);
    console.log('Recorded Blobs: ', recordedBlobs);
  };
  mediaRecorder.ondataavailable = handleDataAvailable;
  mediaRecorder.start();
  console.log('MediaRecorder started', mediaRecorder);
}
function stopRecording() {
  mediaRecorder.stop();
} */


/* const playButton = document.querySelector('button#play');
playButton.addEventListener('click', () => {
  const mimeType = codecPreferences.options[codecPreferences.selectedIndex].value.split(';', 1)[0];
  const superBuffer = new Blob(recordedBlobs, {type: mimeType});
  recordedVideo.src = null;
  recordedVideo.srcObject = null;
  recordedVideo.src = window.URL.createObjectURL(superBuffer);
  recordedVideo.controls = true;
  recordedVideo.play();
}); */