<template>
  <div class="header">
    <nav>
      <li class="logo">
        <img src="../../assets/网易云音乐logo.jpeg"/>
        <h1>网易云音乐</h1>
      </li>
      <li :class="[{'focus': focusOption === 1}, 'billboard']" @click="focusOption = 1">
        <router-link to = "/">{{currentPage}}</router-link>
      </li>
      <li :class="[{'focus': focusOption === 2}, 'my-music']" @click="focusOption = 2">我的音乐</li>
      <li class="login">
        <Login/>
      </li>
    </nav>
  </div>
</template>
<script src = "./header.js"></script>
<style scoped src="./header.css"></style>
