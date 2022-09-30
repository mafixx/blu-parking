import { NativeStackScreenProps } from "@react-navigation/native-stack";
import * as ImagePicker from "expo-image-picker";
import { Formik } from "formik";
import { useState } from "react";
import { KeyboardAvoidingView, ScrollView, StyleSheet } from "react-native";
import { Button, HelperText, TextInput } from "react-native-paper";
import * as yup from "yup";
import { SquareButton } from "../components/SquareButton";
import { TextInputPassword } from "../components/TextInputPassword";
import { GuestStackParamList } from "../routes/GuestRoutes";
import { commonStyles } from "../theme/commonStyles";

type Props = NativeStackScreenProps<GuestStackParamList, "SignUpScreen">


const signUpValidationSchema = yup.object().shape({
  name: yup.string().
    required("Nome é obrigatório!").
    min(4, "O nome precisa possuir pelo menos 4 caracteres."),
  email: yup.string().
    email("O email precisa ser válido.").
    required("O e-mail é obrigatório!"),
  confirmEmail: yup.string().
    when("email", {
      is: (val: string) => val && val.length > 0 ? true : false,
      then: yup.string().oneOf([yup.ref("email")], "E-mails incompatíveis"),
    }),
  password: yup.string().
    required("Por favor, digite sua senha.").
    matches(/^(?=.*[A-Za-z])(?=.*d)(?=.*[@$!%*#?&])[A-Za-zd@$!%*#?&]{8,}$/,
      "A senha tem que conter 8 caracteres, uma letra maiúscula, uma minúscula, um número , um caracter especial e um caractere especial"),
  confirmPassword: yup.string().when("password", {
    is: (val: string) => val && val.length > 0 ? true : false,
    then: yup.string().oneOf([yup.ref("password")], "Senhas incompatíveis."),
  })
});


export default function SignUpScreen({ navigation, route }: Props) {
  const { email } = route.params;

  const [image, setImage] = useState<string>("");

  //TODO: Implementar a função de criação de usuário
  async function createUser() { }

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

  return (
    <KeyboardAvoidingView style={styles.container}>
      <ScrollView>
      <Formik
        initialValues={{
          name: "",
          email,
          confirmEmail: email,
          password: "",
          confirmPassword: ""
        }}
        validationSchema={signUpValidationSchema}
        onSubmit={createUser}
      >
        {({ handleChange, handleBlur, values, errors, isValid, handleSubmit }) => (
          <>
            <TextInput
              value={values.name}
              error={!!errors.name}
              label="Nome"
              mode="outlined"
              style={commonStyles.rowSpacing}
              onChangeText={handleChange("name")}
              onBlur={handleBlur("name")}
            />
            <HelperText type="error" visible={!!errors.name}>{errors.name}</HelperText>

            <TextInput
              value={values.email}
              error={!!errors.email}
              onChangeText={handleChange("email")}
              label="E-mail"
              mode="outlined"
              style={commonStyles.rowSpacing}
            />
            <HelperText type="error" visible={!!errors.email}>{errors.email}</HelperText>

            <TextInput
              value={values.confirmEmail}
              error={!!errors.confirmEmail}
              onChangeText={handleChange("confirmEmail")}
              label="Confirmar e-mail"
              mode="outlined"
              style={commonStyles.rowSpacing}
            />
            <HelperText type="error" visible={!!errors.confirmEmail}>{errors.confirmEmail}</HelperText>
            
            <TextInputPassword
              label="Senha"
              mode="outlined"
              style={commonStyles.rowSpacing}
              value={values.password}
              error={!!errors.password}
              onChangeText={handleChange("password")}
              onBlur={handleBlur("password")}
            />
            
            <HelperText type="error" visible={!!errors.password}>{errors.password}</HelperText>

            <TextInputPassword
               label="Confirmar senha"
               mode="outlined"
               style={commonStyles.rowSpacing}
               value={values.confirmPassword}
               error={!!errors.confirmPassword}
               onChangeText={handleChange("confirmPassword")}
               onBlur={handleBlur("confirmPassword")}
            />
            <HelperText type="error" visible={!!errors.confirmPassword}>{errors.confirmPassword}</HelperText>

            <Button
              mode="contained-tonal"
              onPress={pickImage}
              icon={image && "check"}
              textColor={image && "white"}
              style={{ backgroundColor: image ? "green" : "" }}
            >Selecionar Imagem
            </Button>
            <SquareButton
              disabled={!isValid}
              icon="account-plus"
              style={commonStyles.rowSpacing}
              mode="contained"
              onPress={handleSubmit}
            >Cadastrar-se
            </SquareButton>
          </>
        )}
      </Formik>
      </ScrollView>
    </KeyboardAvoidingView >
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 15
  }
})