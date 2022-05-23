import React, { Fragment, useState } from 'react'
import MediaRecorder from '../MediaRecorder/MediaRecorder'
import IconButton from '@mui/material/IconButton';
import PlayCircleFilledIcon from '@mui/icons-material/PlayCircleFilled';

const iconButtonStyle = {
    'color': 'white',
    'margin-top': '130%',
    'margin-right': '80%',
    'border-radius': '80%'
}

export default function Main() {
    const arrayOfQuestions = ["Por que te presentas a esta entrevista?",
        "Del 1 al 10 que tan extrovertido te consideras?",
        "Hace cuanto tiempo estas programando en NodeJS?",
        "Que te motiva dia a dia a mantenerte actualizado en esta industria?"];

    let videosStatus = {
        
    }

    const [mediaShowNumber, setMediaNumber] = useState(-1);

    const showMediaRecorder = (index) => {
        setMediaNumber(index);
    }

    const backToMain = () => {
        setMediaNumber(-1);
    }

    const goPrev = () => {
        let numberToSet;
        numberToSet = mediaShowNumber - 1;
        if (mediaShowNumber - 1 < 0) {
            numberToSet = arrayOfQuestions.length - 1;
        }
        setMediaNumber(numberToSet);
    }

    const goNext = () => {
        let numberToSet;
        numberToSet = mediaShowNumber + 1;
        if (mediaShowNumber + 1 >= arrayOfQuestions.length) {
            numberToSet = 0;
        }
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
                                <div className='videoRecorder'>
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
            {mediaShowNumber === 0 &&
                <MediaRecorder question={arrayOfQuestions[mediaShowNumber]}
                    backToMain={backToMain}
                    goPrev={goPrev}
                    goNext={goNext} />}
            {mediaShowNumber === 1 &&
                <MediaRecorder question={arrayOfQuestions[mediaShowNumber]}
                    backToMain={backToMain}
                    goPrev={goPrev}
                    goNext={goNext} />}
            {mediaShowNumber === 2 &&
                <MediaRecorder question={arrayOfQuestions[mediaShowNumber]}
                    backToMain={backToMain}
                    goPrev={goPrev}
                    goNext={goNext} />}
            {mediaShowNumber === 3 &&
                <MediaRecorder question={arrayOfQuestions[mediaShowNumber]}
                    backToMain={backToMain}
                    goPrev={goPrev}
                    goNext={goNext} />}
        </Fragment>
    )
}
