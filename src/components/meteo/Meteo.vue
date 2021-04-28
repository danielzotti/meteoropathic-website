<template>
  <div class="meteo-container" :class="meteoClass">
    <Cloud :seed="8517" :top="10" :left="10"></Cloud>
<!--    <Cloud :seed="1234" :top="50" :left="50"></Cloud>-->
<!--    <Cloud :seed="100" :top="80" :left="70"></Cloud>-->
  </div>

</template>

<script>
import Cloud from '@/components/meteo/Cloud';

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
