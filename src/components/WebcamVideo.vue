<template>
  <div class="container">
    <div class="video-container" :style="styleObject">
      <video ref="video"
             :width="width"
             :height="height"
             autoplay
             muted
      ></video>
      <canvas ref="canvas"
              :width="width"
              :height="height"></canvas>
    </div>


    <div class="buttons">
      <button @click="stop">Stop</button>
      <button @click="play">Play</button>
      <button @click="clearCanvas">Clear canvas</button>
    </div>
  </div>

</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { draw } from 'face-api.js';
import FaceApiService from '@/services/FaceApiService';
import { debounceTime, distinctUntilChanged, filter, map, switchMap, tap, withLatestFrom } from 'rxjs/operators';
import { interval, of } from 'rxjs';
import { DetectionResult, FaceExpression } from '@/models/face-api.models';


export default defineComponent({
  name: 'WebcamVideo',
  props: {
    width: { type: Number, default: 72 * 2 },
    height: { type: Number, default: 56 * 2 },
    showVideo: {
      type: Boolean,
      default: true
    },
    showButtons: {
      type: Boolean,
      default: false
    },
    showDebug: {
      type: Boolean,
      default: false
    }
  },
  mounted: async function() {
    await this.play();
  },
  computed: {
    styleObject(): { width: string, height: string, display: string } {
      return {
        width: `${ this.width }px`,
        height: `${ this.height }px`,
        display: this.showVideo ? 'block' : 'none'
      };
    }
  },
  methods: {
    play: async function() {
      console.debug('Start playing...');
      const videoRef = this.$refs.video as HTMLVideoElement;
      const canvasRef = this.$refs.canvas as HTMLCanvasElement;
      await FaceApiService.init();

      videoRef.srcObject = await FaceApiService.getVideo({ maxWidth: this.width, maxHeight: this.height });

      const refreshMs = 100;
      const debounceMs = 1000;

      // Try to detect expression every tot time
      const expressionDetection$ = FaceApiService.getExpressionDetection({ videoRef, refreshMs });

      // Print on canvas
      // interval(1000).pipe(
      //     withLatestFrom(expressionDetection$),
      //     switchMap( ([, detection]) => of(detection)),
      //     tap(r => console.warn({1: r})),
      //     tap(detection => this.printLandmarks(detection, canvasRef))
      // ).subscribe();

      expressionDetection$.pipe(
          tap(detection => this.printLandmarks(detection, canvasRef))
      ).subscribe()

      // Manage expression
      expressionDetection$.pipe(
          filter(detection => !!detection),
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
      videoRef.srcObject = null;
    },
    clearCanvas: function() {
      const canvas = this.$refs.canvas as HTMLCanvasElement;
      const context = canvas.getContext('2d');
      context?.clearRect(0, 0, canvas.width, canvas.height);
    },
    printLandmarks: async function(detection: DetectionResult, canvasRef: HTMLCanvasElement) {
      this.clearCanvas();
      if(detection) {
        draw.drawDetections(canvasRef, detection);
      }
    },
    expressionChanged(expression: FaceExpression) {
      this.$emit('expressionChanged', expression);
    }
  },
  emits: ['expressionChanged']
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.container {
  position: absolute;
  display: block;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
}

.video-container {
  position: absolute;
  bottom: 0;
  right: 0;
  border: 1px solid black;
  border-radius: 4px;
  overflow: hidden;
  z-index: 1000;
}

video, canvas {
  position: absolute;
  bottom: 0;
  right: 0;
  display: block;
}

.buttons {
  position: absolute;
  bottom: 0;
  left: 0;
  z-index: 1000;
}
</style>
