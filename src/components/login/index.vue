<template>
  <div class="login">
    <button v-if="!isLogin" id="unlog" class="unlog-icon" @click="showDialog = true">登录</button>
    <div v-else class="user-message">
      <img class="user-icon" :src="userIcon"/>
      <ul class="user-menu">
        <li class="user-detail">
          <img src="../../assets/用户.png"/>
          <span>{{userName}}</span>
        </li>
        <li class="logout">
          <img src="../../assets/退出登录.png"/>
          <button @click="logout">退出</button>
        </li>
      </ul>
    </div>
    <div class="dialog" v-show="showDialog">
      <div class="dialog-handle">
        <span>手机号登录</span>
        <button @click="showDialog = false">X</button>
      </div>
      <input class="phone" type="number" v-model="userPhone" placeholder="请输入你的手机号"/>
      <input class="password" type="password" v-model="passWord" placeholder="请输入密码"/>
      <button class="login-btn" @click="login(userPhone, passWord)">登录</button>
    </div>
  </div>
</template>
<script src="./login.js"></script>
<style src="./login.css" scope></style>
