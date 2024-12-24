export interface BleConnection {
    deviceId: string;
    isConnected: boolean;
    lastConnected?: Date;
}