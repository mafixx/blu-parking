import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useState } from "react";
import { KeyboardAvoidingView, StyleSheet, TouchableOpacity, View } from "react-native";
import { Avatar, Text, TextInput } from "react-native-paper";
import { SquareButton } from "../components/SquareButton";
import { GuestStackParamList } from "../routes/GuestRoutes";

type Props = NativeStackScreenProps<GuestStackParamList, "LoginScreen">

export default function LoginScreen({navigation, route}: Props) {
    const [isPassInvisible, setIsPassVisible] = useState(false);

    return (
        <KeyboardAvoidingView style={styles.container}>
            <View style={styles.logoContainer}>
                <Avatar.Image size={256} source={require("../../assets/icon.png")} />
            </View>
            <View style={styles.inputContainer}>
                <TextInput
                    style={styles.rowSpacing}
                    label="E-mail"
                    mode="outlined"
                    keyboardType="email-address" //importante para direcionar o teclado ao campo que usuário digitar
                />
                <TextInput
                    style={styles.rowSpacing}
                    label="Senha"
                    mode="outlined"
                    secureTextEntry={isPassInvisible}
                    right={<TextInput.Icon
                        icon={isPassInvisible ? "eye" : "eye-off"}
                        onPress={() => setIsPassVisible(!isPassInvisible)} />}
                />
                <TouchableOpacity style={styles.registerLink} >
                    <Text>Não possui uma conta? Cadastre-se!</Text>
                </TouchableOpacity>
                <SquareButton style={styles.rowSpacing} mode="contained" icon="login">
                    Entrar
                </SquareButton>
                <SquareButton style={styles.rowSpacing} mode="contained" icon="google" buttonColor="red">
                    Entrar com o Google
                </SquareButton>
                {/* <Button mode="contained" icon="facebook" buttonColor="blue">
                Entrar com o Facebook
            </Button> */}

            </View>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    logoContainer: {
        alignItems: "center",
        marginTop: 30,
    },
    inputContainer: {
        flex: 1,
        justifyContent: "center",
        paddingHorizontal: 15,
        margin: 10,
    },
    rowSpacing: {
        margin: 5,
    },
    registerLink: {
        margin: 10,
        alignItems: "center",
    },
    squareButton: {
        borderRadius: 4,
    },
});