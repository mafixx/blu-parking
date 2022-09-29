import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { KeyboardAvoidingView } from "react-native";
import { TextInput } from "react-native-paper";
import { SquareButton } from "../components/SquareButton";
import { GuestStackParamList } from "../routes/GuestRoutes";

type Props = NativeStackScreenProps<GuestStackParamList, "LoginScreen">

export default function SignUpScreen({navigation, route}: Props){
    return(
        <KeyboardAvoidingView>
            <TextInput label="Nome"/>
            <TextInput label="E-mail"/>
            <TextInput label="Confirmar e-mail"/>
            <TextInput label="Senha"/>
            <TextInput label="Confirmar senha"/>
            <SquareButton>Cadastrar-se</SquareButton>
        </KeyboardAvoidingView>
    );
}