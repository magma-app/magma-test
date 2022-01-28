<template>
  <div class="tag-main text-body rounded-medium p-tag-medium w-max" :class="[scopedTypeClass, pointer? 'cursor-pointer' :'']" @click="$emit('click')">
    <div class="no-wrap-elipsis">
        <svg-icon class="mr-2 h-icon-large w-icon-large" v-if="icon" :icon="icon"></svg-icon>
        <span class="whitespace-nowrap inline-flex leading-none">{{ tag }}</span>
        <span v-if="closable" class="ml-2 text-xl">&times;</span>
    </div>
</div>
</template>

<script lang="ts">
export type TagType = "lagune" | "grass" | "orange"

import { Component, Vue, Prop } from 'vue-property-decorator'

@Component
export default class TagMain extends Vue {
  @Prop({ type: String, default: ''}) tag!: string
  @Prop({ type: String, default: 'grass'}) type!: TagType
  @Prop({ type: String, default: null}) icon!: string
  @Prop({ type: Boolean, default: false}) pointer!: boolean
  @Prop({ type: Boolean, default: false}) closable!: boolean

    get scopedTypeClass() {
      return `${this.type}-tag-main`
    }
}
</script>

<style scoped lang="scss">
  .lagune-tag-main {
    @apply bg-blue-lagune-washed-out;
    @apply text-blue-lagune;
  }
  .grass-tag-main {
    @apply bg-green-grass-washed-out;
    @apply text-blue-lagune;
  }
  .orange-tag-main {
    @apply bg-orange-lava-washed-out;
    @apply text-orange-lava;
  } 
</style>