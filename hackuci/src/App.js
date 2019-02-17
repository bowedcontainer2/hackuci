import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'

library.add(faSearch)


class App extends Component {
  constructor(props) {
        super(props);
        this.state = {
            phraseRecieved: false,
            songRecieved: false,
            songName: '',
            data: []
        };
    }

    myCallback = (dataFromForm) => {
      this.setState({phraseRecieved: dataFromForm});
    }

    phraseCallback = (phrase) => {
      fetch('http://127.0.0.1:5000?mood='+ phrase).then(response => {
        return response.json();
        }).then(data => {
        // Work with JSON data here
        console.log(data[0].Song);
        this.setState({songName: data[0].Song, songRecieved: true});

        }).catch(err => {
        // Do something for an error here
        });
    }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1>
            How are you feeling?
          </h1>
          <h2>Tell us your mood and we will choose the best Kendrick Lamar song for you!</h2>
          <NameForm songCallBack={this.myCallback} phraseCallback={this.phraseCallback} />

          <SongDisplay phraseRecieved={this.state.phraseRecieved} isSongReturned={this.state.songRecieved} songNameOne={this.state.songName} />

        </header>
      </div>
    );
  }
}


function SongVisual(props) {


  return <div>
      <h1>{props.songNameTwo} by Kendrick Lamar is the best song for you right now.</h1>

      <h2>Listen to it now on <a href={"https://open.spotify.com/search/" }>Spotify.</a></h2>

    </div>;
}

function SongDisplay(props) {
  var Spinner = require('react-spinkit');
  const isSongReturned = props.isSongReturned;
  const phraseRecieved = props.phraseRecieved;
  const songNameOne = props.songNameOne;
  while( phraseRecieved && !isSongReturned ) {
    return <div>
      <h3>Fetching your perfect song...</h3>
      <Spinner name="ball-grid-pulse" color="white" />
      </div>;
  }
  if(isSongReturned) {
   return <SongVisual songNameTwo={songNameOne} />;
  }
  else {
    return <h5>We use Sentiment analysis models and lyric APIs to give you the most relevant song to your mood!</h5>;
  }
}




class NameForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {value: ''};

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  handleSubmit(event, props) {
    if(this.state.value !== '') {
      // alert('A phrase was submitted: ' + this.state.value);
      const sentPhrase = true;
      this.props.songCallBack(sentPhrase);
      this.props.phraseCallback(this.state.value);
    }
    else {
      alert('Please Enter a Valid Phrase.')
    }
    event.preventDefault();
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit} class="search-container">
       <input type="text" value={this.state.value} onChange={this.handleChange}
        id="search-bar" placeholder="Your mood in a word or phrase"/>
       <button type="submit" class="search-icon">
        <FontAwesomeIcon icon="search" />
       </button>
     </form>
    );
  }
}

export default App;
