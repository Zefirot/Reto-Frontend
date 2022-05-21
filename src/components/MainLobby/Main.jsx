import React, { Fragment } from 'react'
import CardPreview from './CardPreview';

export default function Main() {
    const questions = ["Por que te presentas a esta entrevista?",
    "Del 1 al 10 que tan extrovertido te consideras?",
    "Hace cuanto tiempo estas programando en NodeJS?",
    "Que te motiva dia a dia a mantenerte actualizado en esta industria?"];

    return (
        <Fragment>
            <div className='container'>
                <h1>Video Cuestionario</h1>

                <CardPreview arrayOfQuestions={questions}/>
            </div>
        </Fragment>
    )
}
