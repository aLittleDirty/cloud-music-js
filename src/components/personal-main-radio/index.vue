<template>
  <div class="personal-main-collection">
    <h1>我订阅的电台({{radioCount}})</h1>
    <ul>
      <li v-for="(radio, index) in radios" :key="index">
        <img :src="radio.radioImg"/>
        <p>{{radio.radioName}}</p>
        <p>by {{radio.nickName}}</p>
      </li>
    </ul>
  </div>
</template>
<script src="./personal-main-collection.js"></script>
<style scoped src="./personal-main-collection.css"></style>
