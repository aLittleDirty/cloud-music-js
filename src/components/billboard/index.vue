<template>
  <div class = "billboard">
    <router-link :to = "{ path: '/musicList', params: { id: 1 }}">{{message}}</router-link>
  </div>
</template>
<script src = "./billboard.js">
</script>
<style scoped>
@import './billboard.css'
</style>
