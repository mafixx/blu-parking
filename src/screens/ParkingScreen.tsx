import { useEffect, useState } from "react";
import { Alert, View, StyleSheet, Dimensions } from "react-native";
import MapView, { Marker } from "react-native-maps";
import { Button, SegmentedButtons, Text } from "react-native-paper";
import * as Location from "expo-location";
import { useUser } from "../contexts/UserContext";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { AppStackParamList } from "../routes/AppRoutes";
import { useVehicles } from "../contexts/VehicleContext";

//Apikey Gmaps: AIzaSyDWsqwdw-5Z-xt8Ye0UmNtLHB9HekJGUAk

type Props = NativeStackScreenProps<AppStackParamList, "ParkingScreen">;

export default function ParkingScreen(props: Props) {
    const [parkingTime, setParkingTime] = useState<any>(1);
    const [location, setLocation] = useState<any>();

    useEffect(() => {
        (async () => {

            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                return;
            }

            let location = await Location.getCurrentPositionAsync({});

            setLocation({
                latitude: location.coords.latitude,
                longitude: location.coords.longitude,
                latitudeDelta: 0.009,
                longitudeDelta: 0.009
            });
        })();
    }, []);

    const { withdrawBalance } = useUser();
    const { parkVehicle } = useVehicles();
    
    const { vehicle } = props.route.params;

    function parkVehicles() {
        try {
            const parkingPrice = 2;

            parkVehicle(vehicle.id, parkingTime);
            withdrawBalance(parkingPrice * Number(parkingTime));
            props.navigation.push("HomeScreen");
        } catch (err) {
            Alert.alert("Falha", "Não foi possível estaciona o veículo. Saldo Insuficiente.");
        }
    }

    return (
        <View style={styles.container}>
            {
                !!location && <MapView initialRegion={location} style={styles.map} provider={"google"}>
                    <Marker coordinate={location} />
                </MapView>
            }
            <View style={styles.timeContainer}>
                <Text variant="headlineMedium">Tempo de Estacionamento</Text>
                <SegmentedButtons
                    value={""+parkingTime}
                    onValueChange={text => setParkingTime(+text)}
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
            <Button mode="contained" onPress={parkVehicles}>Estacionar</Button>
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