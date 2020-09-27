import React, { Component } from 'react';
import Navigation from './components/Navigation/Navigation';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';
import SignIn from './components/SignIn/SignIn';
import Register from './components/Register/Register';
import Logo from './components/Logo/Logo';
import Rank from './components/Rank/Rank';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
// import Particles from 'react-particles-js';
import './App.css';
import Clarifai from 'clarifai';

const app = new Clarifai.App({
  apiKey: '2de802196a2e463ca68840abbbf032b2'
});

// const particlesOptions = {
//     "particles": {
//         "number": {
//             "value": 130
//         },
//         "size": {
//             "value": 3
//         }
//     },
//     "interactivity": {
//         "events": {
//             "onhover": {
//                 "enable": true,
//                 "mode": "repulse"
//             }
//         }
//     }
// }

class App extends Component {
  constructor() {
    super();
    this.state = {
      input: '',
      imageURL: '',
      box: {},
      route: 'signin',
      isSignIn: false,
    }
  }

  calculateFaceLocation = (data) => {
    const clarifaiFace = data['outputs'][0]['data']['regions'][0]['region_info'].bounding_box;
    const image = document.getElementById('inputimage');
    const width = Number(image.width);
    const height = Number(image.height);
    return {
      leftCol: clarifaiFace.left_col * width,
      rightCol: width - (clarifaiFace.right_col * width),
      topRow: clarifaiFace.top_row * height,
      bottomRow: height - (clarifaiFace.bottom_row * height)
    }
  }

  displayFaceBox = (box) => {
    this.setState({ box: box });
  }

  onInputChange = (event) => {
    this.setState({ input: event.target.value });
  }

  onButtonSubmit = () => {
    this.setState({ imageURL: this.state.input });
    app.models.predict(Clarifai.FACE_DETECT_MODEL, this.state.input)
      .then(response => this.displayFaceBox(this.calculateFaceLocation(response)))
      .catch(err => console.log(err));
  }

  onRouteChange = (route) => {
    if (route === 'signout') {
      this.setState({isSignIn: false});
    } else if (route === 'home') {
      this.setState({isSignIn: true});
    }
    this.setState({ route:route })
  }

  render() {
    const {isSignIn, box, route, imageURL} = this.state;
    return (
      <div className="App">
        {/* <Particles className="particles" params={particlesOptions} /> */}
        <Navigation 
        isSignIn={isSignIn}
        onRouteChange={this.onRouteChange}/>
        { route === 'home'
          ? <div>
              <Logo />
              <Rank />
              <ImageLinkForm 
                onInputChange={this.onInputChange} 
                onButtonSubmit={this.onButtonSubmit}
              />
              <FaceRecognition
                box={box} 
                imageURL={imageURL}
              />
            </div>
           
          : ( route === 'signin'
            ? <SignIn onRouteChange={this.onRouteChange} />
            : <Register onRouteChange={this.onRouteChange} />
          )  
        }
      </div>
    );
  }
}

export default App;


