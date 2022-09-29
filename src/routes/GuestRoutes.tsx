import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from "../screens/LoginScreen";
import SignUpScreen from "../screens/SignUpScreen";


export type GuestStackParamList = {
    LoginScreen: undefined;
    SignUpScreen: {
        email: string;
    }
}

const Stack = createNativeStackNavigator<GuestStackParamList>();


export function GuestRoutes(){
    return (
        <Stack.Navigator>
            <Stack.Screen name="LoginScreen" options={{ headerShown: false}}>
                {(props) => <LoginScreen {...props} />}
            </Stack.Screen>
            <Stack.Screen name="SignUpScreen" options={{ title: "Cadastro de Clientes"}}>
                {(props) => <SignUpScreen {...props} />}
            </Stack.Screen>
        </Stack.Navigator>
    )
}