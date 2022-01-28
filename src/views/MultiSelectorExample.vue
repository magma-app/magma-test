<template>
  <multi-selector
    @updateSelectedMultiSelectorState="updateSelectedMultiSelectorState"
    :multiSelector="multiSelector"
    :userMultiSelector="[]"
    :multiSelectorName="multiSelectorName"
  ></multi-selector>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component({

})
export default class MultiSelectorExample extends Vue {
  toSaveMultiSelector = []
  hobbies = {
    "name": "Hobbies",
    "type": "multiselect",
    "label": "Title 1",
    "values": {
      "key1": "Value 1",
      "key2": "Value 2",
      "key3": "Value 3",
      "key4": "Value 4",
    }
  }

  get multiSelector() {
    return this.hobbies.values
  }
  get multiSelectorName() {
    return this.hobbies.label
  }

   updateSelectedMultiSelectorState(selectedMultiSelector) {
    this.toSaveMultiSelector = selectedMultiSelector.map(s => s.key);
  }
}
</script>


<style lang="scss">
</style>
