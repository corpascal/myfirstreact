import React, { useState, useContext } from 'react';
import GlobalContext from './GlobalContext';

function FRestoForm(props) {

    console.log('FRestoForm - entrée');

    // L'initialisation avec l'instruction useState n'est effectuée qu'au PREMIER RENDU du composant
    // Pour que le useState fonctionne lorsque le composant parent chnage les props, il faut
    // que la balise dans le composant parent contienne la propriété "key"
    // ce qui force React à recharger le composant FRestoForm à chaque fois que les props transmises changent.
    const [id, setId] = useState(props.currentResto.id);
    const [name, setName] = useState(props.currentResto.name);
    const [image, setImage] = useState(props.currentResto.image);
    const [description, setDescription] = useState(props.currentResto.description);

    const globalContext = useContext(GlobalContext);

    console.log(`FRestoForm - globalContext.userConnected=${globalContext.userConnected}`);

    const handleChangeId = (event) => {
        setId(event.currentTarget.value);
    }

    const handleChangeName = (event) => {
        setName(event.currentTarget.value);
    }

    const handleChangeDescription = (event) => {
        setDescription(event.currentTarget.value);
    }

    const handleAdd = (event) => {
        // évite que la page ne se recharge complètement
        event.preventDefault();

        if (id === '') {
            alert('id obligatoire!');
            return;
        }
        if (name === '') {
            alert('name obligatoire!');
            return;
        }

        const idToInt = parseInt(id);
        const restoToAdd = { id:idToInt, name, image, description };
        props.onAdd(restoToAdd);
    }

    const handleUpdate = (event) => {
        // évite que la page ne se recharge complètement
        event.preventDefault();

        if (id === '') {
            alert('id obligatoire!');
            return;
        }
        if (name === '') {
            alert('name obligatoire!');
            return;
        }
        const idToInt = parseInt(id);
        const restoToUpdate = { id:idToInt, name, image, description };
        props.onUpdate(restoToUpdate);
    }

    const handleDelete = (event) => {
        // évite que la page ne se recharge complètement
        event.preventDefault();

        if (id === '') {
            alert('id obligatoire!');
            return;
        }
        if (name === '') {
            alert('name obligatoire!');
            return;
        }
        const idToInt = parseInt(id);
        const restoToDelete = { id:idToInt, name, image, description };
        props.onDelete(restoToDelete);
    }

    return (
        <form>
            <input type='text' placeholder='id' value={id} onChange={handleChangeId} /><br />
            <input type='text' placeholder='name' value={name} onChange={handleChangeName} /><br />
            <input type='text' placeholder='image' /><br />
            <input type='text' placeholder='description' value={description} onChange={handleChangeDescription} /><br />

            <button onClick={handleAdd}>Ajouter</button>
            <button onClick={handleUpdate}>Modifier</button>
            <button onClick={handleDelete}>Supprimer</button>
        </form>
    )
}

export default FRestoForm;