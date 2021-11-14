import React, {useState, useContext, useEffect} from 'react';
import { Alert } from 'react-native';
import {
    Container,
    Content,
    Form,
    Icon,
    Input,
    Grid,
    Col,
    Button,
    Text,
    Footer,
    FooterTab
} from 'native-base';
import { useNavigation } from '@react-navigation/native'
import globalStyles from '../styles/global';

import PedidoContext from '../context/pedidos/pedidosContext';





const FormularioPlatillo = () => {

    //state para cantidades
    const [cantidad, guardarCantidad] = useState(1);
    const [total, guardarTotal] = useState(0);

    const {platillo, guardarPedido} = useContext(PedidoContext);
    const {precio}=platillo;

    //redireccionar
    const navigation = useNavigation();

    //en cuanto el componente cargue calcular la cantidad a pagar
    useEffect(() => {
        calcularTotal();
    }, [cantidad]);

    //calcula el total del platilloo por su cantidad
    const calcularTotal = () => {
        const totalPagar = precio * cantidad;
        guardarTotal(totalPagar);
    }

    //almacena la cantidad via input
    // const calcularCantidad = cantidad =>{

    // }

    //decrementar en uno 
    const decrementarUno = () => {
        if(cantidad > 1){
            const nuevaCantidad = parseInt(cantidad) - 1 ;
            guardarCantidad(nuevaCantidad)
        }
    }
    //incrementa uno en la cantidad
    const incrementarUno = () => {
        const nuevaCantidad = parseInt(cantidad) + 1 ;
        guardarCantidad(nuevaCantidad)
    }

    // confirmar si la orden es correcta
    const confirmarOrden = () => {
        Alert.alert(
            '¿Deseas confirmar tu pedido?',
            '',
            [
                {
                    text: 'Confirmar',
                    onPress: () => {
                        //Almacenar el pedido al pedido principal
                        const pedido = {
                            ...platillo,
                            cantidad,
                            total
                        }
                        //console.log(pedido);
                        guardarPedido(pedido);
                        //navegar hacia el resumen
                        navigation.navigate("ResumenPedido");
                    },
                },
                {
                    text: 'Cancelar',
                    style: 'cancel'
                }
            ]
        )
    }

    return(
        <Container style={globalStyles.contenedor}>
            <Content style={globalStyles.contenido}>
                <Form>
                    <Text style={globalStyles.titulo}>Cantidad</Text>
                    <Grid style={{alignContent:'center',justifyContent:'center'}} >
                        <Col>
                            <Button
                                props
                                dark
                                style={{width:57, height:80,justifyContent:'center'}}
                                onPress={() => decrementarUno()}
                            >
                               <Text style={{fontSize:50}}>-</Text>
                            </Button>
                        </Col>

                        <Col>
                            <Input
                                style={{textAlign:'center', fontSize:20}}
                                value={cantidad.toString()}
                                keyboardType="numeric"
                                onChangeText ={cantidad=> guardarCantidad(cantidad)}
                            />
                        </Col>

                        <Col>
                            <Button
                                props
                                dark
                                style={{height:80,justifyContent:'center'}}
                                onPress={() => incrementarUno()}
                            >
                                <Text style={{fontSize:40}}>+</Text>
                            </Button>
                        </Col>
                    </Grid>

                    <Text style={globalStyles.cantidad}>Subtotal: $ {total}</Text>
                </Form>
            </Content>
            <Footer>
               <FooterTab>
                   <Button
                        style={globalStyles.boton}
                        onPress={ () => confirmarOrden()}
                        
                   >
                       <Text style={globalStyles.botonTexto}>Agregar al pedido</Text>
                   </Button>
               </FooterTab>
           </Footer>

        </Container>
    );
}

export default FormularioPlatillo;