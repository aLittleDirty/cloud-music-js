<template>
  <div class = "music-player">
    <audio ref="audio"
    @timeupdate="setCurrentTime"
    @canplay="setDuration"
    autoplay
    :src="musicUrl"></audio>
    <router-link to = "/Lyric">
      <img :src="imageUrl"/>
    </router-link>
    <div class="musicMesssage">
      <p>{{musicName}} - <span>{{singer}}</span></p>
      <p>{{currentTime}} / {{duration}}</p>
    </div>
    <div class="controlers">
      <button>上一首</button>
      <button @click="swap">暂停 / 播放</button>
      <button>下一首</button>
    </div>
    <input type="range" value="5" max="10" min="0" @input="changeVolume"/>
  </div>
</template>
<script src = "./player.js"></script>
