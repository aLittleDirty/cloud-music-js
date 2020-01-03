<template>
  <div class = "lyric">
    <div key="loading" v-if="loading">
      <img src="../../assets/loading.png"/>
    </div>
    <div key="loaded" v-else>
      <img :src="albumImg"/>
      <h1>{{musicName}}</h1>
      <p>专辑：{{albumName}} 歌手： {{singer}}</p>
      <div class="wrapper" ref="wrapper">
        <ul class="content" ref="content">
          <li v-for="(item, index) in lyric.lines" :key="index">{{item.txt}}</li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script src = "./lyric.js"></script>
