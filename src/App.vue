<template>
  <WebcamVideo/>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import WebcamVideo from './components/WebcamVideo.vue';

export default defineComponent({
  name: 'App',
  components: {
    WebcamVideo
  }
});
</script>

<style lang="scss">
html, body {
  margin: 0;
  padding: 0;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
