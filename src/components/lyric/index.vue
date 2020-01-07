<template>
  <div class = "lyric">
    <div v-if="loading" class="loading" key="loading">
      <img src="../../assets/loading.png"/>
    </div>
    <section v-else class="loaded" key="loaded">
      <img class="albumImage" :src="albumImg"/>
      <div class="lyric-content">
        <h1>{{musicName}}</h1>
        <p>专辑：{{albumName}} 歌手： {{singer}}</p>
        <div class="wrapper" ref="wrapper">
          <ul class="content" ref="content">
            <li v-for="(item, index) in lyric.lines" :key="index" :class="{ 'highlight':index === currentLine}">{{item.txt}}</li>
          </ul>
        </div>
      </div>
    </section>
  </div>
</template>
<script src = "./lyric.js"></script>
<style scoped src="./lyric.css"></style>
