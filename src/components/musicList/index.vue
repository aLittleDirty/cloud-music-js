<template>
  <div class="music-list">
    {{message}}
    <table>
      <tr>
        <th>音乐标题</th>
        <th>歌手</th>
        <th>专辑</th>
        <th>时长</th>
      </tr>
      <tr v-for="(item, index) in musicList" :key="index">
        <td>{{item.name}}</td>
        <td>{{item.singer}}</td>
        <td>{{item.albumName}}</td>
        <td>{{item.duration}}</td>
      </tr>
    </table>
  </div>
</template>
<script src = "./music-list.js"></script>
