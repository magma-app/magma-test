<template>
  <div>
    {{ cropedText }}
    <div v-if="cropedText.length !== text.length" class="inline-flex items-center has-tooltip text-body cursor-pointer">
        <tooltip :text="text"></tooltip>
        …
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'

@Component
export default class ContractedText extends Vue {
  @Prop({ type: String, default: ''}) text!: string
  @Prop({ type: Number, default: 20}) count!: number
  
  get cropedText() {
    return this.text.substr(0, this.count);
  }
}
</script>

<style scoped lang="scss">
</style>