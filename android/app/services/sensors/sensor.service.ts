import { Utils } from '@nativescript/core';
import { AccelerometerData } from './models/accelerometer.model';
import { GyroscopeData } from './models/gyroscope.model';
import { MagnetometerData } from './models/magnetometer.model';

export class SensorService {
    private static instance: SensorService;
    private accelerometer: any;
    private gyroscope: any;
    private magnetometer: any;

    private constructor() {
        if (Utils.android) {
            const context = Utils.android.getApplicationContext();
            const sensorManager = context.getSystemService(android.content.Context.SENSOR_SERVICE);
            
            this.accelerometer = sensorManager.getDefaultSensor(android.hardware.Sensor.TYPE_ACCELEROMETER);
            this.gyroscope = sensorManager.getDefaultSensor(android.hardware.Sensor.TYPE_GYROSCOPE);
            this.magnetometer = sensorManager.getDefaultSensor(android.hardware.Sensor.TYPE_MAGNETIC_FIELD);
        }
    }

    public static getInstance(): SensorService {
        if (!SensorService.instance) {
            SensorService.instance = new SensorService();
        }
        return SensorService.instance;
    }

    public startAccelerometer(callback: (data: AccelerometerData) => void) {
        if (Utils.android && this.accelerometer) {
            const sensorEventListener = new android.hardware.SensorEventListener({
                onSensorChanged: (event) => {
                    callback({
                        x: event.values[0],
                        y: event.values[1],
                        z: event.values[2],
                        timestamp: new Date()
                    });
                },
                onAccuracyChanged: () => { }
            });

            const sensorManager = Utils.android.getApplicationContext()
                .getSystemService(android.content.Context.SENSOR_SERVICE);
            sensorManager.registerListener(
                sensorEventListener,
                this.accelerometer,
                android.hardware.SensorManager.SENSOR_DELAY_NORMAL
            );
        }
    }
}