import React, { useState } from "react";
import { TextInput } from "react-native-paper"


export function TextInputPassword(props: React.ComponentProps<typeof TextInput>){ //Nesse caso não se criará como default, pois não é screen e sim, componente
    const[isPasswordInvisible, setIsPasswordInvisible] = useState(true);
    
    return(
        <TextInput
        {...props}
              secureTextEntry={isPasswordInvisible}
              right={<TextInput.Icon
                icon={isPasswordInvisible ? "eye" : "eye-off"}
                onPress={() => setIsPasswordInvisible(!isPasswordInvisible)} />}
            />
    )
}