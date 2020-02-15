<template>
  <div class="paging">
    <button class="first" @click="gotoPage(0)">首页</button>
    <button class="prev" @click="(currentPage !== 0) && gotoPage(currentPage - 1)">上一页</button>
    <button
    v-for="(item, index) in pages"
    :key="index"
    :class="[{ highlight: currentPage === index },'page-number']"
    @click="gotoPage(index)">{{index + 1}}</button>
    <button class="next" @click="(currentPage !== pages - 1) && gotoPage(currentPage + 1)">下一页</button>
    <button class="last" @click="gotoPage(pages - 1)">尾页</button>
  </div>
</template>
<script src="./paging.js"></script>
<style scoped src="./paging.css"></style>
