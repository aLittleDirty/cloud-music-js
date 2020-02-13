<template>
  <div class="billboard">
    <div v-if="loading" class="loading" key="loading">
      <img src="../../assets/loading.png"/>
    </div>
    <div v-else class="loaded" key="loaded">
      <Paging :pages="pagesNum" :currentPage="currentPage" @setPage="gotoPage"/>
      <Banner/>
      <ul class="billboardList">
        <li class="billboardDetail" v-for="(item, index) in lists" :key="index">
          <router-link :to="{ path: '/musicList', query: {id:item.id}}">
            <img :src="item.coverImg">
            <p>{{item.name}}</p>
          </router-link>
        </li>
      </ul>
    </div>
  </div>
</template>
<script src = "./billboard.js">
</script>
<style scoped src="./billboard.css"></style>
