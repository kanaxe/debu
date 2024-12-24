export interface DetectionResult {
    label: string;
    confidence: number;
    bbox: [number, number, number, number];
}