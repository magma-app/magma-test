<template>
  <div class="close-icon-container flex justify-center items-center cursor-pointer p-3" @click="close">
    <svg-icon icon="close" color="currentColor"></svg-icon>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component
export default class CloseIcon extends Vue {
  close(e) {
    this.$emit('close', e)
  }
}
</script>

<style scoped lang="scss">
  .close-icon-container {
    opacity: 0.6;
    $size: 40px; // The div is larger thant the icon so the user has more room to click it
    height: $size;
    width: $size;
    @apply text-pure-white;
    &:hover {
      opacity: 1;
    }
  }
</style>