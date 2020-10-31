import React, { Component } from 'react';

class RestoForm extends Component {

    constructor(props) {
        super(props);
        this.state = { id: '', name: '', image: '', description: '', propId: '' };
    }

    static getDerivedStateFromProps(props, state) {
        console.log('getDerivedStateFromProps');
        // getDerivedStateFromProps est appelé:
        // - lorsque le composant parent change les props de composant enfant
        // ==> c'est ce qui permet de mettre à jour les champs du formulaire lorsque l'on chan la sélection dans la liste
        // - mais également lorsuqe le state change
        // ==> ce qui provoque l'écrasement du state avec les props
        // On ajoute une propriété supplémentaire propId dans le state pour garder la trace de l'id transmis par le parent
        // Si props.currentResto.id <> state.propId ==> on a cliqué sur un autre élément dans la liste 
        // ==> sinon getDerivedStateFromProps a été appelé à cauqse d'un changement de state provoqué par un appel à handleChangeXX (= saisie dans un champ)
        if (props.currentResto.id !== state.propId)
            return {    id: props.currentResto.id, 
                        name: props.currentResto.name, 
                        image: props.currentResto.image, 
                        description: props.currentResto.description,
                        propId: props.currentResto.id};
        else
            return null;
    }

    handleChangeId = (event) => {
        this.setState({ id: event.currentTarget.value, inputChange:true });
    }

    handleChangeName = (event) => {
        this.setState({ name: event.currentTarget.value });
    }

    handleChangeDescription = (event) => {
        this.setState({ description: event.currentTarget.value });
    }

    handleAdd = (event) => {
        // évite que la page ne se recharge complètement
        event.preventDefault();

        if (this.state.id === '') {
            alert('id obligatoire!');
            return;
        }
        if (this.state.name === '') {
            alert('name obligatoire!');
            return;
        }

        const nouveauResto = {
            id: this.state.id,
            name: this.state.name,
            image: this.state.image,
            description: this.state.description
        };
        this.props.onAdd(nouveauResto);
    }

    render() {
        return (
            <form>
                <input type='text' placeholder='id' value={this.state.id} onChange={this.handleChangeId} /><br />
                <input type='text' placeholder='name' value={this.state.name} onChange={this.handleChangeName} /><br />
                <input type='text' placeholder='image' /><br />
                <input type='text' placeholder='description' value={this.state.description} onChange={this.handleChangeDescription} /><br />

                <button onClick={this.handleAdd}>Ajouter</button>
                <button onClick={this.handleUpdate}>Modifier</button>
                <button onClick={this.handleDelete}>Supprimer</button>
            </form>
        )
    }
}

export default RestoForm;