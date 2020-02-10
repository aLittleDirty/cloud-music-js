<template>
  <div class="banner">
    <div >
      <transition-group name="fade-img" mode="out-in">
        <img class="fade-img" v-for="(page, index) in pages" :key="index" :src="page" v-show="currentPage === index" />
      </transition-group>
      <div :class="[{'currentSpot': index === currentPage},'spot']" v-for="(value, index) in pages.length" :key="pages.length[index]" @click="toPage(index)">{{value}}</div>
    </div>
  </div>
</template>
<script src="./banner.js"></script>
<style src="./banner.css" scoped></style>
