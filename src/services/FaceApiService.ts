import {
  detectSingleFace, FaceDetection,
  loadFaceExpressionModel,
  loadFaceLandmarkModel,
  loadFaceRecognitionModel,
  loadSsdMobilenetv1Model,
  loadTinyFaceDetectorModel, TinyFaceDetectorOptions, WithFaceDescriptor, WithFaceExpressions, WithFaceLandmarks
} from 'face-api.js';
import { combineLatest, fromEvent, interval, Observable } from 'rxjs';
import { concatMap, filter } from 'rxjs/operators';


export type DetectionResult =
  WithFaceDescriptor<WithFaceExpressions<WithFaceLandmarks<{ detection: FaceDetection; }>>>
  | undefined;


export type FaceExpression = 'neutral' | 'happy' | 'sad' | 'angry' | 'fearful' | 'disgusted' | 'surprised' | null;

export default class FaceApiService {

  static async init(): Promise<void> {
    const MODEL_URL = '/models';

    await loadSsdMobilenetv1Model(MODEL_URL);
    await loadFaceLandmarkModel(MODEL_URL);
    await loadFaceRecognitionModel(MODEL_URL);
    await loadFaceExpressionModel(MODEL_URL);
    await loadTinyFaceDetectorModel(MODEL_URL);
  }

  static async getVideo(constraints = {
    audio: false,
    video: {
      width: { max: 1280 },
      height: { max: 720 }
    }
  }): Promise<MediaStream | null> {

    try {
      return await navigator.mediaDevices.getUserMedia(constraints);
    } catch(err) {
      console.log(err);
    }
    return null;
  }

  static getExpressionDetection({
                                  videoRef,
                                  refreshMs = 100,
                                }: { videoRef: HTMLVideoElement, refreshMs: number }): Observable<DetectionResult> {
    const video$ = fromEvent(videoRef, 'play');
    const refreshTimer$ = interval(refreshMs);

    // Try to detect expression every tot time
    return combineLatest([refreshTimer$, video$]).pipe(
      concatMap(([time, video]) => this.detectFace(videoRef)),
      // tap(console.log),
      filter(i => !!i)
    );
  }

  static async detectFace(videoRef: HTMLVideoElement): Promise<DetectionResult> {
    return detectSingleFace(videoRef, new TinyFaceDetectorOptions())
      .withFaceLandmarks()
      .withFaceExpressions()
      .withFaceDescriptor();
  }

  static getExpressionName(detection: DetectionResult): FaceExpression {
    if(!detection?.expressions) {
      return null;
    }
    const res = Object.entries(detection.expressions).reduce((max, [key, value]) => {
      return value > max.value ? { key, value } : max;
    }, { key: 'neutral', value: 0 });
    return res.key as FaceExpression;
  }

}
