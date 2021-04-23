import {
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
    await loadTinyFaceDetectorModel(MODEL_URL);
  }

}
