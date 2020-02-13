<template>
  <div class="billboard">
    <div v-if="loading" class="loading" key="loading">
      <img src="../../assets/loading.png"/>
    </div>
    <div v-else class="loaded" key="loaded">
      <Banner/>
      <ul>
        <li v-for="(item, index) in lists" :key="index">
          <router-link :to="{ path: '/musicList', query: {id:item.id}}">
            <img class="billboardImg" :src="item.coverImg">
            <p class="billboardName">{{item.name}}</p>
          </router-link>
        </li>
      </ul>
      <Paging class="paging" :pages="pagesNum" :currentPage="currentPage" @setPage="gotoPage"/>
    </div>
  </div>
</template>
<script src = "./billboard.js">
</script>
<style scoped src="./billboard.css"></style>
