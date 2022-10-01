import { Image, StyleSheet, Text, View } from "react-native";
import { useFonts } from "expo-font";

export default function SplashScreen(){
    const [fonts] = useFonts({
        "InterBold": require("../../assets/Inter-Bold.ttf")
    });

    return(
        <View style={styles.container}>
            <View style={styles.containerTwo}>
            <Image style={styles.image} source={require("../../assets/splash.gif")}/>
            </View>
            <Text style={styles.logoName}>BluParking</Text>
         </View>
    )
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        
    },
    containerTwo:{
        // width: 10,
        // height: 10,
        overflow: "hidden",
        borderRadius: 150,
    },
    image: {
        width: 300,
        height: 300,
      
    },
    logoName: {
        fontFamily: "InterBold",
        fontSize: 52,
    }
});