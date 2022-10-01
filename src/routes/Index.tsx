import { useAuth } from "../contexts/AuthContext";
import SplashScreen from "../screens/SplashScreen";
import { AppRoutes } from "./AppRoutes";
import { GuestRoutes } from "./GuestRoutes";

export function Routes(){
    const { isLoading, userToken } = useAuth();

    return(
        <>
        {
            isLoading ?
            <SplashScreen/> :
            userToken ?
            <AppRoutes/> :
            <GuestRoutes />
        }
        </>
    )
}
