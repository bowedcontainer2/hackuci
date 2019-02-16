import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

//import MainForm from './MainForm.js'

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1>
            How are you feeling?
          </h1>
          <h2>Tell us your mood and we will choose the best drake song for you!</h2>
          <NameForm/>
        </header>
      </div>
    );
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

  handleSubmit(event) {
    alert('A phrase was submitted: ' + this.state.value);
    event.preventDefault();
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit} class="search-container">
       <input type="text" value={this.state.value} onChange={this.handleChange} id="search-bar" placeholder="Your mood in one word"/>
       <button type="submit"><img class="search-icon" src="http://www.endlessicons.com/wp-content/uploads/2012/12/search-icon.png"/></button>
     </form>
    );
  }
}

export default App;
