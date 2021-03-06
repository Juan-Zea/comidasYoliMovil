import React, {useContext, useEffect, Fragment} from 'react';
import { StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import {
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

import  FirebaseContext from '../context/firebase/firebaseContext';
import PedidoContext from '../context/pedidos/pedidosContext';

const Menu = () => {

    //
    const { menu, obtenerProductos¬†} = useContext(FirebaseContext);

    //context de pedido
    const { seleccionarPlatillo } = useContext(PedidoContext)

    //hook para redireccionar
    const navigation = useNavigation();

    useEffect(() => {
        obtenerProductos();
    }, []);

    const mostrarHeading = (categoria,i) =>{

        if(i>0){
            const categoriaAnterior = menu[i - 1].categoria;

        if(categoriaAnterior !== categoria){
            return(
                <Separator styles={styles.Separator}> 
                    <Text styles={styles.SeparatorTexto}>{categoria}</Text>
                </Separator> 
             )
        }else{
            return(
                <Separator styles={styles.Separator}>
                <Text styles={styles.SeparatorTexto}>{categoria}</Text>
                </Separator> 
            )
           

        }

        }
        
    }
    return(
        <Container styles={globalStyles.contenedor}>
            <Content style={{backgroundColor: '#FFF'}}>
                <List>
                   {menu.map((platillo,i) =>{
                       const{url,nombre,descripcion,categoria,precio,id} = platillo;

                       return(
                           <Fragment key={id}>
                               {mostrarHeading(categoria,i) }
                              <ListItem
                                   onPress={ () => {

                                    // Eliminar algunas propiedades del platillo
                                    const { existencia, ...platillo2 } = platillo;

                                    seleccionarPlatillo(platillo2);
                                    navigation.navigate("DetallePlatillo");
                                }}
                              >
                                  
                                    <Thumbnail large square source={{uri: url}}></Thumbnail>
                                   <Body>
                                      <Text>{nombre}</Text>
                                      <Text
                                        note
                                        numberOfLines={2}
                                      >{descripcion}</Text>
                                      <Text>Precio: $ {precio}</Text>
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

export default Menu;