import React, { useReducer } from 'react';

import firebase from '../../firebase';
import ReservaContext from './reservaContext';
import ReservaReducer from './reservaReducer';

import { OBTENER_RESERVA, SELECCIONAR_RESERVA } from '../../types';

import _ from 'lodash';

const ReservaState = props => {

    const initialState = {
        reserva: [],
        reserva2: null,
    }

    const [ state, dispatch ] = useReducer(ReservaReducer,initialState);

    const obtenerReserva = () => {
        firebase.db
            .collection('reserva')
            .onSnapshot(manejarSnapshot);

            function manejarSnapshot(snapshot) {
                let reservas = snapshot.docs.map(doc => {
                    return {
                        id: doc.id,
                        ...doc.data()
                    }
                });
        
                // Ordenar por categoria con lodash
               // reservas = _.sortBy(reservas, 'categoria');
        
                // console.log(platillos)
        
                // Tenemos resultados de la base de datos
                dispatch({
                    type: OBTENER_RESERVA,
                    payload: reservas
                });

            }
    
    }

    const seleccionarReserva = reserva2 => {
        dispatch({
            type: SELECCIONAR_RESERVA,
            payload: reserva2
        })
    }

    return(
        <ReservaContext.Provider
            value={{
                reserva: state.reserva,
                firebase,
                obtenerReserva,
                seleccionarReserva
            }}
        >
            {props.children}
        </ReservaContext.Provider>
    )

   
}

export default ReservaState;