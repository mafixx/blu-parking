import { VehicleCreateInterface, VehicleInterface } from "../types/Vehicle";
import "react-native-get-random-values";
import { v4 as uuid } from "uuid";

export class VehicleService {
    static async getAllVehicles(): Promise<VehicleInterface[]> {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve([
                    {id: "1", vehicleModel: "Hyundai HB20x", licensePlate: "KZH-8H54", isParked: false, parkingTimeLeft: 0},
                    {id: "b321", vehicleModel: "Toyota Corolla", licensePlate: "DPA-0026", isParked: true, parkingTimeLeft: 100}
                ]);
            }, 500);
        });
    }

    static async addVehicle(vehicle: VehicleCreateInterface): Promise<VehicleInterface> {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                if (vehicle.licensePlate === "XXX0000") {
                    reject(new Error("licensePlate is invalid"));
                }

                resolve({ ...vehicle, id: uuid(), isParked: false, parkingTimeLeft: 0 });
            }, 500);
        });
    }

    static async editVehicle(vehicle: VehicleInterface): Promise<VehicleInterface> {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                if (vehicle.licensePlate === "XXX0000") {
                    reject(new Error("licensePlate is invalid"));
                }

                resolve({ ...vehicle });
            }, 500);
        });
    }

    static async deleteVehicle(vehicleId: string): Promise<undefined> {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                if (vehicleId === "1") {
                    reject(new Error("licensePlate is invalid"));
                }

                resolve(undefined);
            }, 500);
        });
    }
}
