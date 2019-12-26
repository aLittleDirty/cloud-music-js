<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">主页</router-link>{{currentPage}}
    </div>
    <router-view/>
  </div>
</template>
<script src="./app.js">
</script>
<style>
</style>
