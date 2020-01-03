<template>
  <div class = "billboard">
    <div key="loading" v-if="loading">
      <img src="../../assets/loading.png"/>
    </div>
    <div key="loaded" v-else>
      <router-link v-for="(item, index) in lists" :key="index"
      :to="{ path: '/musicList', query: {id:item.id}}">
        <img :src="item.coverImg">
        <p>{{item.name}}</p>
      </router-link>
    </div>
  </div>
</template>
<script src = "./billboard.js">
</script>
<style scoped>
@import './billboard.css'
</style>
