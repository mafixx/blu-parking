import AsyncStorage from "@react-native-async-storage/async-storage";
import { createContext, ReactNode, useState, useContext, useEffect } from "react";
import { Alert } from "react-native";
import { AuthService } from "../services/AuthServices";
import * as firebase from "firebase/auth";
import { myApp } from "../../firebase";
import * as Google from "expo-google-app-auth";
import * as Facebook from "expo-facebook";
import { FacebookAuthProvider, signInWithCredential } from "firebase/auth";

const auth = firebase.getAuth(myApp);

type TypeAuthContext = {
    isLoading: boolean;
    userToken: string;
    logIn: (username: string, password: string) => void;
    logOut: VoidFunction;
    logInGoogle: VoidFunction;
    logInFacebook: VoidFunction;
};

const AuthContext = createContext<TypeAuthContext>(null!);

export function AuthProvider({ children }: { children: ReactNode }) {
    const [isLoading, setIsLoading] = useState(false);
    const [userToken, setUserToken] = useState("");


    //TODO: Implementar o login com o firebase
    async function logIn(username: string, password: string) {
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
    async function logInGoogle() {
        // const { type, accessToken, user } = await Google.logInAsync(config);

        // if (type === 'success') {
        //     // Then you can use the Google REST API
        //     let userInfoResponse = await fetch('https://www.googleapis.com/userinfo/v2/me', {
        //         headers: { Authorization: `Bearer ${accessToken}` },
        //     });
        // }
    }

    async function logInFacebook() {
        async function logIn() {
            try {
                await Facebook.initializeAsync({
                    appId: '<APP_ID>',
                });
                // @ts-ignore
                const { type, token } =
                    await Facebook.logInWithReadPermissionsAsync({
                        permissions: ['public_profile'],
                    });
                if (type === 'success') {
                    const facebookAuthProvider = new FacebookAuthProvider();
                    // @ts-ignore
                    signInWithCredential(facebookAuthProvider, firebase.getAuth());

                    setUserToken(token);
                } else {
                    Alert.alert("Falha", "Não foi possível autenticar com o Facebook.")
                }
            } catch ({ message }) {
                alert(`Facebook Login Error: ${message}`);
            }
        }
    }

    //Trycatch - serve para evitar os erros de travamento da aplicação
    async function logOut() {
        try {
            AsyncStorage.removeItem("@access_Token");
            setUserToken("");
        } catch (error) {
            console.error(error);
        }
    }

    async function getAccessToken() {
        try {
            const accessToken = await AsyncStorage.getItem("@access_Token") || "";
            setUserToken(accessToken);
        } catch (error) {
            console.log(error);
        } finally {
            setIsLoading(false);
        }
    }

    useEffect(() => {
        getAccessToken();
    }, []);

    return (
        <AuthContext.Provider value={{ isLoading, userToken, logIn, logInFacebook, logOut }}>
            {children}
        </AuthContext.Provider>
    )
};

export const useAuth = () => useContext(AuthContext);