<template>
  <div class = "billboard">
    <router-link v-for="(item, index) in lists" :key="index"
    to="{ path: '/musicList'}">
    <div class="container" @click="setRouteParams(item.id)">
      <img :src="item.coverImg">
      <p>{{item.name}}</p>
    </div>
    </router-link>
  </div>
</template>
<script src = "./billboard.js">
</script>
<style scoped>
@import './billboard.css'
</style>
