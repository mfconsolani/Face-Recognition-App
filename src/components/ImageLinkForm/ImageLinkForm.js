import React from 'react';
import './ImageLinkForm.css';

const ImageLinkForm = ({ onInputChange }) => {
    return (
        <div>
            <p className='f3 white'>
                {'This Magic Brain will detect faces in your pictures'}
            </p>
            <div className='center'>
                <div className='form center pa4 br3 shadow-5'>
                    <input className="f3 pa2 w-70 center bn br4" type="text" onChange={onInputChange}></input>
                    <button className="w-30 f4 grow link dim br3 bn ph3 pv2 dib ml1 white bg-light-purple">Detect</button>
                </div>
            </div>
        </div>

    );
}

export default ImageLinkForm;