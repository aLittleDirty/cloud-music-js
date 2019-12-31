<template>
  <div class = "music-player">
    <audio ref="audio" @timeupdate="setCurrentTime" @canplay="setDuration" :src="musicUrl"></audio>
    <router-link to = "/Lyric">
      <img :src="imageUrl"/>
    </router-link>
    <div class="musicMesssage">
      <p>{{musicName}} - <span>{{singer}}</span></p>
      <p>{{currentTime}} / {{duration}}</p>
    </div>
    <div class="controlers">
      <button>上一首</button>
      <button>暂停 / 播放</button>
      <button>下一首</button>
    </div>
  </div>
</template>
<script src = "./player.js"></script>
