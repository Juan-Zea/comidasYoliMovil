import React, {useContext, useEffect, Fragment} from 'react';
import {
    View,
    StyleSheet,
    TextInput,
    ImageBackground
  } from "react-native";



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
 import OrdenContext from "../context/orden/OrdenContext"
import FirebaseContext from '../context/firebase/firebaseContext';


 const VistaOrden = () =>{

   const {orden, obtenerOrden } = useContext(FirebaseContext)
   const{seleccionarOrden} = useContext(OrdenContext);
    
    const navigation = useNavigation();

    useEffect(() => {
        obtenerOrden();
    },[]);
    console.log(orden);
    return(
        <Container styles={globalStyles.contenedor}>
             <Content style={{backgroundColor: '#FFF'}}>

             <Button
                     style={globalStyles.boton}
                     rounded
                     block
                     onPress={() =>  navigation.navigate('AgregarReservas')}
                                   
              >
                    <Text style={globalStyles.botonTexto}>xxxx..</Text>
              </Button>
                 <List>
                        
                     {
                     orden.map((ord) => {
                        
                         const{total,orden,id}= ord;
                        
                         return(
                             
                           
                                 
                             <Fragment key={id}>
                                   
                                 <ListItem
                                     onPress={ () => {
                                        try {
                                             
                                            const { ...orden2 } = ord;
                                            seleccionarOrden(orden2);
                                            navigation.navigate("DetalleOrden");
                                          } catch (error) {
                                            console.log(error);
                                         }
                                        }}
                                 >
                                        <Thumbnail large square></Thumbnail>
                                        <Body>
                                        {orden&&orden.map(platillo =>{
                                            const{nombre,cantidad,precio,id}= platillo;
                                            
                                            return(
                                                <View key={id}>
                                                
                                                <Text>Nombre: {nombre}</Text>
                                                <Text>Cantidad: {cantidad}</Text>
                                                <Text>Precio: {precio}</Text>
                                                </View>
                                            )
                                        })}
                                           
                                            <Text>Total: {total}</Text> 
                                            
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



  export default VistaOrden ;
