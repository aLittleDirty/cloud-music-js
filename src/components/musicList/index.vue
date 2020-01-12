<template>
  <div class="music-list">
    <div v-if="loading" class="loading" key="loading">
      <img src="../../assets/loading.png"/>
    </div>
    <table v-else class="loaded, table">
      <thead class="thead">
        <tr>
          <th>音乐标题</th>
          <th>歌手</th>
          <th>专辑</th>
          <th>时长</th>
        </tr>
      </thead>
      <tbody class="table-item" >
        <tr v-for="(item, index) in musicList" :class="{ 'disable': item.absenceUrl }" :key="index" @click="!item.absenceUrl && setMusicId(item.id)">
          <td>{{item.name}}</td>
          <td>{{item.singer}}</td>
          <td>{{item.albumName}}</td>
          <td class="time">{{item.duration}}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
<script src = "./music-list.js"></script>
<style src="./music-list.css" scoped></style>
