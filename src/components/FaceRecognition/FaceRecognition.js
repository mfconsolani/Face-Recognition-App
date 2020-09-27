import React from 'react';
import './FaceRecognition.css';

const FaceRecognition = ({ imageURL }) => {
    return (
    <div className='center ma'>
        <div className='absolute mt2'>
            <img className='br3' alt='' src={imageURL} width='500px' height='auto'/>
        </div>
    </div>
    );
}

export default FaceRecognition;