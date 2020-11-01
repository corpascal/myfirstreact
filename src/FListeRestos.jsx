import React, {useState} from 'react';
import Resto from './Resto';

function FListeRestos(props) {

    console.log('FListeRestos - entrée');

    const [prevTargetSelected, setPrevTargetSelected] = useState(undefined);

    const handleSelect = (resto, event) => {
        if (prevTargetSelected !== undefined) {
            prevTargetSelected.style.backgroundColor = 'white';
        }
        setPrevTargetSelected(event.currentTarget);
        event.currentTarget.style.backgroundColor = 'yellow';

        props.onSelect(resto);
    }


    return (
        <div>
            <h1>Liste des restos</h1>
            <table>
                <tr>
                    <th>id</th><th>name</th><th>image</th><th>description</th>
                </tr>
                {props.restosObj.map((resto) => (
                    <Resto restoObj={resto} onSelect={handleSelect} />
                ))}
            </table>
        </div>
    )
}

export default FListeRestos;