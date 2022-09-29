import { Button, ButtonProps } from "react-native-paper";
import { StyleSheet } from "react-native";

export function SquareButton({children, ...rest}: React.ComponentProps<typeof Button>){
    return(
        <Button {...rest} style={[styles.squareButton, rest.style]}>{children}</Button>
    );
}

const styles = StyleSheet.create({
    squareButton: {
        borderRadius: 4
    }
});