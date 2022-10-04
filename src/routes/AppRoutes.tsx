import { createDrawerNavigator } from "@react-navigation/drawer";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { IconButton } from "react-native-paper";
import { Menu } from "../components/Menu";
import AddEditVehicleScreen from "../screens/AddEditVehicleScreen";
import HomeScreen from "../screens/HomeScreen";
import { commonStyles } from "../theme/commonStyles";
import { VehicleInterface } from "../types/Vehicle";

export type AppStackParamList = {
    HomeScreen: undefined;
    AddEditVehicleScreen: {
        vehicle: VehicleInterface | undefined;
    }
}

const Drawer = createDrawerNavigator();
const Stack = createNativeStackNavigator<AppStackParamList>();

function HomeScreenWithDrawerMenu(){
    return(
        <Drawer.Navigator
            drawerContent={(props)=> <Menu/>}
        >
            <Drawer.Screen name="HomeScreenDrawer" options={{headerShown: false}}> 
                {(props)=> <HomeScreen/>}
                </Drawer.Screen>
        </Drawer.Navigator>
    );
}

export function AppRoutes(){
    return(
        <Stack.Navigator 
            initialRouteName="AddEditVehicleScreen"
            screenOptions={{
                headerTintColor: commonStyles.colors.darkBlue,
                headerTitleStyle: {
                    fontWeight: "bold",
                    fontSize: 25,
                },
                headerTitleAlign: "center",
                headerLeft: props=>(
                    <IconButton {...props} 
                        icon={"chevron-left"} 
                        size={45} 
                        iconColor={commonStyles.colors.darkBlue}
                    />
                )
            }}
        >
            <Stack.Screen name="HomeScreen" options={{headerShown: false}}>
                {(props) => <HomeScreenWithDrawerMenu/>}
            </Stack.Screen>
        
            <Stack.Screen name="AddEditVehicleScreen" options={(props) => ({
                title: !!props.route.params ? "Editar veículo" : "Cadastrar Veículo"
            })}>
                {(props) => <AddEditVehicleScreen {...props}/>}
            </Stack.Screen>
    </Stack.Navigator>
    )
}