import {
  detectSingleFace,
  loadFaceExpressionModel,
  loadFaceLandmarkModel,
  loadFaceRecognitionModel,
  loadSsdMobilenetv1Model,
  loadTinyFaceDetectorModel,
  TinyFaceDetectorOptions,
} from 'face-api.js';
import { combineLatest, fromEvent, interval, Observable } from 'rxjs';
import { concatMap, filter } from 'rxjs/operators';
import { DetectionResult, FaceExpression } from '@/models/face-api.models';

export default class FaceApiService {

  static async init(): Promise<void> {
    const MODEL_URL = '/models';

    await loadSsdMobilenetv1Model(MODEL_URL);
    await loadFaceLandmarkModel(MODEL_URL);
    await loadFaceRecognitionModel(MODEL_URL);
    await loadFaceExpressionModel(MODEL_URL);
    await loadTinyFaceDetectorModel(MODEL_URL);
  }

  static async getVideo(videoSize = {
    maxWidth: 1280,
    maxHeight: 720
  }): Promise<MediaStream | null> {
    const constraints = {
      audio: false,
      video: {
        width: { max: videoSize.maxWidth },
        height: { max: videoSize.maxHeight }
      }
    };
    try {
      return await navigator.mediaDevices.getUserMedia(constraints);
    } catch(err) {
      console.log(err);
      alert('This website works only with a webcam. Please grant video permission.')
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
      concatMap(([,]) => this.detectFace(videoRef)),
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
