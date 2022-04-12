<template>
<div>
    <el-container style="border: 1px solid #eee; min-width: 390px">
  <!-- <el-aside width="200px" style="background-color: rgb(238, 241, 246)">
    <el-menu router :default-openeds="['0','1']"> 
      <el-submenu v-for="(item , index) in $router.options.routes" :index="index+''">
        <template slot="title">
          <i class="el-icon-location"></i>{{item.name}}
        </template>
        <el-menu-item v-for="(item2,index2) in item.children" :index="item2.path" :class="$route.path==item2.path?'is-active':''">{{item2.name}}</el-menu-item>
      </el-submenu>
    </el-menu>
  </el-aside>  -->
 
    <el-main>
      <router-view></router-view>
    </el-main>
  </el-container>
</div>
</template>

<script>

</script>
<style scoped>
 .index{
        height: calc(100vh);
    }
    html, body, #app, .el-container {
        /*统一设置高度为100%*/
        height: 100%;
        width:100%;
    }
    .el-main{
      padding: 0;
    }
</style>
