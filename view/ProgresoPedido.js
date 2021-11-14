import React, { useContext, useEffect, useState } from 'react';
import { View, StyleSheet } from 'react-native'
import { Container, Text, H1, H3, Button } from 'native-base';
import globalStyles from '../styles/global';
import { useNavigation } from '@react-navigation/native';
import PedidoContext from '../context/pedidos/pedidosContext';
import firebase from '../firebase';



const ProgresoPedido = () => {

    const navigation = useNavigation();

    const { idPedido,nuevaOrden,pedido} = useContext(PedidoContext);
    
    console.log(idPedido)

    const nuevaPedido =()=>{
        nuevaOrden()
        pedido=[]
        navigation.navigate("NuevaOrden")
    }

    const [ completado, guardarCompletado] = useState(false);

    useEffect(() => {
        const obtenerProducto = () => {
            firebase.db.collection('ordenes')
                        .doc(idPedido)
                        .onSnapshot(function(doc) {
                            guardarCompletado(doc.data().completado)
                        })
        }
        obtenerProducto()
    }, []);

    // Muestra el countdown en la pantalla
    const renderer = ({minutes, seconds}) => {
        return (
            <Text style={styles.tiempo}>{minutes}:{seconds} </Text>
        )
    }

    return ( 
         <Container style={globalStyles.contenedor}>
             <View style={[ globalStyles.contenido, { marginTop: 50} ]}>
                
                        <Text style={{ textAlign: 'center'}}>Hemos recibido tu orden...</Text>
                        <Button style={[ globalStyles.boton, { marginTop: 100}]}
                            rounded
                            block
                            onPress={ nuevaPedido}
                        >
                            <Text style={globalStyles.botonTexto}>Comenzar Una Orden Nueva</Text>
                        </Button>
             </View>
         </Container>
     );
}

const styles = StyleSheet.create({
    tiempo: {
        marginBottom: 20,
        fontSize: 60,
        textAlign: 'center',
        marginTop: 80,
    },
    textoCompletado: {
        textAlign: 'center',
        textTransform: 'uppercase',
        marginBottom: 20
    }
})
 
export default ProgresoPedido;