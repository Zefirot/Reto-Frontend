import React, { Fragment, useState } from 'react'
import MediaRecorder from '../MediaRecorder/MediaRecorder'
import IconButton from '@mui/material/IconButton';
import PlayCircleFilledIcon from '@mui/icons-material/PlayCircleFilled';

const iconButtonStyle = {
    'color': 'white',
    'marginTop': '130%',
    'marginRight': '80%',
    'borderRadius': '80%'
}

/**videosStatus es un dict que contiene el estado de cada grabacion y el video que se grabo
 * esto quizas estaria bueno a posterior almacenarlo en algun otro lado **/ 
let videosStatus = {
    0: {
        Status: "Start",
        VideoRecord: null,
    },
    1: {
        Status: "Start",
        VideoRecord: null,
    },
    2: {
        Status: "Start",
        VideoRecord: null,
    },
    3: {
        Status: "Start",
        VideoRecord: null,
    }
}

let isTheLastVideoToProcess = false;
export default function Main() {

    const arrayOfQuestions = ["Por que te presentas a esta entrevista?",
        "Del 1 al 10 que tan extrovertido te consideras?",
        "Hace cuanto tiempo estas programando en NodeJS?",
        "Que te motiva dia a dia a mantenerte actualizado en esta industria?"];

    const [mediaShowNumber, setMediaNumber] = useState(-1);

    const showMediaRecorder = (index) => {
        isTheLastVideoToRecord(index);
        setMediaNumber(index);
    }

    const modifyVideoStatus = (status, video) => {
        videosStatus[mediaShowNumber].Status = status
        videosStatus[mediaShowNumber].VideoRecord = video
        console.log(videosStatus)
    }

    const isTheLastVideoToRecord = (index) => {
        let isTheLast = 0;
        for (const [key, value] of Object.entries(videosStatus)) {
            if (value.Status !== "Start" && key !== index) {
                isTheLast++;
            }
        }
        isTheLastVideoToProcess = isTheLast === Object.keys(videosStatus).length - 1
    }

    const backToMain = (status, video) => {
        modifyVideoStatus(status, video);
        setMediaNumber(-1);
    }

    const goPrev = (status, video) => {
        modifyVideoStatus(status, video);
        let numberToSet = mediaShowNumber - 1;
        if (numberToSet < 0) {
            numberToSet = arrayOfQuestions.length - 1;
        }
        isTheLastVideoToRecord(numberToSet);
        setMediaNumber(numberToSet);
    }

    const goNext = (status, video) => {
        modifyVideoStatus(status, video);

        let numberToSet = mediaShowNumber + 1;
        if (numberToSet >= arrayOfQuestions.length) {
            numberToSet = 0;
        }

        isTheLastVideoToRecord(numberToSet);
        setMediaNumber(numberToSet);
    }

    return (
        <Fragment>
            {mediaShowNumber === -1 &&
                <div className='container'>
                    <h1>Video Cuestionario</h1>

                    <div className='containerVideos'>
                        {arrayOfQuestions.map((element, index) => {
                            return (
                                <div key={index} className='videoRecorder' >
                                    <IconButton size="large" sx={iconButtonStyle} onClick={() => showMediaRecorder(index)}>
                                        <PlayCircleFilledIcon fontSize='large' />
                                    </IconButton >
                                    <div className='questionConteiner'>
                                        <p className='textQuestion'>{element}</p>
                                    </div>
                                </div>)
                        })}
                    </div>
                </div>
            }
            {mediaShowNumber >= 0 &&
                <MediaRecorder key={mediaShowNumber}
                    question={arrayOfQuestions[mediaShowNumber]}
                    backToMain={backToMain}
                    prevState={videosStatus[mediaShowNumber].Status}
                    prevVideo={videosStatus[mediaShowNumber].VideoRecord}
                    goPrev={goPrev}
                    goNext={goNext}
                    isTheLastVideo={isTheLastVideoToProcess} />}
        </Fragment>
    )
}
