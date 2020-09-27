import React from 'react';
import './Navigation.css';

const Navigation = ({onRouteChange, isSignIn}) => {
    
    if (isSignIn) {
        return (
            <nav className='' 
                style={{display: 'flex', justifyContent: 'flex-end'}}>
                <p 
                    onClick={() => onRouteChange('signin')} 
                    className='f3 link dim black pa3 pointer black'
                >Sign Out</p>
            </nav>
        );
    } else {
        return (
            <nav 
                className='' 
                style={{display: 'flex', justifyContent: 'flex-end'}}>
                <p 
                    onClick={() => onRouteChange('signin')} 
                    className='f3 link dim black pa3 pointer black'
                >Sign In</p>
                <p 
                    onClick={() => onRouteChange('register')} 
                    className='f3 link dim black pa3 pointer black'
                >Register</p>
            </nav>
        );
    }
}

export default Navigation;