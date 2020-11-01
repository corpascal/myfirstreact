// Le 1er import React correspond à l'export par défaut du module ==> On peut le renommer comme on veut
// Le 2ème import correspond au nom exact de l'élément exporté (c'est ce qui signifie {}) ==> on ne peut le renommer
// car il ne s'agit pas de l'export par défaut du module
import React from 'react';

//function Resto(props) {
// On peut directemebnt faire une déstructuration du paramètre props => {restoObj, onSelect}
function Resto({restoObj, onSelect}) {

    // dans une fonction, il n'y a pas de propriété comme dans une classe
    // Il faut donc ajouter le mot-clé "const" ou "let" pour définir la fonction handleselect comme une varibale de la fonction Resto
    const handleSelect = (resto, event) => {
        onSelect(resto, event);
    }

    return (
        <tr onClick={(event) => handleSelect(restoObj, event)}>
            <td>{restoObj.id}</td>
            <td>{restoObj.name}</td>
            <td>{restoObj.image}</td>
            <td>{restoObj.description}</td>
        </tr>
    )
}


export default Resto;
