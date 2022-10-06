export interface VehicleInterface {
    id: string;
    licensePlate: string;
    vehicleModel: string;
    isParked: boolean;
    parkingTimeLeft: number;
    startParkingTime: number;
}

export interface VehicleCreateInterface{
    licensePlate: string;
    vehicleModel: string;
}