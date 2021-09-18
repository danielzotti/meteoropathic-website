<template>
  <div class="meteo-container" :class="meteoClass"></div>
  <!-- This is a trick to fix a problem in mobile -->
  <div class="preload-images">
    <img src="/img/meteo/sunset.jpg" style="display:none;"/>
    <img src="/img/meteo/fearful.jpg" style="display:none;"/>
    <img src="/img/meteo/sun.jpg" style="display:none;"/>
    <img src="/img/meteo/cloudy.jpg" style="display:none;"/>
    <img src="/img/meteo/rain.jpg" style="display:none;"/>
    <img src="/img/meteo/storm.jpg" style="display:none;"/>
    <img src="/img/meteo/pollution.jpg" style="display:none;"/>
  </div>
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

  .preload-images {
    overflow: hidden;
    width: 0;
    height: 0;
    display: none;
    position: absolute;

    img {
      display: none;
    }
  }
}

</style>
