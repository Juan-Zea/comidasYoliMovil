import { OBTENER_RESERVA } from "../../types";

export default (state,action) => {
    switch (action.type) {
        case OBTENER_RESERVA:
            return{
                ...state,
                reserva: action.payload
            }
        case SELECCIONAR_RESERVA:
            return{
                ...state,
                reserva: action.payload
            }
            
    
        default:
            return state;
    }

}