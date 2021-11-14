import { OBTENER_PRODUCTOS_EXITO,OBTENER_ORDEN } from '../../types';

export default (state, action) => {
    switch (action.type) {
        case OBTENER_PRODUCTOS_EXITO:
            return {
                ...state,
                menu: action.payload
            }
        case OBTENER_ORDEN:
            return{
                ...state,
                orden: action.payload
            }

        default:
            return state;
    }
}