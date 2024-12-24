import { Bluetooth } from '@nativescript/bluetooth';
import { BleDevice } from './models/ble-device.model';
import { BleConnection } from './models/ble-connection.model';

export class BluetoothService {
    private static instance: BluetoothService;
    private bluetooth: Bluetooth;

    private constructor() {
        this.bluetooth = new Bluetooth();
    }

    public static getInstance(): BluetoothService {
        if (!BluetoothService.instance) {
            BluetoothService.instance = new BluetoothService();
        }
        return BluetoothService.instance;
    }

    public async connect(deviceId: string): Promise<void> {
        try {
            await this.bluetooth.connect({
                UUID: deviceId,
                onConnected: (peripheral) => {
                    console.log("Connected to device:", peripheral.UUID);
                },
                onDisconnected: (peripheral) => {
                    console.log("Disconnected from device:", peripheral.UUID);
                }
            });
        } catch (error) {
            console.error("Bluetooth connection error:", error);
            throw error;
        }
    }
}