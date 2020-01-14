<template>
  <div class="paging">
    <button class="first" @click="gotoPage(1)">首页</button>
    <button class="prev" @click="(currentPage !== 1) && gotoPage(currentPage - 1)">上一页</button>
    <button
    v-for="(item, index) in lists"
    :key="index"
    :class="[{ highLight: currentPage === index },'icon']"
    @click="gotoPage(index)">{{index}}</button>
    <button class="next" @click="(currentPage !== lists.length) && gotoPage(currentPage - 1)">下一页</button>
    <button class="last" @click="gotoPage(lists.length)">尾页</button>
  </div>
</template>
<script src="./paging.js"></script>
<style scoped src="./paging.css"></style>
