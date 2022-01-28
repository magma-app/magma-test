<template>
  <div class="flex flex-auto items-center">
    <div class="text-label text-black-forest-faded font-black whitespace-nowrap mr-4 opacity-60">{{ formattedDate }}</div>
    <gray-separator class="w-full"></gray-separator>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
import { Getter } from 'vuex-class'
import { format } from 'date-fns'
import { fr, enGB } from 'date-fns/locale'

@Component
export default class DateSeparator extends Vue {
  @Prop({ type: [String, Number], default: '' }) date!: string | number
  @Getter('userLocale') userLocale!: string
  formattedDate = ''

  async mounted() {
    const date = new Date(this.date)
    this.formattedDate = format(date, 'MMM dd, yyyy', { locale: this.userLocale === 'fr' ? fr : enGB })
  }
}
</script>

<style scoped lang="scss">
</style>