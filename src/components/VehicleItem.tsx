import { StyleSheet, View } from "react-native";
import { Swipeable } from "react-native-gesture-handler";
import { Button, IconButton, Text } from "react-native-paper";
import { commonStyles } from "../theme/commonStyles";
import { VehicleInterface } from "../types/Vehicle";

type Props = {
    vehicle: VehicleInterface;
};

export function VehicleItem(props: Props) {
    function getLeftContent() {
        return (
            <IconButton icon={"pencil"} iconColor="#fff"  size={50} style={[styles.deleteButton, { backgroundColor: commonStyles.colors.primary }]} />
        );
    }

    function getRightContent() {
        return (
            <IconButton icon={"delete"} iconColor="#fff"  size={50} style={[styles.deleteButton, { backgroundColor: "red" } ]} />
        );
    }


    return (
        <View style={styles.container}>
            <Swipeable renderLeftActions={getLeftContent} renderRightActions={getRightContent}>
                <View style={styles.innerContainer}>
                    <View style={styles.vehicleInfoContainer}>
                        <Text style={styles.vehicleBrand}>{props.vehicle.vehicleModel}</Text>
                        <Text style={styles.vehiclePlate}>{props.vehicle.licensePlate}</Text>
                    </View>
                    <Button mode="contained" style={styles.parkingButton}>Estacionar</Button>
                </View>
            </Swipeable>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#fff",
        marginBottom: 6,
        borderLeftColor: commonStyles.colors.primary,
        borderLeftWidth: 8,
        borderRadius: 8,
        height: 66,
    },
    innerContainer: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center"
    },
    vehicleInfoContainer: {
        flex: 1,
        padding: 5
    },
    vehicleBrand: {
        fontSize: 24,
        fontWeight: "bold"
    },
    vehiclePlate: {
        fontSize: 20,
        textShadowColor: 'rgba(155, 255, 10, 0.75)',
        textShadowOffset: {width: -1, height: 1},
        textShadowRadius: 6,
    },
    deleteButton: {
        backgroundColor: commonStyles.colors.primary,
        borderRadius: 0,
        margin: 0,
        padding: 0
    },
    parkingButton: {
        marginRight: 5,
    },
});


