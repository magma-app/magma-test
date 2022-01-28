<template>
  <div class="flex items-center justify-center button-main cursor-pointer font-extrabold"
    :class="[
      scopedSizeClass,
      scopedTypeClass,
      disabled ? 'disabled' : '',
      shadow ? 'shadow-md': '',
      forceHover ? 'hover': '',
      fullWidthMobile ? '' : 'w-max',
      plain ? 'plain' : '',
      rowReverse ? 'flex-row-reverse' : '',
      `rounded-${rounded}`
    ]"
    @click="buttonClicked" @mousedown="$emit('mousedown')">
      <svg-icon class="icon" v-if="icon" :icon="icon" :class="[iconSize, !text ? '' : (rowReverse ? 'ml-2' : 'mr-2')]"></svg-icon>
      <span v-if="text" class="text-center" :class="[!points ? '' : (rowReverse ? 'ml-2' : 'mr-2')]">{{ text }}</span>
      <span v-if="points" class="text-lg font-bold">{{ points }}</span>
      <svg-icon class="icon ml-1" v-if="points" icon="reward-circle"></svg-icon>
  </div>
</template>

<script lang="ts">
export type ButtonSize = "extra-large" | "large" | "medium" | "small" | "round"
export type ButtonType = "primary" | "secondary" | "black-forest" | "outline"
export type IconSize = "large" | "medium" | "small"
export type RoundedType = "large" | "medium" | "small" | "full"

import { Component, Vue, Prop } from 'vue-property-decorator'
import { openNewTab } from '../../helpers/Navigation.helper'

@Component
export default class ButtonMain extends Vue {
  @Prop({ type: Number, default: 0}) points!: number
  @Prop({ type: [String, Number], default: ''}) text!: string | number
  @Prop({ type: String, default: 'medium'}) size!: ButtonSize
  @Prop({ type: String, default: 'medium'}) iconSize!: IconSize
  @Prop({ type: String, default: 'primary'}) type!: ButtonType
  @Prop({ type: String, default: 'small'}) rounded!: RoundedType
  @Prop({ type: String, default: null}) icon!: string
  @Prop({ type: [String, Object], default: null}) to!: string | any // String or Object
  @Prop({ type: Boolean, default: false}) disabled!: boolean
  @Prop({ type: Boolean, default: false}) shadow!: boolean
  // There are usecases where the hover has to be triggered from the parent (see Design system)
  @Prop({ type: Boolean, default: false}) forceHover!: boolean
  @Prop({ type: Boolean, default: false}) fullWidthMobile!: boolean
  @Prop({ type: Boolean, default: false}) targetBlank!: boolean
  @Prop({ type: Boolean, default: false}) plain!: boolean
  @Prop({ type: Boolean, default: false}) rowReverse!: boolean

  buttonClicked(e) {
    if (this.to && this.targetBlank) {
      openNewTab(this.to)
    }
    else if (this.to) {
      return this.$router.push({ name: this.to })
    }
    else this.$emit('click', e)
  }
  get scopedTypeClass() {
      return `${this.type}-button-main`
  }
  get scopedSizeClass() {
      return `${this.size}-button-main`
  }
}
</script>

<style scoped lang="scss">
  .icon{
    &.small {
      @apply w-icon-small;
      @apply h-icon-small;
    }
    &.medium {
      @apply w-icon-medium;
      @apply h-icon-medium;
    }
    &.large {
      @apply w-icon-large;
      @apply h-icon-large;
    }
  }

  // Sizes
  .extra-large-button-main {
    @apply p-btn-extra-large;
    @apply text-headline-4;
  }
  .large-button-main {
    @apply text-link;
    @apply p-btn-large;
  }
  .medium-button-main {
    @apply text-link;
    @apply p-btn-medium;
  }
  .small-button-main {
    @apply text-link;
    @apply p-btn-small;
  }
  .round-button-main {
    @apply text-link;
    @apply p-btn-round;
  }

  // Types
  .primary-button-main {
    @apply bg-orange-lava;
    @apply text-white;
    &:hover, &.hover{
      @apply bg-orange-lava-darken;
    }

    &.plain {
      @apply bg-orange-lava-washed-out;
      @apply text-orange-lava;
    }
  }

  .secondary-button-main {
    @apply bg-blue-sky;
    @apply text-blue-lagune;
    &:hover, &.hover{
      @apply bg-blue-sky-darken;
    }

    &.plain {
      @apply bg-blue-sky;
      @apply text-blue-lagune;
    }
  }

  .green-grass-button-main {
    @apply bg-green-grass;
    @apply text-green;
    &:hover, &.hover{
      @apply bg-green-grass-darken;
    }

    &.plain {
      @apply bg-green-grass;
      @apply text-green;
    }
  }

  .black-forest-button-main {
    @apply bg-black-forest;
    @apply text-white;
  }

  .blue-lagune-button-main {
    @apply bg-blue-lagune;
    @apply text-white;
    &:hover, &.hover{
      @apply bg-blue-lagune-darken;
    }
  }

  .outline-button-main {
    @apply bg-transparent;
    @apply border-2;
  }

</style>
