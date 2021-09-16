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
      <button @click="stop">Stop</button>
      <button @click="play">Play</button>
      <button @click="clearCanvas">Clear canvas</button>
    </div>
  </div>

</template>

<script lang="ts">
import { defineComponent } from 'vue';
import FaceApiService, { DetectionResult, FaceExpression } from '@/services/FaceApiService';
import {
  draw, FaceExpressions,
} from 'face-api.js';
import { debounceTime, distinctUntilChanged, map, tap } from 'rxjs/operators';


export default defineComponent({
  name: 'WebcamVideo',
  mounted: async function() {
    console.debug('Starting webcam...');
    // await this.play();
    console.debug('Webcam started');
  },
  methods: {
    play: async function() {
      console.debug('Start playing...');
      const videoRef = this.$refs.video as HTMLVideoElement;
      const canvasRef = this.$refs.canvas as HTMLCanvasElement;
      await FaceApiService.init();

      videoRef.srcObject = await FaceApiService.getVideo();

      const refreshMs = 100;
      const debounceMs = 1000;

      // Try to detect expression every tot time
      const expressionDetection$ = FaceApiService.getExpressionDetection({ videoRef, refreshMs });

      // Print on canvas
      expressionDetection$.pipe(tap(detection => this.printLandmarks(detection, canvasRef))).subscribe();

      // Manage expression
      expressionDetection$.pipe(
          map(detection => detection ? FaceApiService.getExpressionName(detection) : null),
          distinctUntilChanged(),
          debounceTime(debounceMs),
          tap(expression => console.debug({ expression }))
      ).subscribe(expression => this.expressionChanged(expression));
      console.debug('Started');
    },
    stop: async function() {
      console.debug('stop');
      const videoRef = this.$refs.video as HTMLVideoElement;
      //const stream = await FaceApiService.getVideo();
      //stream?.getTracks()[0];
      videoRef.srcObject = null;
    },
    clearCanvas: function(canvas: HTMLCanvasElement) {
      const context = canvas.getContext('2d');
      context?.clearRect(0, 0, canvas.width, canvas.height);
    },
    printLandmarks: async function(detection: DetectionResult, canvasRef: HTMLCanvasElement) {
      // console.log(detection?.expressions)
      this.clearCanvas(canvasRef);
      if(detection) {
        draw.drawDetections(canvasRef, detection);
      }
    },
    expressionChanged(expression: FaceExpression) {
      this.$emit('expressionChanged', { expression });
    }
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
