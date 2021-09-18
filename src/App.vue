<template>
  <WebcamVideo
      :show-buttons="false"
      :show-landmarks="false"
      :show-video="true"
      :maxVideoWidth="300"
      :maxVideoHeight="300"
      :percentage-threshold="0.9"
      @expressionChanged="onFaceExpressionChange"/>
  <Meteo :meteo-class="meteoClass"/>
  <div class="expression">{{ expression }}</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import WebcamVideo from './components/WebcamVideo.vue';
import Meteo from './components/meteo/Meteo.vue';
import { MeteoClass } from '@/models/meteo.models';
import { FaceExpressions, FaceExpressionResult } from '@/models/face-api.models';

export default defineComponent({
  name: 'App',
  components: {
    WebcamVideo,
    Meteo
  },
  data() {
    return {
      meteoClass: 'cloudy' as MeteoClass,
      expression: 'neutral' as FaceExpressions,
      percentage: 0,
    };
  },
  methods: {
    onFaceExpressionChange(expression: FaceExpressionResult) {
      console.debug(expression);
      if(!expression) {
        return;
      }

      this.expression = expression.name;
      this.percentage = expression.percentage;

      switch(expression.name) {
        case 'happy':
          this.meteoClass = 'sun';
          break;
        case 'angry':
          this.meteoClass = 'storm';
          break;
        case 'sad':
          this.meteoClass = 'rain';
          break;
        case 'disgusted':
          this.meteoClass = 'pollution';
          break;
        case 'surprised':
          this.meteoClass = 'sunset';
          break;
        case 'fearful':
          this.meteoClass = 'fearful';
          break;
        case 'neutral':
        default:
          this.meteoClass = 'cloudy';
      }
    }
  },
  computed: {}
});
</script>

<style lang="scss">
@import url('https://fonts.googleapis.com/css2?family=Italianno&display=swap');

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
  font-family: Italianno, sans-serif;
  background-color: black;
}

*, *:before, *:after {
  box-sizing: border-box;
}

.expression {
  font-weight: bold;
  text-shadow: 0.5vw 0.5vw 0.5vw black,
  0.1vw 0.5vw 0.5vw black,
  -0.2vw 0.7vw 0.5vw black;
  color: white;
  text-transform: capitalize;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 20vw;
  @media(min-width: 600px) {
    font-size: 10vw;
  }
}
</style>
