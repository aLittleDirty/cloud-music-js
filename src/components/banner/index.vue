<template>
  <div class="banner">
    <transition-group name="fade-img" mode="out-in">
      <img class="fade-img" v-for="(page, index) in pages" :key="index" :src="page" v-show="currentPage === index" />
    </transition-group>
    <ul class="spot-list">
      <li :class="[{'currentSpot': index === currentPage},'spot']" v-for="(value, index) in pages.length" :key="pages.length[index]" @click="toPage(index)">{{value}}</li>
    </ul>
  </div>
</template>
<script src="./banner.js"></script>
<style src="./banner.css" scoped></style>
