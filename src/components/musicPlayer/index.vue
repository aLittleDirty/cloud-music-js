<template>
  <div class = "music-player">
    <audio ref="audio"
      @timeupdate="updateTime"
      @canplay="setDuration"
      @ended="setStatus(false)"
      :src="musicUrl">
    </audio>
    <div class="musicMessage">
      <router-link class="albumImage" to="/Lyric">
        <img :src="imageUrl"/>
      </router-link>
      <p>{{musicName}} - <span>{{singer}}</span></p>
      <p>{{currentTime | formatSeconds}} / {{duration | formatSeconds}}</p>
      <input ref="progress" class="progress" @input="resetProgress" type="range" value="0" max="100" min="0"/>
    </div>
    <div class="controllers">
      <button :class="[{ disable: absencePrev }, 'prev']" @click="prev">上一首</button>
      <button :class="[{ onPlay: playing }, 'switch']" @click="swap">暂停 / 播放</button>
      <button :class="[{ disable: absenceNext }, 'next']" @click="next">下一首</button>
      <button class="volume">音量
        <input ref="volume" type="range" value="5" max="10" min="0" @input="changeVolume"/>
      </button>
    </div>
  </div>
</template>
<script src = "./player.js"></script>
<style src="./music-player.css" scoped></style>
