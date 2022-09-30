import { createDrawerNavigator } from "@react-navigation/drawer";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Menu } from "../components/Menu";
import HomeScreen from "../screens/HomeScreen";

const Drawer = createDrawerNavigator();
const Stack = createNativeStackNavigator();

function HomeScreenWithDrawerMenu(){
    return(
        <Drawer.Navigator
            drawerContent={(props)=> <Menu/>}
        >
            <Drawer.Screen name="HomeScreen"> 
                {(props)=> <HomeScreen/>}
                </Drawer.Screen>
        </Drawer.Navigator>
    );
}

export function AppRoutes(){
    return(
        <Stack.Navigator>
            {/* <Stack.Screen/> */}
        </Stack.Navigator>
    )
}