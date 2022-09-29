import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useState } from "react";
import { KeyboardAvoidingView, StyleSheet } from "react-native";
import { TextInput } from "react-native-paper";
import { SquareButton } from "../components/SquareButton";
import { GuestStackParamList } from "../routes/GuestRoutes";
import { commonStyles } from "../theme/commonStyles";
import * as ImagePicker from "expo-image-picker";

type Props = NativeStackScreenProps<GuestStackParamList, "SignUpScreen">

export default function SignUpScreen({navigation, route}: Props){
    const {email} = route.params;

    const [image, setImage] = useState<string>("");

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.cancelled) {
      setImage(result.uri);
    }
  };

    return(
        <KeyboardAvoidingView style={styles.container}>
            <TextInput label="Nome" mode="outlined" style={commonStyles.rowSpacing}/>
            <TextInput label="E-mail" value={email} mode="outlined" style={commonStyles.rowSpacing}/>
            <TextInput label="Confirmar e-mail" value={email} mode="outlined" style={commonStyles.rowSpacing}/>
            <TextInput label="Senha" mode="outlined" style={commonStyles.rowSpacing}/>
            <TextInput label="Confirmar senha" mode="outlined" style={commonStyles.rowSpacing}/>
            <SquareButton icon="account-plus" style={commonStyles.rowSpacing} mode="contained">Cadastrar-se</SquareButton>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        padding: 15
    }
})