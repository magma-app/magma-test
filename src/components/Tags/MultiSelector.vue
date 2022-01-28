<template>
 <!-- http://www.vue-tags-input.com/#/api/props -->
<div class="flex flex-col w-100">
    <vue-tags-input
      v-model="tag"
      :tags="selectedMultiSelector"
      :autocomplete-items="filteredItems"
      @tags-changed="(newTags) => (tags = newTags)"
      @before-deleting-tag="(obj) => (multiSelectorRemoved(obj))"
      @before-adding-tag="(obj) => (multiSelectorAdded(obj))"
      :avoid-adding-duplicates="true"
      :add-only-from-autocomplete="true"
      :placeholder="multiSelectorName">
    </vue-tags-input>
    <div class="text-label uppercase text-black-forest opacity-60 font-black mt-3 mb-3">Suggestion</div>
    <div class="div flex flex-wrap">
        <tag-main
          class="mr-3 my-1 cursor-pointer"
          v-for="(item) in shortListAutocompleteItems"
          :key="item.index"
          :tag="item.value"
          @click="suggestedItemClicked(item, item.index)"
          :class="isItemAlreadySelected(item.index) ? 'disabled-1' : ''">
        </tag-main>
    </div>
</div>
</template>

<script lang="ts">
import { Component, Vue, Prop, Watch } from 'vue-property-decorator'
// SEE: http://www.vue-tags-input.com/#/api/props
import VueTagsInput from '../Forked/vue-tags-input/publish'

@Component({ components: { VueTagsInput } })
export default class TagsSelector extends Vue {
   @Prop({ type: Object, default: {}}) multiSelector!: any
   @Prop({ type: Array, default: []}) userMultiSelector!: any[]
   @Prop({ type: String, default: ''}) multiSelectorName!: string

  tag = ''
  selectedMultiSelector = []
  autocompleteItems = []
  selectedMultiSelectorIndexes = {} // index1: true or false, index2...

  async created() {
    this.selectedMultiSelector = this.userMultiSelector;
    this.autocompleteItems = Object.entries(this.multiSelector).map(m => ({ key: m[0], value: m[1] }))
    this.selectedMultiSelectorIndexes = this.autocompleteItems.reduce((prev, curr, index) => {
      prev[index] = !!this.selectedMultiSelector.find(h => h.key === curr.key)
      return prev;
    }, {})
  }

  @Watch('selectedMultiSelector', {deep:true})
  updateSelectedMultiSelectorState(){
    this.$emit('updateSelectedMultiSelectorState', this.selectedMultiSelector)
  }

  isItemAlreadySelected(index) {
    return this.selectedMultiSelectorIndexes[index]
  }

  suggestedItemClicked(multiSelector, index) {
    if (this.selectedMultiSelector.length >= 5) {
      return this.$buefy.toast.open({
        message: 'limit is 5',
        type: 'is-danger',
        duration: 5000,
        queue: false,
      } as any)
    }
    this.selectedMultiSelector.push(multiSelector)
    this.selectedMultiSelectorIndexes[index] = true
  }

  multiSelectorRemoved(obj: {deleteTag: Function, index: number, tag: { key: string, value: string }}) {
    const {deleteTag, index, tag} = obj
    deleteTag()
    this.removeItemFromSelectedMultiSelector(index)
    const indexOfItemInMultiSelector = Object.keys(this.multiSelector).findIndex(h => h === tag.key)

    if (indexOfItemInMultiSelector === -1) return;
    this.selectedMultiSelectorIndexes[indexOfItemInMultiSelector] = false
  }

  multiSelectorAdded(obj: {addTag: Function, tag: { key: string, value: string }}) {
    if (this.selectedMultiSelector.length >= 5) {
      return this.$buefy.toast.open({
        message: 'limit is 5',
        type: 'is-danger',
        duration: 5000,
        queue: false,
      } as any)
    }
    const { addTag, tag } = obj
    if (this.doNotAddTagIfNotInProvidedList(tag)) return;
    addTag()
    this.selectedMultiSelector.push(tag)
    const indexOfItemInMultiSelector = Object.keys(this.multiSelector).findIndex(h => h === tag.key)
    this.selectedMultiSelectorIndexes[indexOfItemInMultiSelector] = true
  }

  doNotAddTagIfNotInProvidedList(tag) {
    const options = this.filteredItems.map(i => i.key);
    return options.indexOf(tag.key) === -1;
  }

  removeItemFromSelectedMultiSelector(index) {
    this.selectedMultiSelector.splice(index, 1)
  }

  get filteredItems() {
    return this.autocompleteItems.filter((selector) => {
      return (selector.value || selector.key).toLowerCase().indexOf(this.tag.toLowerCase()) !== -1
    })
  }

  get shortListAutocompleteItems() {
    return this.autocompleteItems
      .map((a, index) => ({sort: Math.random(), value: a, index}))
      .sort((a, b) => a.sort - b.sort)
      .map((a) => ({ ...a.value, index: a.index }))
      .filter((_, index) => index < 6)
  }
}
</script>

<style scoped lang="scss">
</style>
