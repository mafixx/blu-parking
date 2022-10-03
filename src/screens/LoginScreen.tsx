import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { KeyboardAvoidingView, StyleSheet, TouchableOpacity, View } from "react-native";
import { Avatar, HelperText, Text, TextInput } from "react-native-paper";
import * as yup from "yup";
import { SquareButton } from "../components/SquareButton";
import { TextInputPassword } from "../components/TextInputPassword";
import { GuestStackParamList } from "../routes/GuestRoutes";
import { commonStyles } from "../theme/commonStyles";
import { Formik } from "formik";
import { useAuth } from "../contexts/AuthContext";

type Props = NativeStackScreenProps<GuestStackParamList, "LoginScreen">

const LoginValidationSchema = yup.object().shape({
    email: yup.string().
        email("O email precisa ser válido.").
        required("O e-mail é obrigatório!"),
    password: yup.string().
        required("Por favor, digite sua senha.").
        min(8, "A senha tem que conter 8 caracteres, uma letra maiúscula, uma minúscula, um número e um caracter especial")
});

export default function LoginScreen({ navigation, route }: Props) {
    const {logIn} = useAuth();

    return (
        <KeyboardAvoidingView style={styles.container}>
            <View style={styles.logoContainer}>
                <Avatar.Image size={256} source={require("../../assets/icon.png")} />
            </View>
            
            <Formik
                initialValues={{
                    email: "",
                    password: ""
                }}
                validationSchema={LoginValidationSchema}
                onSubmit={({ email, password}) => logIn(email,password)}
            >
            {({ handleChange, handleBlur, values, errors, isValid, handleSubmit }) => (
            <View style={styles.inputContainer}>
                <TextInput
                    value={values.email}
                    error={!!errors.email}
                    onChangeText={handleChange("email")}
                    style={commonStyles.rowSpacing}
                    label="E-mail"
                    mode="outlined"
                    keyboardType="email-address" //importante para direcionar o teclado ao campo que usuário digitar
                />
                <HelperText type="error" visible={!!errors.email}>{errors.email}</HelperText>

                <TextInputPassword
                    value={values.password}
                    error={!!errors.password}
                    onChangeText={handleChange("password")}
                    onBlur={handleBlur("password")}
                    style={commonStyles.rowSpacing}
                    label="Senha"
                    mode="outlined"
                />
                <HelperText type="error" visible={!!errors.password}>{errors.password}</HelperText>

                <TouchableOpacity style={styles.registerLink} onPress={() => navigation.navigate("SignUpScreen", { email:values.email })}>
                    <Text>Não possui uma conta? Cadastre-se!</Text>
                </TouchableOpacity>
                <SquareButton onPress={handleSubmit} disabled= {!isValid} style={commonStyles.rowSpacing} mode="contained" icon="login">
                    Entrar
                </SquareButton>
                <SquareButton onPress={handleSubmit} style={commonStyles.rowSpacing} mode="contained" icon="google" buttonColor="red">
                    Entrar com o Google
                </SquareButton>
                {/* <Button mode="contained" icon="facebook" buttonColor="blue">
                Entrar com o Facebook
            </Button> */}
                </View>
            )}
            </Formik>
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
    registerLink: {
        margin: 10,
        alignItems: "center",
    },
    squareButton: {
        borderRadius: 4,
    },
});