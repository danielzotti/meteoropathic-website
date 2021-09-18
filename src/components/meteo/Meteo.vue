<template>
  <div class="meteo-container" :class="meteoClass"></div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'Meteo',
  props: {
    meteoClass: String
  }
});
</script>

<style lang="scss" scoped>
.meteo-container {
  display: flex;
  justify-content: center;
  align-items: center;

  position: absolute;
  height: 100%;
  width: 100%;
  overflow: hidden;
  background-size: cover;
  background-position: center;
  transition: background-image 0.5s ease-in-out;

  &.sunset {
    background-image: url('/img/meteo/sunset.jpg')
  }

  &.fearful {
    background-image: url('/img/meteo/fearful.jpg')
  }

  &.sun {
    background-image: url('/img/meteo/sun.jpg')
  }

  &.cloudy {
    background-image: url('/img/meteo/cloudy.jpg')
  }

  &.rain {
    background-image: url('/img/meteo/rain.jpg')
  }

  &.storm {
    background-image: url('/img/meteo/storm.jpg')
  }

  &.pollution {
    background-image: url('/img/meteo/pollution.jpg')
  }
}

</style>
