<template>
  <div id="app">
    <component :is="layout">
        <router-view :key="$route.fullPath"></router-view>
    </component>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator'
import { Getter, Action } from 'vuex-class'

@Component
export default class App extends Vue {
  default: string = 'default'

  get layout(): string {
    return `form`
  }

}
</script>
