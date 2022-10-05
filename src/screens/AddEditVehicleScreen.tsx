import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useState } from "react";
import { StyleSheet, View } from "react-native";
import { Button, IconButton, TextInput } from "react-native-paper";
import { useVehicles } from "../contexts/VehicleContext";
import { AppStackParamList } from "../routes/AppRoutes";
import { commonStyles } from "../theme/commonStyles";

type Props = NativeStackScreenProps<AppStackParamList, "AddEditVehicleScreen">;

export default function AddEditVehicleScreen(props: Props) {

    const [selectedVehicle, setselectedVehicle] = useState<"car" | "motorcycle">("car");
    const {addVehicle, editVehicle} = useVehicles();

    const vehicle = props.route.params?.vehicle;
    
    const [licensePlate, setLicensePlate] = useState(vehicle?.licensePlate || "");
    const [vehicleModel, setVehicleModel] = useState(vehicle?.vehicleModel || "");


    function onSaveVehicle(){
        if(vehicle){
            editVehicle({
                id: vehicle.id,
                isParked: vehicle.isParked,
                licensePlate: licensePlate,
                vehicleModel: vehicleModel,
                parkingTimeLeft: vehicle.parkingTimeLeft, 
            },()=> props.navigation.push("HomeScreen"));
        }else{
            addVehicle({
                licensePlate: licensePlate,
                vehicleModel: vehicleModel,
            },()=> props.navigation.push("HomeScreen"));
        }
    }

    return (
        <View style={styles.container}>
            <View style={styles.buttonsContainer}>
                <IconButton
                    style={[styles.vehicleButton,
                    {
                        backgroundColor: selectedVehicle === "car" ?
                            commonStyles.colors.primary : "#fff"
                    }
                    ]}
                        icon={"car"}
                        size={80}
                        iconColor={selectedVehicle === "car" ? "#fff" : commonStyles.colors.primary}
                        onPress={()=> setselectedVehicle("car")}
                />

                <IconButton 
                    style={[styles.vehicleButton,
                    {
                        backgroundColor: selectedVehicle === "motorcycle" ?
                            commonStyles.colors.primary : "#fff"
                    }
                    ]}
                        icon={"motorbike"} 
                        size={80} 
                        iconColor={selectedVehicle === "motorcycle" ? "#fff" : commonStyles.colors.primary}
                        onPress={()=> setselectedVehicle("motorcycle")}
                />
                
            </View>
            <View style={styles.formContainer}>
                <TextInput value={vehicleModel} onChangeText={setVehicleModel} mode="outlined" label="Modelo do Veículo"/>
                <TextInput value={licensePlate} onChangeText={text => setLicensePlate(text.toUpperCase())} mode="outlined" label="Placa"/>
            </View>
            <Button 
                mode="contained"
                onPress={onSaveVehicle}>
                    {props.route.params ? 
                    "Editar Veículo" : 
                    "Cadastrar o Veículo"}
            </Button>
        </View>
    );
}

const styles = StyleSheet.create({
    formContainer:{
        flex: 5,
    },
    container: {
        flex: 1,
        padding: 20,
    },
    buttonsContainer: {
        flex: 3,
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
    },
    vehicleButton: {
        backgroundColor: "#fff",
        borderColor: commonStyles.colors.primary,
        borderWidth: 3,
        borderRadius: 16,
    }
})