<template>
  <div class="home container-fluid">
    <img alt="Vue logo" src="../assets/logo.png">
    <div :class="handleInput" style="position: relative">
      <auto-complete @onSelect="onSelect" @input="handleInput"/>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import { AutoComplete } from '@/components/auto-complete'

export default {
  name: 'Home',
  components: {
    AutoComplete
  },
  methods: {
    onSelect: function () {
      console.log('onSelect | method')
    },
    handleInput: function () {
      console.log('handleInput | method')
    }
  }
}
</script>
