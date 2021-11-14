import { Container, Button, Text, H1} from 'native-base';
import {
    View,
    StyleSheet,
    TextInput,
    ScrollView,
    ImageBackground
  } from "react-native";
import React, { useContext, useEffect, useState } from 'react';
import globalStyles from '../styles/global';
import firebase from '../firebase';

const image = {uri: "https://fondosmil.com/fondo/17554.jpg" };

//https://i.pinimg.com/736x/a3/d9/50/a3d950fa6a5fbd4562dd24830deb447e.jpg

const AgregarReservas = props => {
    

    
    const initialState ={
        CC:'',
        Nombre: '',
        Numero: '',
        Email: '',
        Num_person: ''
    }

    const [state, setState] = useState(initialState);

    const handleChangeText = (value, Nombre) => {
        setState({ ...state, [Nombre]: value });
      };
    
    const reservaR = async () => {
        if (state.Nombre === "") {
          alert("Por favor ingrese un Nombre..!");
        } else {
    
          try {
            await firebase.db.collection("reserva").add({
              CC: state.CC,
              Nombre: state.Nombre,
              Numero: state.Numero,
              Email: state.Email,
              Num_person: state.Num_person,
            });
    
            
          } catch (error) {
            console.log(error)
          }
          props.navigation.navigate("Reservas");
        }
      };

    return(

        <ImageBackground source={image} resizeMode="cover" style={styles.image}>
       <ScrollView style={styles.container}>
        
       <View style={styles.inputGroup}>
               <TextInput
                 placeholder="Cédula"
                 onChangeText={(value) => handleChangeText(value, "CC")}
                 value={state.CC}
               />
           </View>
    
            <View style={styles.inputGroup}>
                <TextInput
                  placeholder="Nombre"
                  onChangeText={(value) => handleChangeText(value, "Nombre")}
                  value={state.Nombre}
                />
            </View>

           <View style={styles.inputGroup}>
               <TextInput
                placeholder="phone"
                keyboardType='numeric'
                onChangeText={(value) => handleChangeText(value, "Numero")}
                value={state.Numero}
                />
            </View>

           <View style={styles.inputGroup}>
               <TextInput
                 placeholder="Email"
                  multiline={true}
                  numberOfLines={4}
                  onChangeText={(value) => handleChangeText(value, "Email")}
                  value={state.Email}
               />
           </View>

           <View style={styles.inputGroup}>
               <TextInput
                placeholder="Numero de personas"
                onChangeText={(value) => handleChangeText(value, "Num_person")}
                value={state.Num_person}
                />
            </View>

            <View >
            <Button
                style={globalStyles.boton}
                rounded
                block
                onPress={() => reservaR()}
                
            >
                <Text style={globalStyles.botonTexto}>Guardar Reserva</Text>
            </Button>

            </View>
            
       </ScrollView>
       </ImageBackground>
    );
}

//estilos

const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 35,
    },
    inputGroup: {
      flex: 1,
      padding: 10,
      marginBottom: 15,
      borderBottomWidth: 1,
      borderBottomColor: "#cccccc",
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
    image: {
        flex: 1,
        justifyContent: "center"
      },
  });

export default AgregarReservas;