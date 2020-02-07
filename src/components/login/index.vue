<template>
  <div class="login">
    <button v-if="!isLogin" id="unlog" class="unlogIcon" @click="showLoginBox = true">登录</button>
    <div v-else id="userMessage" class="userMessage">
      <img :src="userIcon"/>
      <span>{{userName}}</span>
    </div>
    <button class="logout" @click="logout">退出</button>
    <div class="loginBox" v-show="showLoginBox">
      <span>手机号登录</span>
      <button @click="showLoginBox = false">X</button>
      <input v-model="userPhone" placeholder="请输入你的手机号"/>
      <input v-model="passWord" placeholder="请输入密码"/>
      <button class="loginBtn" @click="login(userPhone, passWord)">登录</button>
    </div>
  </div>
</template>
<script src="./login.js"></script>
<style src="./login.css" scope></style>
