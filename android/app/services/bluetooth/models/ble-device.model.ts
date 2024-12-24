export interface BleDevice {
    UUID: string;
    name?: string;
    state: 'connected' | 'disconnected';
}