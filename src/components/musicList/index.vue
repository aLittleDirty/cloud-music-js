<template>
  <div class = "music-list">
    {{message}}
    <p v-for="(item, index) in musicList" :key="index">{{item.name}}</p>
  </div>
</template>
<script src = "./music-list.js"></script>
