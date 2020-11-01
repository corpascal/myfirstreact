import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ListeRestos from './ListeRestos';
import RestoForm from './RestoForm';
import FListeRestos from './FListeRestos';
import FRestoForm from './FRestoForm';
import GlobalContext from './GlobalContext';

function FApp() {

  console.log('FApp - entrée');
  const [dataReturned, setDataReturned] = useState(false);

  const [restos, setRestos] = useState([]);
  const [currentResto, setCurrentResto] = useState({ id: '', name: '', image: '', description: '' });

  const hostname = process.env.NODE_ENV != 'production' ? 'localhost' : '35.180.173.251';

  useEffect(() => {

    // fetch('http://localhost:8888/api/v1/restos', {mode: 'cors'})
    // .then((res) => res.json())
    // .then((data) => {
    //   console.log(data);
    // });

    if (dataReturned === false) {
      setDataReturned(true);
      console.log(`useEffect - hostname=${hostname}`);

      axios.get(`http://${hostname}:8888/api/v1/restos`)
        .then((res) => {
          console.log(res.data);
          let reponse = res.data;
          if (reponse.code === 0)
            setRestos(reponse.data);
        });
    }
  });

  const handleAdd = (restoToAdd) => {
    const copyOfRestos = [...restos];
    copyOfRestos.push(restoToAdd);
    setRestos(copyOfRestos);
  }

  const handleSelect = (resto) => {
    setCurrentResto(resto);
  }

  const handleDelete = (restoToDelete) => {
    const copyOfRestos = [...restos];
    const index = copyOfRestos.findIndex(resto => resto.id === restoToDelete.id);
    copyOfRestos.splice(index, 1);
    setRestos(copyOfRestos);
    setCurrentResto({ id: '', name: '', image: '', description: '' });
  }

  const handleUpdate = (restoToUpdate) => {
    const copyOfRestos = [...restos];
    const index = copyOfRestos.findIndex(resto => resto.id === restoToUpdate.id);
    copyOfRestos[index] = restoToUpdate;
    setRestos(copyOfRestos);
  }


  const handleSave = (event) => {
    console.log('handleSave');
  }

  const globalContext = {userConnected: 'corpascal'};

  // TRES IMPORTANT: la propriété key du composant <FListeRestos> force React à réinitialiser le(s) hook(s) useState du composant à chaque fois que restos.length change
  // ==> supprime la sélection dans la liste lorsqu'on ajoute ou supprime un élément
  // TRES IMPORTANT: la propriété key du composant <FRestoForm> force React à réinitialiser le(s) hook(s) useState du composant à chaque fois que currentResto.id change
  return (
    <GlobalContext.Provider value={globalContext}>
      <div>
        <FListeRestos restosObj={restos} onSelect={handleSelect} key={restos.length} />

        <FRestoForm currentResto={currentResto} onAdd={handleAdd} onUpdate={handleUpdate} onDelete={handleDelete} key={currentResto.id} />

        <button onClick={handleSave}>Enregistrer</button>
      </div>
    </GlobalContext.Provider>
  )

}

export default FApp;
