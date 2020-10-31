import React, { Component } from 'react';
import Resto from './Resto';

class ListeRestos extends Component {
    constructor() {
        super();
        this.prevTargetSelected = undefined;
    }

    handleSelect = (resto, event) => {
        console.log('Resto.handleselect');

        if (this.prevTargetSelected !== undefined) {
            this.prevTargetSelected.style.backgroundColor = 'white';
        }
        this.prevTargetSelected = event.currentTarget;
        event.currentTarget.style.backgroundColor = 'yellow';

        this.props.onSelect(resto);
    }


    render() {
        return (
            <div>
                <h1>Liste des restos</h1>
                <table>
                    <tr>
                        <th>id</th><th>name</th><th>image</th><th>description</th>
                    </tr>
                    {this.props.restosObj.map((resto) => (
                        <Resto restoObj={resto} onSelect={this.handleSelect} />
                    ))}
                </table>
            </div>
        )
    }
}

export default ListeRestos;