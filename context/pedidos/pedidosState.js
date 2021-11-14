import React, { useReducer } from 'react';

import firebase from '../../firebase';
import PedidoReducer from './pedidosReducer';
import PedidoContext from './pedidosContext';

import {
    SELECCIONAR_PRODUCTO,
    CONFIRMAR_ORDENAR_PLATILLO,
    MOSTRAR_RESUMEN,
    ELIMINAR_PRODUCTO,
    PEDIDO_ORDENADO
} from '../../types'

const PedidosState = props =>{

    //console.log(firebase);

    //crear state inicial
    const initialState ={
        pedido: [],
        platillo: null,
        total: 0,
        idPedido: '',
    }

    //useReducer con dispatch para ejecutar las funciones
    const [state, dispatch] = useReducer(PedidoReducer, initialState);

    //selecccionar el producto que el usuario desea ordernar
    const seleccionarPlatillo = platillo => {
        dispatch({
            type: SELECCIONAR_PRODUCTO,
            payload: platillo
        })
    }

    //Cuando el usuario confirma el platillo
    const guardarPedido = pedido => {
        dispatch({
            type: CONFIRMAR_ORDENAR_PLATILLO,
            payload: pedido
        })
    }

    //muestra el total a pagar en el resumen
    const mostrarResumen = total => {
        dispatch({
            type: MOSTRAR_RESUMEN,
            payload: total
        })
    }

    //Eliminar un articulo del carrito
    const eliminarProducto  = id => {
        dispatch({
            type: ELIMINAR_PRODUCTO,
            payload: id
        })
    }

    const pedidoRealizado  = id => {
        dispatch({
            type: PEDIDO_ORDENADO,
            payload: id
        })
    }

    const nuevaOrden = ()=>{
        state.pedido= [],
        state.platillo= null,
        state.total= 0,
        state.idPedido=''
    }

    return(
        <PedidoContext.Provider
            value={{
                pedido: state.pedido,
                platillo: state.platillo,
                total: state.total,
                idPedido: state.idPedido,
                seleccionarPlatillo,
                guardarPedido,
                mostrarResumen,
                eliminarProducto,
                pedidoRealizado,
                nuevaOrden
                
            }}
        >
            {props.children}
        </PedidoContext.Provider>
    )
}

export default PedidosState;