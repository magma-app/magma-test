<template>
  <div v-click-outside="close" @click="isFocused = true" class="large-input relative z-20">
    <div :class="[bgColor, {error, 'border-black-forest': isFocused}]" class="flex flex-1 w-full relative text-black-forest dropdown overflow-hidden my--hover">
      <div>
        <div v-if="icon" class="flex absolute top-4 left-2 z-2 text-dark-gray">
            <svg-icon class="ml-1 w-6 h-6" :icon="icon"></svg-icon>
        </div>
        <button @click="open" :class="[{'pl-6 md:pl-8': icon}]" class="flex items-center border-r border-dark-gray pr-2 md:pr-3 my-4">
          <div :class="[countryCodePlaceholderColor]" class="flex-1 mr-1 md:mr-2 whitespace-nowrap">{{ countryCodePlaceholder }}</div>
          <svg-icon class="w-2 h-2" icon="chevron-down"/>
        </button>
      </div>
      <input :class="bgColor" class="flex-1 outline-none h-5/6 self-center pr-0 pl-4" :placeholder="computedPlaceholder" v-model="input" @input="onChange" />
    </div>
    <div v-if="error" class="ml-1 mt-1 text-xs text-red-400">{{ error }}</div>

    <transition
      enter-class="transform opacity-0 scale-y-0"
      enter-active-class="transition ease-out duration-100"
      enter-to-class="transform opacity-100 scale-y-100"
      leave-class="transform opacity-100 scale-y-100"
      leave-active-class="transition ease-in duration-75"
      leave-to-class="transform opacity-0 scale-y-0"
    >
    <div v-if="isOpen" class="my-2 pb-4 absolute w-full border-transparent z-10">
      <div class="py-2 bg-white w-full shadow-lg px-4 rounded-xl">
        <div class="relative py-2">
          <div class="flex absolute top-3 left-3 z-2 h-full text-dark-gray">
              <svg-icon class="ml-1 w-4 h-4 stroke-0" icon="search"></svg-icon>
          </div>
          <input class="ml-7 outline-none bg-white h-6" type="tel" ref="search" v-model="search" :placeholder="'Search'"/>
        </div>
        <div class="text-black-forest max-h-7r overflow-y-auto origin-top-right right-0" role="menu" aria-orientation="vertical" aria-labelledby="menu-button" tabindex="-1">
          <div class="py-1" role="none">
          <div v-for="(option, i) in countryCodes" :key="`opt-${option.name}`" class="px-4 py-2 text-sm cursor-pointer" role="menuitem" tabindex="-1" :id="`menu-item-${i}`" @click.stop.prevent="changeTo(option)">{{ option.name }} +{{ option.dialCode }}</div>
          </div>
        </div>
      </div>
    </div>
    </transition>

    <!-- <div v-if="phoneNumber">
      <div>Country: {{ phoneNumber.country }}</div>
      <div>Number: {{ phoneNumber.number }}</div>
      <div>Valid: {{ phoneNumber.isValid() ? 'true' : 'false' }}</div>
      <div>Possible: {{ phoneNumber.isPossible() ? 'true' : 'false' }}</div>
      <div>National: {{ phoneNumber.formatNational() }}</div>
      <div>International: {{ phoneNumber.formatInternational() }}</div>
    </div> -->
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator'
import { countryCodes, CountryCode, getCountryCodeFromDialCode } from '@/utils/countrycodes'
import parsePhoneNumber, { CountryCode as LibCountryCode, AsYouType, PhoneNumber as LibPhoneNumber } from 'libphonenumber-js'

@Component
export default class PhoneNumber extends Vue {
  @Prop({ type: String, default: null}) placeholder!: string
  @Prop({ type: String, default: 'phone'}) icon!: string
  @Prop({ type: Boolean, default: false}) disabled!: boolean
  @Prop({ type: String, default: null}) error!: string
  @Prop({ type: String, default: null}) value!: string
  @Prop({ type: String, default: 'bg-light-gray'}) bgColor!: string

  currentCountryCode: CountryCode = { code: "FR", dialCode: "33", name: "France" }
  isOpen = false
  isFocused = false
  search = ''
  input = ''
  phoneNumber: LibPhoneNumber = null

  open() {
    this.isOpen = !this.disabled ? !this.isOpen : false
  }

  close() {
    this.isOpen = false
    this.isFocused = false
  }

  mounted() {
    this.input = this.value || ''
    this.reformatInput();
  }

  @Watch('isOpen')
  onIsOpenChanged(isOpen) {
    setTimeout(() => {
      const search = this.$refs.search as HTMLInputElement;
      isOpen && search && search.focus();
    })
  }

  @Watch('value')
  onValueChanged(value) {
    if (value) {
      this.input = value
      this.reformatInput()
    }
  }

  onChange() {
    this.reformatInput()
  }

  reformatInput() {
    this.formatInput(this.currentCountryCode ? this.currentCountryCode.code as LibCountryCode : undefined)
  }

  formatInput(code?: LibCountryCode) {
    this.phoneNumber = parsePhoneNumber(this.rawInput, code)
    if (this.validatePhoneNumber()) {
      const countryCallingCode = this.phoneNumber.countryCallingCode
      this.input = new AsYouType(this.currentCountryCode.code as LibCountryCode)
      .input(this.rawInput)
      .replace(new RegExp(`^(\\+${countryCallingCode} ?)|^0`), '(0) ')
      this.$emit('isValid', true);
    } else {
      this.$emit('isValid', false);
    }
    this.$emit('input', this.phoneNumber ? this.phoneNumber.number : null)
  }

  validatePhoneNumber() {
    if (!this.phoneNumber) {
      return false
    }

    const countryCode = getCountryCodeFromDialCode(this.phoneNumber.countryCallingCode as string)
    if (countryCode) {
      this.currentCountryCode = countryCode
    }
    return this.phoneNumber.isValid()
  }

  changeTo(countryCode: CountryCode) {
    this.currentCountryCode = countryCode
    this.isOpen = false
    this.search = ''
    this.reformatInput()
  }

  get rawInput() {
    let value = this.input.replace(/[ \\(\\)-]/g, '')
    if (!['0', '+'].includes(value.charAt(0))) {
      value = `0${value}`
    }
    return value;
  }

  get countryCodes() {
    return countryCodes.filter(countryCode =>
      countryCode.name.toLowerCase().includes(this.search.toLowerCase()) ||
      countryCode.dialCode.includes(this.search.toLowerCase())
    )
  }

  get countryCodePlaceholder() {
    if (this.currentCountryCode) {
      return `${this.currentCountryCode.code} +${this.currentCountryCode.dialCode}`
    }
    return 'ex: +33'
  }

  get countryCodePlaceholderColor() {
    return this.currentCountryCode ? '' : 'text-black-forest-faded'
  }

  get computedPlaceholder() {
    return 'Phone Number'
  }
}
</script>

<style lang="scss" scoped>
.error {
  @apply border border-red-400
}

.my--hover {
  border-width: 1px;
  border-color: transparent;

  &:hover {
    border-color: #b5b5b5;
  }
}
</style>
