<template>
  <div class="container">
    <video ref="video"
           width="720"
           height="560"
           autoplay
           muted
    ></video>

    <canvas ref="canvas"
            width="720"
            height="560"></canvas>
  </div>

</template>

<script lang="ts">
import { defineComponent } from 'vue';
import FaceApiService from '@/services/FaceApiService';
import {
  TinyFaceDetectorOptions,
  draw,
  WithFaceExpressions,
  WithFaceDetection, detectSingleFace, WithFaceDescriptor, FaceDetection, WithFaceLandmarks, FaceLandmarks68
} from 'face-api.js';
import { combineLatest, fromEvent, interval, merge } from 'rxjs';
import { concatMap, distinctUntilChanged, map, withLatestFrom } from 'rxjs/operators';

export default defineComponent({
  name: 'WebcamVideo',
  mounted: async function() {
    const videoRef = this.$refs.video as HTMLVideoElement;
    const canvasRef = this.$refs.canvas as HTMLCanvasElement;
    await FaceApiService.init();
    videoRef.srcObject = await FaceApiService.getVideo();
    const video$ = fromEvent(videoRef, 'play');
    const refreshTime = 100;
    const refreshTimer$ = interval(refreshTime);
    const expressionDetection$ = combineLatest(refreshTimer$, video$).pipe(
        concatMap(([time, video]) =>
            manageVideo(videoRef, canvasRef)
        ),
        distinctUntilChanged()
    );

    expressionDetection$.pipe(
        map(detection => detection ? manageExpressions(detection) : null)
    ).subscribe(console.log);
  },
  methods: {}
});


const clearCanvas = (canvas: HTMLCanvasElement) => {
  const context = canvas.getContext('2d');
  context?.clearRect(0, 0, canvas.width, canvas.height);
};

const manageExpressions = (detection: WithFaceDescriptor<WithFaceExpressions<WithFaceLandmarks<{ detection: FaceDetection; }, FaceLandmarks68>>>) => {
  const res = Object.entries(detection.expressions).reduce((max, [key, value]) => {
    return value > max.value ? { key, value } : max;
  }, { key: 'none', value: 0 });
  console.log({ expressionDetected: res });
  //console.log(detection);
  //if(!detection || !detection.expressions) {
  //  console.log('no detection');
  //  return;
  //}
  //const res = Object.entries(detection.expressions).map(([key, value]) => {
  //  debugger;
  //  return { key, value };
  //}, { key: undefined, value: 0 } as { key: string | undefined, value: number });
};

const manageVideo = async (videoRef: HTMLVideoElement, canvasRef: HTMLCanvasElement) => {
  const detection = await detectSingleFace(videoRef, new TinyFaceDetectorOptions())
      .withFaceLandmarks()
      .withFaceExpressions()
      .withFaceDescriptor();

  if(detection) manageExpressions(detection);

  if(detection) {
    clearCanvas(canvasRef);
    draw.drawDetections(canvasRef, detection);
    //clearInterval(interval);
  }
  return detection;
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.container {
  height: 560px;

  video, canvas {
    position: absolute;
    height: 560px;
    width: 720px;
    top: 0;
    left: 0;
  }
}
</style>
