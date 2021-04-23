<template>
  <video ref="video"
         width="720"
         height="560"
         autoplay
         muted
  ></video>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import FaceApiService from '@/services/FaceApiService';
import { detectAllFaces, TinyFaceDetectorOptions } from 'face-api.js';

export default defineComponent({
  name: 'WebcamVideo',
  mounted: function() {
    // FaceApiService.init();
    const videoRef = this.$refs.video as HTMLVideoElement;
    startVideo(videoRef);
    videoRef.addEventListener('play', function() {
      setInterval(async function() {
        const detections = await detectAllFaces(videoRef, new TinyFaceDetectorOptions()).withFaceLandmarks().withFaceExpressions();
        console.log(detections);
      }, 1000);
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

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">

</style>
