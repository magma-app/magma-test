<template>
    <div class="relative background-desktop px-page-mobile lg:px-10" style="min-height: 500px;" :class="[bg, noYPadding ? '' : 'pt-8 pb-20']">
    <!-- <div v-if="$mq === 'lg'">
      <img class="left-0 plant-left-1 absolute" v-if="!hidePlantTopLeft" src="@/assets/images/plant-4.png" width="200rem" height="auto" />
      <img class="right-0 plant-right-1 absolute" src="@/assets/images/plant-3.png" width="150" height="auto" />
    </div>
        <img class="left-0 plant-left-2 absolute" src="@/assets/images/plant-green.png" />
        <img class="right-0 plant-right-2 absolute" src="@/assets/images/plant-orange-up.png" /> -->
    <slot></slot>
</div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'

@Component
export default class BackgroundTopoPlants extends Vue {
  @Prop({ type: String, default: 'bg-light-gray'}) bg!: string
  @Prop({ type: Boolean, default: false}) noYPadding!: boolean
  @Prop({ type: Boolean, default: false}) hidePlantTopLeft!: boolean
}
</script>

<style scoped lang="scss">
  .background-desktop {
    $gray: 240;
    background: linear-gradient(
      to bottom right,
      rgba($gray, $gray, $gray, 20%),
      rgba($gray, $gray, $gray, 100),
      rgba($gray, $gray, $gray, 100)
    ),url('~@/assets/svg/map-terrain.svg');

    &.white-bg {
      $white: 255;
      background: linear-gradient(
        to bottom right,
        rgba($white, $white, $white, 20%),
        rgba($white, $white, $white, 100),
        rgba($white, $white, $white, 100)
      ),url('~@/assets/svg/map-terrain.svg');
    }
  }
  .plant-left-1 {
    top: 10%;
  }
  .plant-left-2 {
    width: 20vw !important;
    bottom: 0px;
  }
  .plant-right-1 {
    top: 20%;
  }
  .plant-right-2 {
    width: 15vw !important;
    bottom: 0px;
  }
</style>
