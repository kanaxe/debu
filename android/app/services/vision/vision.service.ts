import { Image } from '@nativescript/core';
import * as cocoSsd from '@tensorflow-models/coco-ssd';
import * as faceDetection from '@tensorflow-models/face-detection';
import { DetectionResult } from './models/detection.model';

export class VisionService {
    private static instance: VisionService;
    private objectDetector: cocoSsd.ObjectDetection;
    private faceDetector: faceDetection.FaceDetector;

    private constructor() {
        this.initializeModels();
    }

    public static getInstance(): VisionService {
        if (!VisionService.instance) {
            VisionService.instance = new VisionService();
        }
        return VisionService.instance;
    }

    private async initializeModels() {
        this.objectDetector = await cocoSsd.load();
        this.faceDetector = await faceDetection.createDetector(
            faceDetection.SupportedModels.MediaPipeFaceDetector
        );
    }

    public async detectObjects(image: Image): Promise<DetectionResult[]> {
        if (!this.objectDetector) {
            throw new Error('Object detector not initialized');
        }
        const results = await this.objectDetector.detect(image);
        return results.map(result => ({
            label: result.class,
            confidence: result.score,
            bbox: result.bbox
        }));
    }
}