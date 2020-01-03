<template>
  <div id="app">
    <div></div>
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>
<style lang="scss">
  @import '~@/assets/sass/index.scss';

  div {
    @include ico-sprite(ico-4);
  }
</style>
