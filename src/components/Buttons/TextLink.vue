<template>
  <div class="flex flex-col items-center font-bold cursor-pointer link-icon sm:flex-row" :class="[disabledClass, uppercase ? 'uppercase': '']"
    @click="handleClick()">
    <svg-icon :class="[!!text ? 'mr-1' : '', `w-icon-${iconSize} h-icon-${iconSize}`]" v-if="icon" :icon="icon"></svg-icon>
    <div v-if="text" class="pb-05 text-label text-center">{{ text }}</div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'

@Component
export default class TextLink extends Vue {
  @Prop({ type: String, default: ''}) text!: string
  @Prop({ type: Object }) to!: any
  @Prop({ type: String, default: 'arrow-left'}) icon!: string
  @Prop({ type: Boolean, default: true}) uppercase!: boolean
  @Prop({ type: Boolean, default: false}) disabled!: boolean 
  
  disabledClass = this.disabled ? 'disabled' : ''

  get iconSize() {
    return !this.text.length ? 'large' : 'medium';
  }

  handleClick(e) {
    if (this.to) this.$router.push(this.to);
    this.$emit('click', e)
  }
}
</script>

<style scoped lang="scss">
  .link-icon {
    @apply text-blue-lagune;
    &:hover{
      @apply text-blue-lagune-darken;
    }
  }
</style>