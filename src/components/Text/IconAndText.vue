<template>
  <div class="flex items-center">
    <svg-icon v-if="iconName" class="text-blue-lagune mr-1 self-start mt-5px h-4 w-4 flex-shrink-0" :icon="iconName" :color="textColor"></svg-icon>
    <contracted-text class="text-body" ref="text" :class="[`text-${textColor}`]" :text="text" :count="count"/>
</div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'

@Component
export default class IconAndText extends Vue {
  @Prop({ type: String, default: ''}) iconName!: string
  @Prop({ type: String, default: ''}) text!: string
  @Prop({ type: Number, default: 48}) count!: number
  @Prop({ type: String, default: 'black-forest'}) textColor!: string
}
</script>

<style scoped lang="scss">
  .mt-5px {
    margin-top: 5px !important;
  }
</style>