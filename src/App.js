import React, { Component } from 'react';
import axios from 'axios';
import ListeRestos from './ListeRestos';
import RestoForm from './RestoForm';

class App extends Component {

  constructor() {
    super();

    console.log('App.constructor - entrée2');
    //this.state = { restos: [], currentId: '', currentName: '', currentImage: '', currentDescription: '' };
    this.state = { restos: [], currentResto: {id:'', name:'', image:'', description:''} };

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
          this.setState({ restos: reponse.data });
      });
  }

  handleSubmit = (event) => {
    event.preventDefault();
    console.log('handleSubmit');
    // const nouveauResto = {
    //   id: this.state.currentId,
    //   name: this.state.currentName,
    //   image: this.state.currentImage,
    //   description: this.state.currentDescription
    // };

    // const restos = this.state.restos.slice();
    // restos.push(nouveauResto);
    // this.setState({restos});
  }

  handleAdd = (resto) => {
    //const restos = this.state.restos.slice();
    // le spread operator ... permet d'itérer sur tous les éléments du tableau et d'en faire un copie
    const restos = [...this.state.restos];

    restos.push(resto);

    //this.setState({restos:restos});
    // équivaut à l'instruction ci-dessus {restos} <=> {restos:restos}
    this.setState({ restos });
  }

  handleSelect = (resto) => {
    this.setState({currentResto: resto});

    // this.setState({ currentId: resto.id });
    // this.setState({ currentName: resto.name });
    // this.setState({ currentImage: resto.image });
    // this.setState({ currentDescription: resto.description });
  }

  handleDelete = (event) => {
    // évite que la page ne se recharge complètement
    event.preventDefault();

    if (this.state.currentId === '') {
      alert('Aucun resto sélectionné!');
      return;
    }

    this.prevTargetSelected.style.backgroundColor = 'white';
    this.prevTargetSelected = undefined;

    // Effectue une copie du tableau
    //const restos = this.state.restos.slice();
    const restos = [...this.state.restos];

    // Renvoie l'index dans le tableau de l'élément correspond à l'id transmis en paramètre
    const index = restos.findIndex(resto => resto.id === this.state.currentId);

    // Supprime l'élément du tableau
    restos.splice(index, 1);

    //this.setState({restos: restos});
    this.setState({ restos });

    this.setState({ currentId: '' });
    this.setState({ currentName: '' });
    this.setState({ currentImage: '' });
    this.setState({ currentDescription: '' });
  }

  handleUpdate = (event) => {
    // évite que la page ne se recharge complètement
    event.preventDefault();

    if (this.state.currentId === '') {
      alert('Aucun resto sélectionné!');
    }

    // Effectue une copie du tableau
    //const restos = this.state.restos.slice();
    const restos = [...this.state.restos];

    // Renvoie l'index dans le tableau de l'élément correspond à l'id transmis en paramètre
    const index = restos.findIndex(resto => resto.id === this.state.currentId);

    // Maj élément du tableau
    restos[index] = { id: this.state.currentId, name: this.state.currentName, image: this.state.currentImage, description: this.state.currentDescription };

    //this.setState({restos: restos});
    this.setState({ restos });
  }


  handleSave = (event) => {
    console.log('handleSave');
  }

  render() {
    console.log(this.state.restos);

    return (
      <div>
        <ListeRestos restosObj={this.state.restos} onSelect={this.handleSelect} />

        <RestoForm currentResto={this.state.currentResto} onAdd={this.handleAdd}/>

        <button onClick={this.handleSave}>Enregistrer</button>
      </div>
    );
  }
}

export default App;
