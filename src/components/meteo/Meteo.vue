<template>
  <div class="meteo-container" :class="meteoClass">
    <h1>{{ meteoClass }}</h1>
    <Cloud :seed="8517" :top="10" :left="10"></Cloud>
    <!--    <Cloud :seed="1234" :top="50" :left="50"></Cloud>-->
    <!--    <Cloud :seed="100" :top="80" :left="70"></Cloud>-->
  </div>

</template>

<script lang="ts">
import Cloud from './Cloud.vue';

export type MeteoClass = 'variable' | 'sun' | 'cloudy' | 'rain' | 'storm';

export default {
  name: 'Meteo',
  components: { Cloud },
  props: {
    meteoClass: String
  }
};
</script>

<style lang="scss" scoped>
.meteo-container {
  position: absolute;
  height: 100%;
  width: 100%;
  overflow: hidden;

  h1 {
    text-align: center;
    margin: 0;
  }

  &.variable {
    background-color: white;
  }
  &.sun {
    background-color: yellow;
  }

  &.cloudy {
    background-color: lightgray;
  }

  &.rain {
    background-color: gray;
  }

  &.storm {
    // background-color: black;
    background-color: red;
  }
}

</style>
