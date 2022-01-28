<template>

</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import Input from '../components/Form/Input.vue'
import Dropdown from '../components/Form/Dropdown.vue'

@Component({
  components: { Input, Dropdown }
})
export default class Form extends Vue {
  created() {

  }
}
</script>


<style lang="scss">
</style>
