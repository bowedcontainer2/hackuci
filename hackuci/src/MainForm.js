import React, { Component } from 'react';

class MainForm extends Component {
  constructor(props) {
    super(props);
    this.state = {phrase: ''};

    this.handleSubmit = this.handleSubmit.bind(this);
  }


  handleSubmit(event) {
    alert('A phrase was submitted: ' + this.state.phrase);
    event.preventDefault();
  }

  render() {
   return (
     <form onSubmit={this.handleSubmit}>
       <label>
         Phrase:
         <input type="text" value={this.state.value} onChange={this.handleChange} />
       </label>
       <input type="submit" value="Submit" />
     </form>
   );
 }

}
