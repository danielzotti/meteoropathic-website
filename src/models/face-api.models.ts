import { FaceDetection, WithFaceDescriptor, WithFaceExpressions, WithFaceLandmarks } from 'face-api.js';

export type DetectionResult =
  WithFaceDescriptor<WithFaceExpressions<WithFaceLandmarks<{ detection: FaceDetection; }>>>
  | undefined;


export type FaceExpression = 'neutral' | 'happy' | 'sad' | 'angry' | 'fearful' | 'disgusted' | 'surprised' | null;
