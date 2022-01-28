<template>
  <div>
    <div class="flex-1 relative text-dark-gray boomerang-input" :class="color">
      <div v-if="icon" class="flex absolute top-4 left-3 z-2 h-full">
          <svg-icon class="ml-1 w-6 h-6" :icon="icon"></svg-icon>
      </div>
      <input :class="{error, 'pl-12': icon}" class="input" @input="onChange" v-bind="$attrs"/>
    </div>
    <div v-if="error" class="ml-1 mt-1 text-xs text-red-400">{{ error }}</div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'

@Component
export default class Input extends Vue {
  @Prop({ type: String, default: null}) icon!: string
  @Prop({ type: Boolean, default: false}) disabled!: boolean
  @Prop({ type: String, default: null}) error!: string
  @Prop({ type: String, default: null}) color!: string

  onChange(e) {
    this.$emit('change', e.target.value)
    this.$emit('input', e.target.value)
  }
}
</script>

<style lang="scss" scoped>
.error {
  @apply border border-red-400;
}

</style>