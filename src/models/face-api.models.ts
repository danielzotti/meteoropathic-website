import { FaceDetection, WithFaceDescriptor, WithFaceExpressions, WithFaceLandmarks } from 'face-api.js';

export type DetectionResult =
  WithFaceDescriptor<WithFaceExpressions<WithFaceLandmarks<{ detection: FaceDetection; }>>>
  | undefined;


export type FaceExpressions = 'neutral' | 'happy' | 'sad' | 'angry' | 'fearful' | 'disgusted' | 'surprised' | null;

export interface FaceExpressionResult {
  name: FaceExpressions;
  percentage: number;
}

export type FaceExpressionResultWithOthers = FaceExpressionResult & {
  others: Array<FaceExpressionResult>
}

