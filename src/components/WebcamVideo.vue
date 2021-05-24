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
import { detectAllFaces, TinyFaceDetectorOptions, draw } from 'face-api.js';

export default defineComponent({
  name: 'WebcamVideo',
  mounted: function() {
    FaceApiService.init();
    const videoRef = this.$refs.video as HTMLVideoElement;
    const canvasRef = this.$refs.canvas as HTMLCanvasElement;
    startVideo(videoRef);
    videoRef.addEventListener('play', function() {
      const interval = setInterval(async function() {
        const detections = await detectAllFaces(videoRef, new TinyFaceDetectorOptions()).withFaceLandmarks().withFaceDescriptors();

        if(detections?.length) {
          clearCanvas(canvasRef);
          draw.drawDetections(canvasRef, detections);
          console.log(detections[0]);
          //clearInterval(interval);
          return;
        }
      }, 100);
    });
  },
  methods: {}
});

const startVideo = (videoRef: HTMLVideoElement) => {
  navigator.getUserMedia(
      {
        video: {}
      },
      stream => videoRef.srcObject = stream,
      err => console.error(err)
  );
};

const clearCanvas = (canvas: HTMLCanvasElement) => {
  const context = canvas.getContext('2d');
  context?.clearRect(0, 0, canvas.width, canvas.height);
}

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
