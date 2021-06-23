import React, { Fragment,useState } from 'react';
import styled from '@emotion/styled';


const Label = styled.label`
    font-family: 'Bebas Neue', cursive;
    color: #FFF;
    text-transform: uppercase;
    font-weight: bold;
    font-size: 2.4rem;
    margin-top: 2rem;
    display: block;
`;

const Select = styled.select`
    width: 100%;
    display:block;
    padding: 1rem;
    -webkit-appearance: none;
    border-radius: 10px;
    border: none;
    font-size: 1.2rem;
`;

const useCoins = (label,stateInitial,COINS) => {


    //State custom hook
    const [state, setState] = useState(stateInitial);


    //Funcion que se muestra en el navegador
    const Choose =()=>(
        <Fragment>
            <Label>{label}</Label>
            <Select
            onChange={e=>setState(e.target.value)}
            value={state}>
                <option value="">- Seleccione -</option>
                {COINS.map(opcion=>(
                      <option key={opcion.code}
                       value={opcion.code}>{opcion.name}</option>
                ))}
            </Select>
        </Fragment>
    );
    //Retornar state,interfaz y setState
    return [state,Choose,setState]
}
export default useCoins;