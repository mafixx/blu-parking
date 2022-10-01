import AsyncStorage from "@react-native-async-storage/async-storage";
import { createContext, ReactNode, useState, useContext, useEffect } from "react";
import { Alert } from "react-native";
import { AuthService } from "../services/AuthServices";

type TypeAuthContext ={
    isLoading: boolean;
    userToken: string;
    logIn: (username: string, password: string) => void;
    logOut: VoidFunction;
    logInGoogle: VoidFunction;
};

const AuthContext = createContext<TypeAuthContext>(null!);

export function AuthProvider({children}: { children: ReactNode}){
    const [isLoading, setIsLoading] = useState(false);
    const [userToken, setUserToken] = useState("");


    //TODO: Implementar o login com o firebase
    async function logIn(username: string, password:string){
        try {
            const accessToken = await AuthService.logIn(username, password);
            AsyncStorage.setItem("@access_Token", accessToken);
            setUserToken(accessToken);
        } catch (error) {
            console.error(error);
            Alert.alert("Falha", "Usuário ou senha inválidos!")
        }
    }

    //TODO: Implementar o login com o google
    async function logInGoogle(){

    }
    
    //Trycatch - serve para evitar os erros de travamento da aplicação
    async function logOut(){
        try {
            AsyncStorage.removeItem("@access_Token");
            setUserToken("");
        } catch (error) {
            console.error(error);
        }
    }

    async function getAccessToken(){
        try {
            const accessToken = await AsyncStorage.getItem("@access_Token") || "";
            setUserToken(accessToken);
        } catch (error) {
            console.log(error);
        } finally{
            setIsLoading(false);
        }
    }

    useEffect(()=> {
        getAccessToken();
    }, []);

    return(
        <AuthContext.Provider value={{isLoading, userToken, logIn, logInGoogle, logOut}}>
            {children}
        </AuthContext.Provider>
    )
};

export const useAuth = () => useContext(AuthContext);