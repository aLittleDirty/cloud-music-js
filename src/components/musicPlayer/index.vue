<template>
  <div :class="['music-player',{'lock': isLock}]">
    <audio ref="audio"
      @timeupdate="updateTime"
      @canplay="initDuration"
      @ended="playing = false"
      :src="musicUrl">
    </audio>
    <button :class="['lock-btn',{'lock': isLock}]" @click="isLock = !isLock"></button>
    <router-link to="/Lyric">
      <div class="album-container">
        <img class="album-image" :src="imageUrl"/>
      </div>
    </router-link>
    <div class="music-detail">
      <p class="music-message">{{musicName}} - <span>{{singer}}</span></p>
      <p class="music-time">{{currentTime | formatSeconds}} / {{duration | formatValidTime}}</p>
      <input class="music-progress" ref="progress" @input="resetProgress" type="range" value="0" max="100" min="0"/>
    </div>
    <div class="controllers">
      <button :class="[{ disable: absencePrev }, 'controller-prev']" @click="prev">上一首</button>
      <button :class="[{ onPlay: playing }, 'controller-switch']" @click="swap">暂停 / 播放</button>
      <button :class="[{ disable: absenceNext }, 'controller-next']" @click="next">下一首</button>
    </div>
    <button class="volume">音量
      <input ref="volume" type="range" value="5" max="10" min="0" @input="changeVolume"/>
    </button>
  </div>
</template>
<script src = "./player.js"></script>
<style src="./music-player.css" scoped></style>
