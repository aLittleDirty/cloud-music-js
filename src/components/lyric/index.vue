<template>
  <div class = "lyric">
    <div v-if="loading" key="loading">
      <img src="../../assets/loading.png"/>
    </div>
    <section v-else class="loaded" key="loaded">
      <img :src="albumImg"/>
      <h1>{{musicName}}</h1>
      <p>专辑：{{albumName}} 歌手： {{singer}}</p>
      <div class="wrapper" ref="wrapper">
        <ul class="content" ref="content">
          <li v-for="(item, index) in lyric.lines" :key="index">{{item.txt}}</li>
        </ul>
      </div>
    </section>
  </div>
</template>
<script src = "./lyric.js"></script>
<style scoped src="./lyric.css"></style>
