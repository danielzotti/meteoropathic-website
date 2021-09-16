<template>
  <div class="cloud-container" :style="{ backgroundColor: 'darkred', top: `${top}%`, left: `${left}%`}">
    <div class="cloud" id="cloud-base"></div>
    <div class="cloud" id="cloud-back"></div>
    <div class="cloud" id="cloud-mid"></div>
    <div class="cloud" id="cloud-front"></div>
    <svg width="0" height="0">
      <!--Top Layer-->
      <filter id="filter-base">
        <feTurbulence type="fractalNoise" baseFrequency="0.011" numOctaves="5"
                      :seed="seed"/>
        <feDisplacementMap in="SourceGraphic" scale="100"/>
      </filter>
      <filter id="filter-back">
        <feTurbulence type="fractalNoise" baseFrequency="0.011" numOctaves="3"
                      :seed="seed"/>
        <feDisplacementMap in="SourceGraphic" scale="100"/>
      </filter>
      <filter id="filter-mid">
        <feTurbulence type="fractalNoise" baseFrequency="0.011" numOctaves="3"
                      :seed="seed"/>
        <feDisplacementMap in="SourceGraphic" scale="100"/>
      </filter>
      <filter id="filter-front">
        <feTurbulence type="fractalNoise" baseFrequency="0.009" numOctaves="4" :seed="seed"/>
        <feDisplacementMap in="SourceGraphic" scale="50"/>
      </filter>
    </svg>
  </div>

</template>

<script lang="ts">
export default {
  name: 'Cloud',
  props: {
    seed: Number,
    top: Number,
    left: Number
  }
};
</script>

<style lang="scss" scoped>
@mixin cloud($width:600px,$height:100px) {
  --width: $width;
  --height: $height;

  position: absolute;
  width: $width;
  height: $height;

  .cloud {
    //width: 600px;
    //height: 100px;
    width: 100%;
    height: 100%;
    border-radius: 50%;
    position: absolute;
    //top: -100px;
    //left: -100px;
    top: -100%;
    left: calc(#{$width} / -6);
    //left: calc(var(--width) / -6);
  }

  #cloud-base {
    //top: 90px;
    top: 0;
    //height: 100px;
    height: 100%;
    filter: url(#filter-base);
    //box-shadow: 200px 170px 19px 40px rgba(255, 255, 255, 0.9);
    box-shadow: calc(#{$width} / 3) calc(#{$width} / 3.53) calc(#{$width} / 31.6) calc(#{$width} / 15) rgba(255, 255, 255, 0.9);

  }
  #cloud-back {
    //top: 90px;
    top: 0;
    //height: 30px;
    height: 30%;
    //width: 500px;
    width: calc(#{$width} / 1.2);
    filter: url(#filter-back);
    //box-shadow: 200px 200px 10px 40px rgba(215, 215, 215, 0.3);
    box-shadow: calc(#{$width} / 3) calc(#{$width} / 3) calc(#{$width} / 60) calc(#{$width} / 15) rgba(215, 215, 215, 0.3);
  }

  #cloud-mid {
    //top: 80px;
    top: 10%;
    //width: 580px;
    width: calc(#{$width} / 1.04);
    //height: 35px;
    height: 35%;
    filter: url(#filter-mid);
    box-shadow: 210px 250px 28px 30px rgba(66, 105, 146, 0.2);
  }

  #cloud-front {
    //top: 70px;
    top: 20%;
    //width: 450px;
    width: calc(#{$width} / 1.33);
    //height: 40px;
    height: 40%;
    //left: -20px;
    left: calc(-#{$width} / 30);
    filter: url(#filter-front);
    box-shadow: 210px 272px 30px 0 rgba(0, 0, 0, 0.4);
  }
}

.cloud-container {
  @include cloud($width: 600px, $height: 100px);
}

//.cloud {
//  width: 600px;
//  height: 100px;
//  border-radius: 50%;
//  position: absolute;
//  top: -100px;
//  left: -100px;
//}
//
//#cloud-base {
//  top: 90px;
//  height: 100px;
//  filter: url(#filter-base);
//  box-shadow: 200px 170px 19px 40px rgba(255, 255, 255, 0.9);
//}
//#cloud-back {
//  top: 90px;
//  height: 30px;
//  width: 500px;
//  filter: url(#filter-back);
//  box-shadow: 200px 200px 10px 40px rgba(215, 215, 215, 0.3);
//}
//
//#cloud-mid {
//  top: 80px;
//  width: 580px;
//  height: 35px;
//  filter: url(#filter-mid);
//  box-shadow: 210px 250px 28px 30px rgba(66, 105, 146, 0.2);
//}
//
//#cloud-front {
//  top: 70px;
//  width: 450px;
//  height: 40px;
//  left: -20px;
//  filter: url(#filter-front);
//  box-shadow: 210px 272px 30px 0px rgba(0, 0, 0, 0.4);
//}

</style>
