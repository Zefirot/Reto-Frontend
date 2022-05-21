import React, { Fragment } from 'react'
import IconButton from '@mui/material/IconButton';
import PlayCircleFilledIcon from '@mui/icons-material/PlayCircleFilled';

const iconButtonStyle = {
    'color':'white',
    'margin-top': '130%',
    'margin-right': '80%',
    'border-radius': '80%'
}

export default function CardPreview({ arrayOfQuestions }) {
    return (
        <Fragment>
            <div className='containerVideos'>
                {arrayOfQuestions.map(element => {
                    return (
                        <div className='videoRecorder'>
                            <IconButton size="large" sx={iconButtonStyle} >
                                <PlayCircleFilledIcon fontSize='large'/>
                            </IconButton >
                            <div className='questionConteiner'>
                                <p className='textQuestion'>{element}</p>
                            </div>
                        </div>)
                })}
            </div>
        </Fragment>

    )
}
