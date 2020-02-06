<template>
  <div class="login">
    <button v-if="login" id="unlog" class="unlogIcon" @click="showLoginBox = true">登录</button>
    <img v-else id="userIcon" class="userIcon" :src="userIcon"/>
    <div class="loginBox" v-show="showLoginBox">
      <span>手机号登录</span>
      <button @click="showLoginBox = false">X</button>
      <input placeholder="请输入你的手机号"/>
      <input placeholder="请输入密码"/>
      <input type="radio" :checked="isChecked" id="autoLogin"/>
      <label for="autoLogin">自动登录</label>
      <button class="loginBtn">登录</button>
    </div>
</template>
<script src="./login.js"></script>
<style src="./login.css" scope></style>
