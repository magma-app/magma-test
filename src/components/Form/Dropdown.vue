<template>
  <div v-click-outside="() => open = false" :class="[disabled ? 'text-gray' : 'text-dark-gray', bgColor === 'bg-white' ? 'white' : '']" class="relative inline-block text-left w-full large-input">
    <div @click="open = !disabled ? !open : false">
      <button
        :disabled="disabled"
        type="button"
        :class="[error ? 'border-red-400' : 'border-gray-300']"
        class="dropdown inline-flex items-center w-full border shadow-sm px-4 py-2 text-sm font-medium focus:outline-none"
        id="menu-button"
        aria-expanded="true"
        aria-haspopup="true"
      >
      <i v-if="icon" :class="`mdi-${icon}`" class="mdi mdi-24px"></i>
      <span :class="{'ml-4': icon}" class="flex-1 text-left text-base">{{ value ? valueText : placeholder }}</span>
      <svg class="-mr-1 ml-2 h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
          <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd" />
      </svg>
      </button>
    </div>

    <div v-if="error" class="mt-1 text-xs text-red-400">{{ error }}</div>

    <transition
      enter-class="transform opacity-0 scale-y-0"
      enter-active-class="transition ease-out duration-100"
      enter-to-class="transform opacity-100 scale-y-100"
      leave-class="transform opacity-100 scale-y-100"
      leave-active-class="transition ease-in duration-75"
      leave-to-class="transform opacity-0 scale-y-0"
    >
      <div v-if="open" :class="[bgColor]" class="max-h-20r overflow-y-auto origin-top-right absolute right-0 -mt-4 pt-4 w-full shadow-lg px-4 rounded-xl border-transparent z-10" role="menu" aria-orientation="vertical" aria-labelledby="menu-button" tabindex="-1">
        <div class="py-1" role="none">
          <div class="w-1/2 mx-auto border-b border-dark-gray"></div>
        <!-- Active: "bg-gray-100 text-gray-900", Not Active: "text-gray-700" -->
        <div v-for="(option, i) in options" :key="`opt-${option.label}`" class="px-4 py-2 text-sm cursor-pointer" role="menuitem" tabindex="-1" :id="`menu-item-${i}`" @click.stop.prevent="changeTo(option)">{{ option.label }}</div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'

export type DropdownOption = {
  label: string;
  value: string;
}

@Component
export default class Dropdown extends Vue {
  @Prop({ type: Array, default: () => []}) options!: DropdownOption[]
  @Prop({ type: String, default: null}) icon!: string
  @Prop({ type: Boolean, default: false}) disabled!: boolean
  @Prop({ type: String, default: null}) error!: string
  @Prop({ type: String, default: null}) placeholder!: string
  @Prop({ type: String, default: null}) color!: string
  @Prop({ type: [String, Number], default: undefined}) value!: string|number

  open = false

  get valueText() {
    const o = this.options.find(o => o.value === this.value)
    return o ? o.label : this.placeholder
  }

  get bgColor() {
    return this.color ? this.color : 'bg-light-gray'
  }

  changeTo(option: DropdownOption) {
    this.open = false
    this.$emit('change', option)
    this.$emit('input', option.value)
  }
}
</script>