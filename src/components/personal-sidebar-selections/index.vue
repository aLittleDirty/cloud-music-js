<template>
  <div class="personal-sidebar-selections">
    <h5>{{title}}</h5>
    <ul class="listDetail">
      <li v-for="(playlist, index) in options" :key="index">
        <router-link :to="{path:'/personal-main-playlist', query: {id: playlist.id}}">
          <img class="albumImg" :src="playlist.albumImg"/>
          <p>{{playlist.name}}</p>
          <p>{{playlist.musicsCount}}首</p>
          <p>{{playlist.id}}</p>
        </router-link>
      </li>
    </ul>
  </div>
</template>
<script src="./personal-sidebar-selections.js"></script>
<style src="./personal-sidebar-selections.css" scoped></style>
