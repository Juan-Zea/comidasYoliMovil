import React, {  useContext, useEffect,useState } from 'react';
import {  Alert,TextInput } from 'react-native';
import {
    Container,
    Content, 
    List,
    ListItem,
    Thumbnail, 
    Text,
    Left, 
    Body,
    Button,
    H1, 
    Footer, 
    FooterTab,
} from 'native-base';
import { useNavigation } from '@react-navigation/native'
import globalStyles from '../styles/global';
import firebase from '../firebase';

import PedidoContext from '../context/pedidos/pedidosContext';

const ResumenPedido = () => {

    const navigation = useNavigation();


    // context de pedido
    const { pedido, total, mostrarResumen, eliminarProducto, pedidoRealizado } = useContext(PedidoContext);
    const [mesa,setMesa] = useState('')
    console.log(pedido)
    useEffect(() => {
        calcularTotal();
    }, [pedido]);

    const calcularTotal = () => {
        let nuevoTotal = 0;
        nuevoTotal = pedido.reduce( (nuevoTotal, articulo) => nuevoTotal + articulo.total, 0);

        mostrarResumen(nuevoTotal)

    }

    // redirecciona a Progreso pedido
    const progresoPedido = () => {

        if(pedido.length !==0){
            Alert.alert(
                'Revisa tu pedido',
                'Una vez que realizas tu pedido, no podrás cambiarlo',
                [
                    {
                        text: 'Confirmar',
                        onPress: async () => {
                            const timeElapsed = Date.now();
                            const today = new Date(timeElapsed);
                            // crear un objeto
                            const pedidoObj = {
                                tiempoentrega: 0,
                                completado: false,
                                total: Number(total),
                                orden: pedido, // array
                                creado: today,
                                usuario : firebase.auth.currentUser?.email,
                                mesa:mesa
                            }
                            
    
                            console.log(pedidoObj);
    
                            try {
                                if(mesa===''){
                                    Alert.alert(
                                        'Revisa tu pedido',
                                        'No tienes mesa asignada',
                                        [
                                            {
                                                text: 'Confirmar',style: 'cancel'
                                            }
                                        ]
                                    )
                                }else{
                                    const pedido = await firebase.db.collection('ordenes').add(pedidoObj);
                                    pedidoRealizado(pedido.id);
        
                                    // redireccionar a progreso
                                    navigation.navigate("ProgresoPedido")
                                }
                            } catch (error) {
                                console.log(error);
                            }
                        }
                    }, 
                    { text: 'Revisar', style: 'cancel'}
                ]
            )
        }else{
            Alert.alert(
                'Revisa tu pedido',
                'No tienes ningun proudcto',
                [
                    {
                        text: 'Confirmar',style: 'cancel'
                    }
                ]
            )
        }
    }

    // Elimina un producto del arreglo de pedido
    const confirmarEliminacion = id => {
        Alert.alert(
            '¿Deseas eliminar este artículo?',
            'Una vez eliminado no se puede recuperar',
            [
                {
                    text: 'Confirmar',
                    onPress: () => {
                        // Eliminar del state
                        eliminarProducto(id);
                    }
                }, 
                { text: 'Cancelar', style: 'cancel'}
            ]
        )
    }

    return ( 
        <Container style={globalStyles.contenedor}>
            <Content style={globalStyles.contenido}>
                <H1 style={globalStyles.titulo}>Resumen Pediddo</H1>
                {pedido.map( (platillo, i) => {
                    const { cantidad, nombre, url, id, precio } = platillo;
                    return( 
                        <List key={id + i}>
                            <ListItem thumbnail>
                                <Left>
                                    <Thumbnail large square source={{ uri: url}} />
                                </Left>

                                <Body>
                                    <Text>{nombre} </Text>
                                    <Text>Cantidad: {cantidad} </Text>
                                    <Text>Precio: $ {precio} </Text>

                                    <Button
                                        onPress={ () => confirmarEliminacion(id) }
                                        full
                                        danger
                                        style={{marginTop: 20}}
                                    >
                                        <Text style={[globalStyles.botonTexto, { color: '#FFF'}]}>Eliminar</Text>
                                    </Button>
                                </Body>
                            </ListItem>
                        </List>
                    )
                })}

                <Text style={globalStyles.cantidad}>Total a Pagar: $ {total}</Text>

                <Button
                    onPress={ () => navigation.navigate('Menu') }
                    style={ {marginTop: 30}}
                    full
                    dark
                >
                    <Text style={[globalStyles.botonTexto, { color: '#FFF'}]}>Seguir Pidiendo</Text>
                </Button>
                <TextInput 
                placeholder = 'Numero de mesa del pedido'
                value = {mesa}
                keyboardType='numeric'
                onChangeText = {text =>setMesa(text)}
            />
            </Content>

            <Footer>
                <FooterTab>
                    <Button
                        onPress={ () => progresoPedido()  }
                        style={[globalStyles.boton ]}
                        full
                    >
                        <Text style={globalStyles.botonTexto}>Ordenar Pedido</Text>
                    </Button>
                </FooterTab>
            </Footer>

        </Container>
     );
}
 
export default ResumenPedido;