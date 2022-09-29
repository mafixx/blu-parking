import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { KeyboardAvoidingView } from "react-native";
import { TextInput } from "react-native-paper";
import { SquareButton } from "../components/SquareButton";
import { GuestStackParamList } from "../routes/GuestRoutes";

type Props = NativeStackScreenProps<GuestStackParamList, "SignUpScreen">

export default function SignUpScreen({navigation, route}: Props){
    const {email} = route.params;

    return(
        <KeyboardAvoidingView>
            <TextInput label="Nome" mode="outlined"/>
            <TextInput label="E-mail" value={email} mode="outlined"/>
            <TextInput label="Confirmar e-mail" value={email} mode="outlined"/>
            <TextInput label="Senha" mode="outlined"/>
            <TextInput label="Confirmar senha" mode="outlined"/>
            <SquareButton>Cadastrar-se</SquareButton>
        </KeyboardAvoidingView>
    );
}