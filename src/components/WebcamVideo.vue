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

    <div class="buttons">
      <button ref="stop" @click="stop">Stop</button>
      <button ref="play" @click="play">Play</button>
    </div>
  </div>

</template>

<script lang="ts">
import { defineComponent } from 'vue';
import FaceApiService from '@/services/FaceApiService';
import {
  TinyFaceDetectorOptions,
  draw,
  WithFaceExpressions, detectSingleFace, WithFaceDescriptor, FaceDetection, WithFaceLandmarks
} from 'face-api.js';
import { combineLatest, fromEvent, interval } from 'rxjs';
import { concatMap, debounceTime, distinctUntilChanged, exhaustMap, filter, map, switchMap, tap } from 'rxjs/operators';

export type DetectionResult =
    WithFaceDescriptor<WithFaceExpressions<WithFaceLandmarks<{ detection: FaceDetection; }>>>
    | undefined

export default defineComponent({
  name: 'WebcamVideo',
  mounted: async function() {
    await this.play();
  },
  methods: {
    play: async function() {
      const videoRef = this.$refs.video as HTMLVideoElement;
      const canvasRef = this.$refs.canvas as HTMLCanvasElement;
      await FaceApiService.init();

      videoRef.srcObject = await FaceApiService.getVideo();

      const video$ = fromEvent(videoRef, 'play');
      const refreshTime = 100;
      const refreshTimer$ = interval(refreshTime);

      // Try to detect expression every tot time
      const expressionDetection$ = combineLatest([refreshTimer$, video$]).pipe(
          concatMap(([time, video]) => this.detectFace(videoRef)),
          // tap(console.log),
          filter(i => i !== undefined && i !== null)
      );

      // Print on canvas
      expressionDetection$.pipe(tap(detection => this.printLandmarks(detection, canvasRef))).subscribe();

      // Manage expression
      expressionDetection$.pipe(
          map(detection => detection ? this.getExpressionName(detection) : null),
          distinctUntilChanged(),
          debounceTime(3000),
      ).subscribe(console.log);
    },
    stop: async function() {
      console.log('stop');
      const videoRef = this.$refs.video as HTMLVideoElement;
      //const stream = await FaceApiService.getVideo();
      //stream?.getTracks()[0];
      videoRef.srcObject = null;
    },
    clearCanvas: function(canvas: HTMLCanvasElement) {
      const context = canvas.getContext('2d');
      context?.clearRect(0, 0, canvas.width, canvas.height);
    },
    getExpressionName: function(detection: DetectionResult) {
      if(!detection?.expressions) {
        return null;
      }
      const res = Object.entries(detection.expressions).reduce((max, [key, value]) => {
        return value > max.value ? { key, value } : max;
      }, { key: 'neutral', value: 0 });
      return res.key;
    },
    detectFace: async function(videoRef: HTMLVideoElement) {
      return await detectSingleFace(videoRef, new TinyFaceDetectorOptions())
          .withFaceLandmarks()
          .withFaceExpressions()
          .withFaceDescriptor();
    },
    printLandmarks: async function(detection: DetectionResult, canvasRef: HTMLCanvasElement) {
      // console.log(detection?.expressions)
      this.clearCanvas(canvasRef);
      if(detection) {
        draw.drawDetections(canvasRef, detection);
      }
    },
    expressionChanged(expression: string) {
      this.$emit('expressionChanged', { expression })
    }
  },
  data: function() {
    return {};
  },
  emits: ['expressionChanged']
});
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

  .buttons {
    position: absolute;
    top: 0;
    left: 0;
    z-index: 10;
  }
}
</style>
