import { StyleSheet, View } from "react-native";
import { Avatar, Button } from "react-native-paper";
import { useAuth } from "../contexts/AuthContext";
import { useUser } from "../contexts/UserContext";

export function Menu(){
    const {avatar} = useUser();
    const { logOut } = useAuth();
    
    return(
        <View>
            <View style={styles.avatarContainer}>
                <Avatar.Image size={200} source={{uri: avatar}}/>      
            </View>
            <Button mode="outlined" icon={"logout"} onPress={logOut}>LogOut</Button>
        </View>
    );
}

const styles = StyleSheet.create({
    avatarContainer:{
        alignItems: "center",
        padding: 20,
    }
})