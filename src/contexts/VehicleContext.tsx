import { createContext, ReactNode, useContext, useState, useEffect } from "react";
import { Alert } from "react-native";
import { VehicleService } from "../services/VehicleService";
import { VehicleCreateInterface, VehicleInterface } from "../types/Vehicle";

type VehicleContextType = {
    vehicles: VehicleInterface[];
    addVehicle: (vehicle: VehicleCreateInterface, callback: VoidFunction) => void;
    editVehicle: (vehicle: VehicleInterface, callback: VoidFunction) => void;
    deleteVehicle: (vehicleId: string) => void;
    parkVehicle: (vehicleId: string, time: 1 | 2) => void;
    stopParkTime: (vehicleId: string) => void;

}

const VehicleContext = createContext<VehicleContextType>(null!);

export function VehicleProvider({ children }: { children: ReactNode }) {
    const [vehicles, setVehicles] = useState<VehicleInterface[]>([]);

    async function addVehicle(vehicle: VehicleCreateInterface, callback: VoidFunction) {
        try {
            const newVehicle = await VehicleService.addVehicle(vehicle);

            setVehicles([...vehicles, newVehicle]);
            callback();

        } catch (error) {
            console.error(error);
            Alert.alert("Falha", "Não foi possível cadastrar o veículo.");
        }
    }

    async function editVehicle(vehicle: VehicleInterface, callback: VoidFunction) {
        try {
            const updatedVehicle = await VehicleService.editVehicle(vehicle);
            const updatedVehicles = vehicles.map(v => {
                if (v.id === updatedVehicle.id) {
                    v = { ...updatedVehicle };
                }
                return v;
            });
            setVehicles(updatedVehicles);

            callback();
        } catch (error) {
            console.error(error);
            Alert.alert("Falha", "Não foi possível editar o veículo.");
        }
    }

    async function deleteVehicle(vehicleId: string) {
        try {
            await VehicleService.deleteVehicle(vehicleId);

            const updatedVehicles = vehicles.filter(v => v.id !== vehicleId);
            setVehicles(updatedVehicles);

        } catch (error) {
            console.error(error);
            Alert.alert("Falha", "Não foi possível remover o veículo.");
        }
    }

    function parkVehicle(vehicleId: string, time: 1 | 2) {
        const updatedVehicles = vehicles.map(v =>{
            if(v.id === vehicleId){
                v.isParked = true;
                v.parkingTimeLeft = new Date().getTime();
                v.parkingTimeLeft = time;
            }
            return v;
        });
        setVehicles(updatedVehicles);
    }

    async function getAllVehicles() {
        try {
            const vehicles = await VehicleService.getAllVehicles();
            setVehicles(vehicles);
        } catch (error) {
            console.error(error);
            Alert.alert("Falha", "Não foi possível editar o veículo.");
        }
    }


    function stopParkTime(vehicleId: string){
        const updatedVehicles = vehicles.map(v =>{
            if (v.id === vehicleId){
                v.parkingTimeLeft = 0;
                v.isParked = false;
            }
            return v;
        })
    }

    useEffect(() => {
        getAllVehicles();
    }, [])

    return (
        <VehicleContext.Provider value={{ stopParkTime, vehicles, addVehicle, editVehicle, deleteVehicle, parkVehicle }}>
            {children}
        </VehicleContext.Provider>
    )
}

export const useVehicles = () => useContext(VehicleContext);