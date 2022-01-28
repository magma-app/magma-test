<template>
  <div class="flex-1 flex flex-col relative pt-8" :class="[bgHeader]">
    <div class="px-page-mobile lg:px-10 max-w-6xl w-full mx-auto">
      <slot name="header"></slot>
    </div>
    <div class="flex-1" :class="[{'px-page-mobile lg:px-10': !noXPadding, 'pb-20': !noYPadding}, bgContent]">
      <div class="h-full w-full mx-auto" :class="[maxWidth]">
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'

@Component
export default class BackgroundSimple extends Vue {
  @Prop({ type: Boolean, default: false}) noYPadding!: boolean
  @Prop({ type: Boolean, default: false}) noXPadding!: boolean
  @Prop({ type: String, default: 'bg-pure-white'}) bgHeader!: string
  @Prop({ type: String, default: 'bg-white'}) bgContent!: string
  @Prop({ type: String, default: 'max-w-6xl'}) maxWidth!: string
}
</script>

<style scoped lang="scss">
</style>
