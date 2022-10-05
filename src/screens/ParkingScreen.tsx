import { useState } from "react";
import { View, StyleSheet, Dimensions } from "react-native";
import MapView from "react-native-maps";
import { Button, SegmentedButtons, Text } from "react-native-paper";

//Apikey Gmaps: AIzaSyDWsqwdw-5Z-xt8Ye0UmNtLHB9HekJGUAk

export default function ParkingScreen(){
    const [parkingTime, setParkingTime] = useState("1");
   
    return(
        <View style={styles.container}>
            <MapView style={styles.map} provider={"google"}></MapView>
            <View style={styles.timeContainer}>
                <Text variant="headlineMedium">Tempo de Estacionamento</Text>
                <SegmentedButtons
                    value={parkingTime}
                    onValueChange={setParkingTime}
                    buttons={[
                        {
                        value: "1",
                        icon: "alarm",
                        label: "01 hora",
                        },
                        {
                        value: "2",
                        icon: "alarm",
                        label: "02 horas",
                        }
                    ]}
                />
            </View>
            <Button mode="contained">Estacionar</Button>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    timeContainer: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },
    map: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').width,
        // backgroundColor: "#000"
    },
})