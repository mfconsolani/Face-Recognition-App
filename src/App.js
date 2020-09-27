import React, { Component } from 'react';
import Navigation from './components/Navigation/Navigation';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';
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
    }
  }

  onInputChange = (event) => {
    this.setState({input: event.target.value});
  }

  onButtonSubmit = () => {
    this.setState({imageURL: this.state.input });
    app.models.predict(Clarifai.FACE_DETECT_MODEL, this.state.input)
      // .then(generalModel => {
      //   return generalModel.predict("https://source.unsplash.com/300x500");
      // })
      .then(response => {
        console.log(response['outputs'][0]['data']['regions'][0]['region_info'].bounding_box);
        // var concepts = response['outputs'][0]['data']['concepts']
      })
  }

  render() {
    return (
      <div className="App">
      {/* <Particles className="particles" params={particlesOptions} /> */}
        <Navigation />
        <Logo />
        <Rank />
        <ImageLinkForm 
          onInputChange={this.onInputChange} 
          onButtonSubmit={this.onButtonSubmit}
        />
        <FaceRecognition 
          imageURL={this.state.imageURL}
        />
      </div>
    );
  }
}

export default App;
