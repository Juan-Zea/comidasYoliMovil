import React, { useReducer } from 'react';

import firebase from '../../firebase';

import OrdenContext from './OrdenContext';
import OrdenReducer from './OrdenReducer';

import { SELECCIONAR_ORDEN } from '../../types';

import _ from 'lodash';

const OrdenState = props => {

    const initialState = {
        orden: [],
        orden2: null,
    }

    const [state, dispatch] = useReducer(OrdenReducer,initialState);

    

    const seleccionarOrden = orden2 => {
        dispatch({
            type: SELECCIONAR_ORDEN,
            payload: orden2
        })
    }

    return(
        <OrdenContext.Provider
        value={{
            orden : state.orden,
            firebase,
            seleccionarOrden
        }}

        >
           {props.children} 
        </OrdenContext.Provider>
    )
}

export default OrdenState;