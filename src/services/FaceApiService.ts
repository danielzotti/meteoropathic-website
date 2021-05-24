import {
  loadFaceExpressionModel,
  loadFaceLandmarkModel,
  loadFaceRecognitionModel,
  loadSsdMobilenetv1Model,
  loadTinyFaceDetectorModel
} from 'face-api.js';

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
      console.log(err)
    }
    return null;
  }

}
