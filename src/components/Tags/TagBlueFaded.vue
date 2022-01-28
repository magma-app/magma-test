<template >
  <div class="blue-tag-faded" :class="wMax ? 'w-max' : ''">
      <svg-icon class="mr-2" v-if="icon" :icon="icon"></svg-icon>
      <div class="text-body text-blue-lague">{{ text }}</div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'

@Component
export default class TagBlueFaded extends Vue {
  @Prop({ type: String, default: ''}) icon!: string
  @Prop({ type: String, default: ''}) text!: string
  @Prop({ type: Boolean, default: true}) wMax!: boolean
  
}
</script>

<style scoped lang="scss">
  .blue-tag-faded {
    @apply flex;
    @apply rounded-medium;
    @apply items-center;
    @apply bg-blue-washed;
    @apply px-3;
    @apply py-2;
    @apply justify-center;
  }
</style>