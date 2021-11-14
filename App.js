import "react-native-gesture-handler";
import React from "react";
import "react-native-gesture-handler";

import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import NuevaOrden from "./view/NuevaOrden";
import Menu from "./view/Menu";
import DetallePlatillo from "./view/DetallePLatillo";
import FormularioPlatillo from "./view/FormularioPlatillo";
import ResumenPedido from "./view/ResumenPedido";
import ProgresoPedido from "./view/ProgresoPedido";
import Reservas from "./view/Reserva";
import DetalleReservas from "./view/DetalleReserva";
import AgregarReservas from "./view/AgregarReservas";
import LoginScreen from "./view/Login";
import Orden from "./view/ListOrden";
import DetalleOrden from "./view/DetalleOrden";

//components
import BotonResumen from "./components/ui/BotonResumen";

//importar state de context
import FirebaseState from "./context/firebase/firebaseState";
import PedidosState from "./context/pedidos/pedidosState";
import ReservaState from "./context/reserva/reservaState";
import OrdenState from "./context/orden/OrdenState";

const Stack = createStackNavigator();

export default function App() {
  return (
    <>
      <FirebaseState>
        <PedidosState>
          <OrdenState>
          <ReservaState>
            <NavigationContainer>
              <Stack.Navigator
                screenOptions={{
                  headerStyle: {
                    //backgroundColor: '#FFDA00'
                    backgroundColor: "#FF6961",
                  },
                  headerTitleStyle: {
                    fontWeight: "bold",
                    textAlign: "center",
                    fontStyle: "italic",
                  },
                  headerTintColor: "#000",
                }}
              >
                <Stack.Screen
                  name="LoginScreen"
                  component={LoginScreen}
                  options={{
                    title: "Inicio de sesion",
                  }}
                />
                <Stack.Screen
                  name="NuevaOrden"
                  component={NuevaOrden}
                  options={{
                    title: " comidas rápidas Yoli",
                  }}
                />

                <Stack.Screen
                  name="Menu"
                  component={Menu}
                  options={{
                    title: "Nuestro Menú",
                    headerRight: (props) => <BotonResumen />,
                  }}
                />

                <Stack.Screen
                  name="DetallePlatillo"
                  component={DetallePlatillo}
                  options={{
                    title: "Detalle Platillo",
                  }}
                />

                <Stack.Screen
                  name="FormularioPlatillo"
                  component={FormularioPlatillo}
                  options={{
                    title: "Ordenar Platillo",
                  }}
                />

                <Stack.Screen
                  name="ResumenPedido"
                  component={ResumenPedido}
                  options={{
                    title: "Resumen Pedido",
                  }}
                />

                <Stack.Screen
                  name="ProgresoPedido"
                  component={ProgresoPedido}
                  options={{
                    title: "Progreso de Pedido",
                  }}
                />
                <Stack.Screen
                  name="Reservas"
                  component={Reservas}
                  options={{
                    title: "Reservas",
                  }}
                />
                <Stack.Screen
                  name="DetalleReservas"
                  component={DetalleReservas}
                  options={{
                    title: "Detalle Reservas",
                  }}
                />

                <Stack.Screen
                  name="AgregarReservas"
                  component={AgregarReservas}
                  options={{
                    title: "Agregar Reservas",
                  }}
                />

                <Stack.Screen
                  name="Orden"
                  component={Orden}
                  options={{
                    title: "Ordenes",
                  }}
                />

                <Stack.Screen
                  name="DetalleOrden"
                  component={DetalleOrden}
                  options={{
                    title: "Pago..",
                  }}
                />
              </Stack.Navigator>
            </NavigationContainer>
          </ReservaState>
          </OrdenState>
        </PedidosState>
      </FirebaseState>
    </>
  );
}
