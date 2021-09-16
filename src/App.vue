<template>
  <WebcamVideo @expressionChanged="onFaceExpressionChange"/>
  <Meteo :meteo-class="meteoClass"/>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import WebcamVideo from './components/WebcamVideo.vue';
import Meteo from './components/meteo/Meteo.vue';
import { FaceExpression } from '@/services/FaceApiService';

export default defineComponent({
  name: 'App',
  components: {
    WebcamVideo,
    Meteo
  },
  data() {
    return {
      meteoClass: 'variable'
    };
  },
  methods: {
    onFaceExpressionChange(expression: FaceExpression) {
      console.debug({ expressionInApp: expression });
      switch(expression) {
        case 'happy':
          this.meteoClass = 'sun';
          break;
        case 'angry':
          this.meteoClass = 'storm';
          break;
        case 'sad':
          this.meteoClass = 'rain';
          break;
        default:
          this.meteoClass = 'variable';
      }
    }
  },
  computed: {}
});
</script>

<style lang="scss">
html, body {
  margin: 0;
  padding: 0;
  height: 100vh;
  width: 100vw;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
}
*, *:before, *:after {
  box-sizing: border-box;
}
</style>
