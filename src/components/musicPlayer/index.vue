<template>
  <div class = "music-player">
    <audio ref="audio"
      @timeupdate="setCurrentTime"
      @canplay="setDuration"
      :src="musicUrl">
    </audio>
    <div class="musicMessage">
      <router-link to="/Lyric">
        <img class="albumImage" :src="imageUrl"/>
      </router-link>
      <p>{{musicName}} - <span>{{singer}}</span></p>
      <p>{{currentTime}} / {{duration}}</p>
    </div>
    <div class="controllers">
      <button @click="prev">上一首</button>
      <button @click="swap">暂停 / 播放</button>
      <button @click="next">下一首</button>
    </div>
    <input class="volume" type="range" value="5" max="10" min="0" @input="changeVolume"/>
  </div>
</template>
<script src = "./player.js"></script>
<style src="./music-player.css" scoped></style>
