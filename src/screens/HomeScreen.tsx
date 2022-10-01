import { useState } from "react";
import { Dimensions, FlatList, ListRenderItemInfo, StyleSheet, Text, View } from "react-native";
import { Button, IconButton } from "react-native-paper";
import { commonStyles } from "../theme/commonStyles";
import { VehicleInterface } from "../types/Vehicle";

const screenWidth = Dimensions.get("screen").width;

export default function HomeScreen() {
    const [vehicles, setVehicles] = useState<VehicleInterface[]>([
        {id: "a123", vehicleModel: "Hyundai HB20x", licensePlate: "KZH-8H54", isParked: false, parkingTimeLeft: 0},
        {id: "b321", vehicleModel: "Toyota Corolla", licensePlate: "DPA-0026", isParked: true, parkingTimeLeft: 100}
    ]);
    
function renderVehicle(item: ListRenderItemInfo<VehicleInterface>){
    return <></>
}

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <IconButton style={styles.menu} icon={"menu"} size={32} iconColor={commonStyles.colors.primary} onPress={()=>{}}/>
                <View style={styles.balanceContainer}>
                    <Text style={styles.currency}>R$</Text>
                    <Text style={styles.balanceText}>500,00</Text>
                </View>
            </View>
            <View style={styles.vehiclesContainer}>
                <FlatList
                    data={vehicles}
                    renderItem={item=> renderVehicle(item)}
                    keyExtractor={item => item.id}
                />
            </View>
            <Button>Adicionar Veículo</Button>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    header: {
        flex: 3,
        backgroundColor: commonStyles.colors.primary,
        justifyContent: "center",
        alignItems: "center",
    },
    menu: {
        top:10,
        left: 10,
        position: "absolute",
        backgroundColor: "#fff"
    },
    balanceContainer: {
        position: "relative",
        top: screenWidth / 3,
        width: screenWidth / 1.5,
        height: screenWidth / 1.5,
        borderRadius: screenWidth /2,
        backgroundColor: "#fff",
        borderWidth: 10,
        borderColor: "#eed32e",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "row",
        flexWrap: "nowrap",
    },
    balanceText: {
        fontSize: 56,
    },
    currency:{
        fontSize: 24,
    },
    vehiclesContainer: {
        flex: 7,
    },
});