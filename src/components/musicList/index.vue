<template>
  <div class="music-list">
    <div class = "billboard">
    <div key="loading" v-if="loading">
      <img src="../../assets/loading.png"/>
    </div>
      {{message}}
      <table>
        <tr>
          <th>音乐标题</th>
          <th>歌手</th>
          <th>专辑</th>
          <th>时长</th>
        </tr>
        <tr v-for="(item, index) in musicList" :key="index" @click="setMusicId(item.id)">
          <td>{{item.name}}</td>
          <td>{{item.singer}}</td>
          <td>{{item.albumName}}</td>
          <td>{{item.duration}}</td>
        </tr>
      </table>
    </div>
  </div>
</template>
<script src = "./music-list.js"></script>
