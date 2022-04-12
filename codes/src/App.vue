<template>
  <div id='app'>
    <!-- <keep-alive include="Different_tag">
    <router-view></router-view>
    </keep-alive> -->
<keep-alive>
  <router-view v-if="$route.meta.keepAlive">
    <!-- 这里是被缓存的视图，比如 标签对应的视频 -->
  </router-view>
</keep-alive>
<router-view v-if="!$route.meta.keepAlive">
  <!-- 这里是不被缓存的视图 -->
</router-view>
  </div>
</template>

<style>
.el-aside {
    color: #333;
}
body{
  margin: 0;
}
</style>

<script>

</script> 