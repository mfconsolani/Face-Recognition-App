import React from 'react';
import './FaceRecognition.css';

const FaceRecognition = ({ imageURL }) => {
    return (
    <div className='center ma'>
        <div className='absolute mt2'>
            <img alt='random' src={imageURL}/>
        </div>
    </div>
    );
}

export default FaceRecognition;