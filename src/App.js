import React, { Component } from 'react';
import axios from 'axios';

class App extends Component {

  constructor() {
    super();

    console.log('App.constructor - entrée2');
    this.state = {restos: [], currentId:'', currentName:'', currentImage:'', currentDescription:''};

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

  handleSubmit = (event) => {
    event.preventDefault();
    const nouveauResto = {
      id: this.state.currentId,
      name: this.state.currentName,
      image: this.state.currentImage,
      description: this.state.currentDescription
    };

    const restos = this.state.restos.slice();
    restos.push(nouveauResto);
    this.setState({restos});
  }

  handleChangeId = (event) => {
    const value = event.currentTarget.value;
    this.setState({currentId:value});

  }

  handleChangeName = (event) => {
    const value = event.currentTarget.value;
    this.setState({currentName:value});

  }

  handleChangeDescription = (event) => {
    const value = event.currentTarget.value;
    this.setState({currentDescription:value});

  }

  handleSelect = (resto) => {
    console.log('handleselect');
    this.setState({currentId: resto.id});
    this.setState({currentName: resto.name});
    this.setState({currentImage: resto.image});
    this.setState({currentDescription: resto.description});
  }

  handleDelete = (id) => {
    // Effectue une copie du tableau
    const restos = this.state.restos.slice();

    // Renvoie l'index dans le tableau de l'élément correspond à l'id transmis en paramètre
    const index = restos.findIndex(resto => resto.id === id);

    // Supprime l'élément du tableau
    restos.splice(index,1);

    this.setState({restos: restos});
  }


  render() {
    console.log(this.state.restos);
    
    return (
      <div>
        <h1>Liste des restos</h1>
        <table>
          <tr>
            <th>id</th><th>name</th><th>image</th><th>description</th>
          </tr>
          {this.state.restos.map((resto) => (
            <tr onClick={() => this.handleSelect(resto)}>
                <td>{resto.id}</td> 
                <td>{resto.name}</td> 
                <td>{resto.image}</td> 
                <td>{resto.description}</td> 
                <td><button onClick={() => this.handleDelete(resto.id)}>X</button></td>
            </tr>
          ))}
        </table>

        <form onSubmit={this.handleSubmit}>
            <input type='text' placeholder='id' value={this.state.currentId} onChange={this.handleChangeId}/><br/>
            <input type='text' placeholder='name' value={this.state.currentName} onChange={this.handleChangeName}/><br/>
            <input type='text' placeholder='image'/><br/>
            <input type='text' placeholder='description' value={this.state.currentDescription} onChange={this.handleChangeDescription}/><br/>
            <button>Ajouter</button>
        </form>
      </div>
    );
  }
}

export default App;
