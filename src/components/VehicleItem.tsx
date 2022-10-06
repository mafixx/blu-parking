import { useEffect, useRef, useState } from "react";
import { StyleSheet, View } from "react-native";
import { Swipeable } from "react-native-gesture-handler";
import { Button, IconButton, Text } from "react-native-paper";
import { useVehicles } from "../contexts/VehicleContext";
import { commonStyles } from "../theme/commonStyles";
import { VehicleInterface } from "../types/Vehicle";

type Props = {
    vehicle: VehicleInterface;
    onEdit: VoidFunction;
    onParkVehicle: VoidFunction;
};

export function VehicleItem(props: Props) {
    const { deleteVehicle } = useVehicles();
    
    function getLeftContent() {
        return (
            <IconButton onPress={props.onEdit} icon={"pencil"} iconColor="#fff"  size={50} style={[styles.deleteButton, { backgroundColor: commonStyles.colors.primary }]} />
        );
    }

    function getRightContent() {
        return (
            <IconButton onPress={()=> deleteVehicle(props.vehicle.id)} icon={"delete"} iconColor="#fff"  size={50} style={[styles.deleteButton, { backgroundColor: "red" } ]} />
        );
    }

    const milisecondsDiff = Date.now() - props.vehicle.startParkingTime; 
    
    const [remainingSeconds, setRemainingSeconds] = useState(props.vehicle.parkingTimeLeft * 3600 - (milisecondsDiff /1000)); 
    
    const timerRef = useRef<NodeJS.Timer>();

    const { stopParkTime } = useVehicles();

    function startTimer() {
        timerRef.current = setInterval(() => {
            if(remainingSeconds > 0){
                setRemainingSeconds(prev => prev - 1);
            }else{
                stopParkTime(props.vehicle.id);
            }
        }, 1000);
    }

    useEffect(() => {

        startTimer();

        () => {
            return clearInterval(timerRef.current);
        }
    }, []);

    const getRemainingHours = () => Math.floor(remainingSeconds / 60 / 60);
    const getRemainingMinutes = () => Math.floor((remainingSeconds / 60) % 60);
    const getRemainingSeconds = () => Math.floor(remainingSeconds % 60);
        

    return (
        <View style={styles.container}>
            <Swipeable renderLeftActions={getLeftContent} renderRightActions={getRightContent}>
                <View style={styles.innerContainer}>
                    <View style={styles.vehicleInfoContainer}>
                        <Text style={styles.vehicleBrand}>{props.vehicle.vehicleModel}</Text>
                        <Text style={styles.vehiclePlate}>{props.vehicle.licensePlate}</Text>
                    </View>
                    {
                        props.vehicle.isParked ? 
                        <Button mode="contained" style={styles.parkingButton} onPress={props.onParkVehicle}>{getRemainingHours()}:{getRemainingMinutes()}:{getRemainingSeconds()}</Button>:
                        <Button mode="contained" style={styles.parkingButton} onPress={props.onParkVehicle}>Estacionar</Button>
                    }
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


