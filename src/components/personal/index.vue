<template>
  <div class="personal">
    <nav class="sidebar">
      <router-link to="/personal-main-collection">我的歌手({{signersCount}})</router-link>
      <router-link to="/personal-main-collection">我的电台({{radiosCount}})</router-link>
      <PersonalSidebarSelections v-for="(selections, index) in selectionsList" :key="index" :selections=selections />
    </nav>
    <router-view></router-view>
  </div>
</template>
<script src="./personal.js"></script>
<style src="./personal.css" scoped></style>
