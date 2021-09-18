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
      <button @click="toggleShowButtons">⚙</button>
      <span v-if="isButtonsVisible">
        <button @click="togglePlayVideo">{{ isPlaying ? 'stop' : 'play' }} video</button>
        <button @click="toggleShowVideo">{{ isVideoVisible ? 'hide' : 'show' }} video</button>
        <button @click="toggleShowLandmarks">{{ isLandmarksVisible ? 'hide' : 'show' }} landmarks</button>
        <span class="percentage">{{ expression?.percentage?.toFixed(2) || 0 }}%</span>
      </span>
    </div>
  </div>

</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { draw } from 'face-api.js';
import FaceApiService from '@/services/FaceApiService';
import { debounceTime, distinctUntilChanged, filter, map, tap } from 'rxjs/operators';
import { DetectionResult, FaceExpressionResult } from '@/models/face-api.models';


export default defineComponent({
  name: 'WebcamVideo',
  data() {
    return {
      isButtonsVisible: this.showButtons,
      isVideoVisible: this.showVideo,
      isLandmarksVisible: this.showLandmarks,
      isPlaying: true,
      width: this.maxVideoWidth,
      height: this.maxVideoHeight,
      expression: null as FaceExpressionResult | null
    };
  },
  props: {
    maxVideoWidth: { type: Number, default: 600 },
    maxVideoHeight: { type: Number, default: 600 },
    showVideo: {
      type: Boolean,
      default: true
    },
    showButtons: {
      type: Boolean,
      default: false
    },
    showLandmarks: {
      type: Boolean,
      default: false
    }
  },
  mounted: async function() {
    await this.play();
  },
  computed: {
    styleObject(): { width: string, height: string, opacity: string } {
      return {
        width: `${ this.width }px`,
        height: `${ this.height }px`,
        opacity: this.isVideoVisible ? '1' : '0'
      };
    }
  },
  methods: {
    togglePlayVideo: function() {
      this.isPlaying ? this.stop() : this.play();
    },
    toggleShowButtons: function() {
      this.isButtonsVisible = !this.isButtonsVisible;
    },
    toggleShowVideo: function() {
      this.isVideoVisible = !this.isVideoVisible;
    },
    toggleShowLandmarks: function() {
      this.isLandmarksVisible = !this.isLandmarksVisible;
      if(!this.isLandmarksVisible) {
        this.clearCanvas();
      }
    },
    play: async function() {
      console.debug('Start playing...');
      this.isPlaying = true;
      const videoRef = this.$refs.video as HTMLVideoElement;
      const canvasRef = this.$refs.canvas as HTMLCanvasElement;
      await FaceApiService.init();

      videoRef.srcObject = await FaceApiService.getVideo({
        maxWidth: this.maxVideoWidth,
        maxHeight: this.maxVideoHeight
      });

      const videoSettings = videoRef.srcObject?.getVideoTracks()[0]?.getSettings();

      this.width = videoSettings?.width || this.maxVideoWidth;
      this.height = videoSettings?.height || this.maxVideoHeight;

      const refreshMs = 200;
      const debounceMs = 350;

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
          filter(() => !!this.isLandmarksVisible),
          tap(detection => this.printLandmarks(detection, canvasRef))
      ).subscribe();


      // Manage expression
      expressionDetection$.pipe(
          filter(detection => !!detection),
          map(detection => FaceApiService.getExpression(detection)),
          distinctUntilChanged((previous: FaceExpressionResult, current: FaceExpressionResult) => previous.name === current.name),
          debounceTime(debounceMs),
      ).subscribe(expression => this.expressionChanged(expression));
      console.debug('Started');
    },
    stop: async function() {
      console.debug('stop');
      const videoRef = this.$refs.video as HTMLVideoElement;
      videoRef.srcObject = null;
      this.isPlaying = false;
    },
    clearCanvas: function() {
      const canvas = this.$refs.canvas as HTMLCanvasElement;
      const context = canvas?.getContext('2d');
      context?.clearRect(0, 0, canvas?.width, canvas?.height);
    },
    printLandmarks: async function(detection: DetectionResult, canvasRef: HTMLCanvasElement) {
      this.clearCanvas();
      if(detection) {
        draw.drawDetections(canvasRef, detection);
      }
    },
    expressionChanged(expression: FaceExpressionResult) {
      this.expression = expression;
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
  z-index: 1000;
  //border: 1px solid black;
  //border-radius: 4px;
  //overflow: hidden;
  //background-color: #444;
  //display: flex;
  //justify-content: center;
  //align-items: center;
  //
  //&:before {
  //  content: 'video stopped';
  //  display: inline-block;
  //  margin: auto;
  //}
}

video, canvas {
  position: absolute;
  bottom: 0;
  right: 0;
  display: block;
}

.buttons {
  position: absolute;
  top: 0;
  left: 0;
  z-index: 1000;
  vertical-align: middle;

  button,
  .percentage {
    display: inline-block;
    background-color: white;
    border: 1px solid black;
    border-radius: 3px;
    padding: 3px 5px;
    line-height: 1;
    font-size: 12px;
    font-family: sans-serif;
  }
}

</style>
