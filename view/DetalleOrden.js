import { set } from "lodash";
import React, { useEffect, useState,useContext } from "react";
import {
    ScrollView,
    View,
    Alert,
    ActivityIndicator,
    StyleSheet,
    Picker
    
  } from "react-native"
import {Button, Text, H1,Container,Center } from 'native-base';
import { TextInput } from "react-native-gesture-handler";
import globalStyles from '../styles/global';
import firebase from '../firebase';
import OrdenContext from "../context/orden/OrdenContext";
import { useAnimatedReaction } from "react-native-reanimated";

const DetalleOrden = (props) => {
    const initialState = {
        id :'',
        total : '',
        orden:'',
        //platillo
        nombre: '',
        Cantida: '',
        precio: '',

    };

    const [order,setOrder] = useState(initialState);
    const {orden} = useContext(OrdenContext);
    const [loading, setloading] = useState(true);

    const handleChangeText = (value, prop) => {
        setOrder({...order, [prop]: value});
    };

   

    const deleteOrden = async () => {
        setloading(true)
        const dbid = firebase.db.collection("ordenes").doc(props.route.params.ordenesId);
        await dbid.delete();
        setloading(false)
        props.navigation.navigate("VistaOrden")
    };

    const ConfirmationAlert = () => {
        Alert.alert(
            "remover la orden",
            "esta seguro ? ",
            [
                {text: "Si", onPress: () => deleteOrden()},
                {text: "No", onPress: () => console.log("cancelado")},
            ],
            {
                cancelable: true,
            }
        );
    };

    const updateOrden = async () => {
        const ordenRef = firebase.db.collection("ordenes").doc(order.id);
        await ordenRef.set({
            orden: order.orden,
            total: order.total,
            creado: order.creado,
        });
        setOrder(initialState);
        props.navigation.navigate("VistaOrden");

    };


    if (orden === null){
        return(
            <View>
                <ActivityIndicator size="large" color = "#9E9E9E"/>
            </View>
        );
    }

    const{total,id}= orden;
    console.log('orden')
    return (
        <ScrollView  style={styles.container}>
            <Container styles={globalStyles.reserva}>
                <View>
                <View>
                    
                        {
                        orden.orden.map(platillo =>{
                            const{nombre,cantidad,precio}= platillo;
                            
                            return(
                                <View>
                                <Text>Nombre: {nombre}</Text>
                                <Text>Cantidad: {cantidad}</Text>
                                <Text>Precio: {precio}</Text>
                                </View>
                            )
                        })}
                           
                            <Text>Total: {total}</Text> 
                            
                  
                   
                </View>
                </View>

                <View>

                    <Picker    
                        style={{ height: 45, width: 280 }}
                    >
                        <Picker.Item label="Efectivo" value = "Efectivo"/>
                        <Picker.Item label="Tarjeta credito/debito" value = "TarCD"/>
                    </Picker>
                </View>

            <View>
                 
            </View>

          

            <View>
            <Button
                style={globalStyles.boton}
                rounded
                block
                onPress={() => updateOrden()}
                
            >
                <Text style={globalStyles.botonTexto}>Procesar Orden</Text>
            </Button>
            </View>
            </Container>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    
    container: {
        flex: 1,
        padding: 35,
        position: "relative",
      },

    cant: {
      flex: 1,
      marginTop: 8,
      backgroundColor: "aliceblue",
    },  
    loader: {
      left: 0,
      right: 0,
      top: 0,
      bottom: 0,
      position: "absolute",
      alignItems: "center",
      justifyContent: "center",
    },
    inputGroup: {
      flex: 1,
      padding: 10,
      marginBottom: 15,
      borderBottomWidth: 1,
      borderBottomColor: "#cccccc",
      
    },
    btn: {
      marginBottom: 7,
    },
  });

  export default DetalleOrden;
