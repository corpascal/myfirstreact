import React, { Component } from 'react';
import axios from 'axios';

class App extends Component {

  constructor() {
    super();

    console.log('App.constructor - entrée2');
    this.state = {restos: []};

    this.hostname = 'localhost';
    if (process.env.NODE_ENV == 'production')
      this.hostname = '35.180.173.251';
  }

  componentDidMount() {
    console.log(`App.componentDidMount - this.hostname=${this.hostname}`);

    // fetch('http://localhost:8888/api/v1/restos', {mode: 'cors'})
    // .then((res) => res.json())
    // .then((data) => {
    //   console.log(data);
    // });

    axios.get(`http://${this.hostname}:8888/api/v1/restos`)
    .then((res) => {
      console.log(res.data);
      let reponse = res.data;
      if (reponse.code === 0)
        this.setState({restos:reponse.data});
    });
  }


  handleDelete = (id) => {
    alert(id);
  }


  render() {
    console.log(this.state.restos);
    
    return (
      <div>
        <h1>Liste des restos</h1>
        <ul>
            {this.state.restos.map((resto) => (
              <li>
                {resto.name} <button onClick={() => this.handleDelete(resto.id)}>X</button>
              </li>
            ))}
        </ul>
      </div>
    );
  }
}

export default App;
