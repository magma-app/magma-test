<template>
  <div class="tooltip rounded-medium shadow-md bg-pure-white p-4 mb-3 text-blue-lagune w-80">{{text}}</div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'

@Component
export default class Tooltip extends Vue {
  @Prop({ type: String, default: ''}) text!: string
}
</script>

<style scoped lang="scss">
  .tooltip {
    margin-right: 20px;
  }
</style>