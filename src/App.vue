<template>
  <div id="app">
    <Demo msg="Welcome to Your Vue.js App" />
  </div>
</template>

<script>
import Demo from './components/Demo.vue'

export default {
  name: 'App',
  components: {
    Demo
  }
}
</script>

<style>
  * {
    margin: 0;
    padding: 0;
    outline: 0;
  }
  #app {
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
  }
  ::-webkit-scrollbar {
    width: 0px;
    height: 0px;
  }
</style>
