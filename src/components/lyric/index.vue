<template>
  <div class = "lyric">
    <img :src="albumImg"/>
    <h1>{{musicName}}</h1>
    <p>专辑：{{albumName}} 歌手： {{singer}}</p>
    <div>
      <ul>
        <li v-for="(item, index) in lyric" :key="index">{{item}}</li>
      </ul>
    </div>
  </div>
</template>
<script src = "./lyric.js"></script>
