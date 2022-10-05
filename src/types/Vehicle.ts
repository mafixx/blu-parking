export interface VehicleInterface {
    id: string;
    licensePlate: string;
    vehicleModel: string;
    isParked: boolean;
    parkingTimeLeft: number;
}

export interface VehicleCreateInterface{
    licensePlate: string;
    vehicleModel: string;
}