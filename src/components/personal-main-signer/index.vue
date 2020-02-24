<template>
  <div class="personal-main-signer">
    <h1>我的歌手{{singersCount}}</h1>
    <ul>
      <li v-for="(signer, index) in signers" :key="index">
        <img :src="signer.signerIcon"/>
        <p>{{signer.signerName}}</p>
        <P><span>{{signer.albumSize}}个专辑</span><span>{{signer.mvSize}}个MV</span></P>
      </li>
    </ul>
  </div>
</template>
<script src="./personal-main-signer"></script>
<style scoped src="personal-main-signer"></style>
