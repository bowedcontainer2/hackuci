import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'

library.add(faSearch)

//import MainForm from './MainForm.js'

class App extends Component {
  constructor(props) {
        super(props);
        this.state = {
            songRecieved: false,
            songName: ''
        };
    }

    myCallback = (dataFromForm) => {
      this.setState({songRecieved: dataFromForm});
    }

    phraseCallback = (phrase) => {
      fetch('http://127.0.0.1:5000?mood='+ phrase).then(response => {
        return response.json();
        }).then(data => {
        // Work with JSON data here
        //this.setState({songName: data.Song});
        console.log(data["Song"]);

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
          <h2>Tell us your mood and we will choose the best drake song for you!</h2>
          <NameForm songCallBack={this.myCallback} phraseCallback={this.phraseCallback} />

          <SongDisplay isSongReturned={this.state.songRecieved}/>
        </header>
      </div>
    );
  }
}


function spotifySearchChain() {

  let songName = "Nonstop dude", artist = "Drake";

    songName = songName.split(" ")
    let songArray = new Array();
    for(var i = 0; i < songName.length; i++) {
      songArray.push(songName[i]);
      if( i != songName.length - 1) {
        songArray.push(" ");
      }
    }

    var spotifyChain = "";

    for(var i = 0; i < songArray.length; i++) {
      spotifyChain += songArray[i];
      if(i < songArray.length - 1) {
        spotifyChain += "%20";
      }
    }
    return spotifyChain;

}


function SongVisual(props) {
  var name = spotifySearchChain();
  var nameTest = "nonstop%20drake";

  //document.getElementById("link").setAttribute("href", nameTest);

   var a = document.createElement('a');
   var linkText = document.createTextNode("Spotify");
   a.appendChild(linkText);
   a.title = "Spotify";
   a.href = "https://open.spotify.com/search/results/drake%20nonstop";


  return <div>
      <h1> is the best song for you right now.</h1>

      <h2>Listen to it now on <a href={"https://open.spotify.com/search/" + name }>Spotify.</a></h2>

    </div>;
}

function SongDisplay(props) {
  const isSongReturned = props.isSongReturned;
  if(isSongReturned) {
    return <SongVisual/>;
  }
  else {
   return <p></p>;
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
    if(this.state.value != '') {
      alert('A phrase was submitted: ' + this.state.value);
      const songSentAndRecieved = true;
      this.props.songCallBack(songSentAndRecieved);
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
