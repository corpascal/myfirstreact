// Le 1er import React correspond à l'export par défaut du module ==> On peut le renommer comme on veut
// Le 2ème import correspond au nom exact de l'élément exporté (c'est ce qui signifie {}) ==> on ne peut le renommer
// car il ne s'agit pas de l'export par défaut du module
import React, { Component } from 'react';

class Resto extends Component {

    constructor() {
        super();
    }

    handleSelect = (resto, event) => {
        this.props.onSelect(resto, event);
    }

    render() {
        //const restoObj = this.props.restoObj;
        // Idem que ligne ci-dessus mais avec la déstructuration (extraction de la propriété restoObj de this.props)
        const {restoObj} = this.props;

        return (
            <tr onClick={(event) => this.handleSelect(restoObj, event)}>
                <td>{restoObj.id}</td>
                <td>{restoObj.name}</td>
                <td>{restoObj.image}</td>
                <td>{restoObj.description}</td>
            </tr>
        )
    }
}

export default Resto;
