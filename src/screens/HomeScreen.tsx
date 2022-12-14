import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Dimensions, FlatList, StyleSheet, Text, View } from "react-native";
import { Button, IconButton } from "react-native-paper";
import { VehicleItem } from "../components/VehicleItem";
import { useUser } from "../contexts/UserContext";
import { useVehicles } from "../contexts/VehicleContext";
import { AppStackParamList } from "../routes/AppRoutes";
import { commonStyles } from "../theme/commonStyles";
import { VehicleInterface } from "../types/Vehicle";

const screenWidth = Dimensions.get("screen").width;

type Props = NativeStackScreenProps<AppStackParamList, "HomeScreen">;

export default function HomeScreen({navigation, route}: Props) {
    const { vehicles } = useVehicles();

    function renderVehicle(item: VehicleInterface) {
        //TODO: Verificar se há saldo
        
        return <VehicleItem 
        onParkVehicle={()=> navigation.navigate("ParkingScreen", 
            { vehicle: item })} 
        onEdit={()=> navigation.navigate("AddEditVehicleScreen", 
            {vehicle: item})}vehicle={item} 
                />
    };

    const { balance } = useUser();

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <IconButton 
                    style={styles.menu} 
                    icon={"menu"} 
                    size={32} 
                    iconColor={commonStyles.colors.primary}
                    // @ts-ignore 
                    onPress={() => navigation.openDrawer()} 
                />
                <View style={styles.balanceContainer}>
                    <Text style={styles.currency}>R$</Text>
                    <Text style={styles.balanceText}>{balance.toFixed(2)}</Text>
                    <IconButton icon={"plus"} size={40} style={styles.addButton} iconColor={"#fff"} />
                </View>
            </View>
            <View style={styles.vehiclesContainer}>
                <FlatList
                    data={vehicles}
                    renderItem={({ item }) => renderVehicle(item)}
                    keyExtractor={item => item.id}
                />
            </View>
            <Button mode="contained" onPress={()=> navigation.navigate("AddEditVehicleScreen")}>Adicionar Veículo</Button>
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
        top: 10,
        left: 10,
        position: "absolute",
        backgroundColor: "#fff"
    },
    balanceContainer: {
        position: "relative",
        top: screenWidth / 3,
        width: screenWidth / 1.5,
        height: screenWidth / 1.5,
        borderRadius: screenWidth / 2,
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
    currency: {
        fontSize: 24,
    },
    vehiclesContainer: {
        flex: 6,
        paddingTop: screenWidth / 3 + 80,
        paddingHorizontal: 20,
    },
    addButton: {
        backgroundColor: commonStyles.colors.primary,
        position: "absolute",
        bottom: -40,
    }
});