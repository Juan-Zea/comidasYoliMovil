import React, {useContext, useEffect, Fragment} from 'react';
import {
    View,
    StyleSheet,
    TextInput,
    ImageBackground
  } from "react-native";

 import firebase from '../firebase';

 import {
    Button,
    Container,
    Separator,
    Content,
    List,
    ListItem,
    Thumbnail,
    Text,
    Body
}from 'native-base';
 import globalStyles from '../styles/global';
 import { useNavigation } from '@react-navigation/native';
 import ReservaContext from '../context/reserva/reservaContext';


 const VistaReserva = () =>{

    const {reserva, obtenerReserva } = useContext(ReservaContext)

    const navigation = useNavigation();

    useEffect(() => {
        obtenerReserva();
    },[]);

    return(
        <Container styles={globalStyles.contenedor}>
             <Content style={{backgroundColor: '#FFF'}}>

             <Button
                     style={globalStyles.boton}
                     rounded
                     block
                     onPress={() =>  navigation.navigate('AgregarReservas')}
                                   
              >
                    <Text style={globalStyles.botonTexto}>Agregar una nueva Reserva</Text>
              </Button>
                 <List>
                     {reserva&&reserva.map(reserva => {
                         const{Nombre,Numero,Email,Num_person,id}= reserva;
                         return(
                             
                           
                                 
                             <Fragment key={id}>
                                   
                                 <ListItem
                                     onPress={ () => {
                                         //navigation.navigate("DetalleReservas",);
                                         navigation.navigate("DetalleReservas",{reserId: reserva.id});
                                        }}
                                 >
                                        <Thumbnail large square></Thumbnail>
                                        <Body>
                                            <Text>{Nombre}</Text>
                                            <Text>{Numero}</Text> 
                                            <Text>{Email}</Text>
                                            <Text>{Num_person}</Text>
                                        </Body>

                                 </ListItem>

                             </Fragment>
                            
                         )
                     })}
                 </List>
             </Content>
        </Container>
    ); 
  
  }

  const styles = StyleSheet.create({
    Separator: {
        backgroundColor:'#000',
    },
    separadorTexto:{
        color:'#FFDA00',
        fontWeight: 'bold',
        textTransform: 'uppercase'
    }
})



  export default VistaReserva ;
