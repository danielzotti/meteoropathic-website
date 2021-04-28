<template>
  <!--  <WebcamVideo/>-->
  <Meteo meteo-class="storm"/>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
// import WebcamVideo from './components/WebcamVideo.vue';
import Meteo from './components/meteo/Meteo.vue';

export default defineComponent({
  name: 'App',
  components: {
    // WebcamVideo,
    Meteo
  }
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
</style>
