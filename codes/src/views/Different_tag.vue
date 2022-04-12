<template>
  <div>
    <!-- 背景图部分 -->
    <!-- <div class="list_background" :style="{backgroundImage:'url('+imgSrc+')'}">
      <div>
        <span class="tag">{{tags}}</span>
      </div>
    </div> -->
    <div class="list_background">
      <div style="width: 100%;height: 43vw;">
        <img :src="imgSrc" width="100%" height="100%" alt="" />
      </div>
      <div>
        <span class="tag">{{tags}}</span>
      </div>
    </div>









    <!-- 非背景图部分 -->
    <div>
      <el-card class="back_ground" shadow="never">
        <!-- 列表+分页 -->
        <div class="no_background">
          <!-- 视频播放列表 -->
          <div class="list">
            <div class="set">
		          <el-row :gutter="30">
			          <el-col :lg="6" :md="12" :sm="12" :xs="24" v-for="(item,index) in video_list_tag" :key="index">
                  <div class="box">
				            <img :src="item.thumb_url">
                    <el-card style="background-image: linear-gradient(#CB1627, #A61D25);text-align:center;">
                      <span class="font_css">{{ "类别: " + item.category }}</span>
                    </el-card>
                    <div style="padding: 10px" >
                      <div class="title">{{ "标题: " + item.title }}</div>
                      <div class="desc1">{{ "标签: " + item.tags }}</div>
                      <div class="desc">{{ "简介: " + item.brief }}</div>
                      <el-button class="btn" @click="to_PageTwo(item.post_id)">查看详情→</el-button>
                    </div>
                  </div>
			          </el-col>
		          </el-row>
            </div>
	        </div>
          <!-- mobile list -->
          <!-- 分页功能 -->
          <div class="page">
            <el-pagination
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :current-page="queryInfo.page_num"
              :page-sizes="[2, 4, 6, 8]"
              :page-size="queryInfo.page_size"
              layout="total, prev, pager, next, jumper"
              :total="total"
            >
            </el-pagination>
          </div>
          <!-- mobile page -->
        </div>
      </el-card>
    </div>


    <div>
      <img :src="imgSrc1" width="100%"   />
    </div>
  </div>
</template>

<script>
export default {
    data(){
        return{
            tags:'',
            video_list_tag:[],
            imgSrc:require('../assets/pic/bkg21.png'),
            imgSrc1:require('../assets/pic/bkg22.png'),
            queryInfo:{
                //当前的页数
                page_num:1,
                //当前每页显示多少条数据
                page_size:8
              },
            total:0
        }
    },
    created() {
        ///渲染成html之前就会调用
            this.get_params()
 },
    methods:{
        async get_params(){
          this.tags = this.$route.params.item
          if(this.tags){
            const{data:res}=await this.$http.get('categories/'+this.tags,{params:this.queryInfo})
            this.video_list_tag=res.data
            this.total=res.total_num
            sessionStorage.setItem("tags",this.tags)
          }else if(sessionStorage.getItem("tags")){
            const tag=sessionStorage.getItem("tags")
            const{data:res}=await this.$http.get('categories/'+tag+'',{params:this.queryInfo})
            this.video_list_tag=res.data
            this.total=res.total_num
            this.tags=tag
          }      

    },
    to_PageTwo: function (post_id) {
      this.$router.push({
        path: `/PageTwo/${post_id}`,
      })
    },
    //监听page_size改变的事件
    handleSizeChange(newSize){
      console.log(newSize)
      this.queryInfo.page_size = newSize
      this.get_params()
      },
    //监听页码值改变的事件
    handleCurrentChange(newPage){
      console.log(newPage)
      this.queryInfo.page_num=newPage
      this.get_params()
    }
}
}
</script>

<style scoped>
.list_background{
  position: relative;
  background-size: cover;
  /* background-position: center 50%; */
	background-repeat: no-repeat;
}
.tag{
  font-size: 9vw;
  font-family: ziti;
  color: rgb(153, 45, 45);
  position: absolute;
  left: 50%;
  top: 50%;
  transform:translate(-50%,-50%);
  background-image:-webkit-linear-gradient(bottom,rgb(83, 17, 17),#79160f,rgb(255, 42, 42));
  -webkit-background-clip:text;
  -webkit-text-fill-color:transparent;
}




@font-face {
  font-family: 'ziti';
  src: url('../common/font/yzq.ttf');
  font-weight: normal;
  font-style: normal;
}



.tag_title{
font-size: 60px;
font-family: ziti;
color: rgb(153, 45, 45);
position: absolute;
left: 50%;
transform:translate(-50%,200%);
background-image:-webkit-linear-gradient(bottom,rgb(83, 17, 17),#79160f,rgb(255, 42, 42));
-webkit-background-clip:text;
-webkit-text-fill-color:transparent;
}

.back_ground{
  /* height: 1236px; */
  position: relative;
  z-index: 1;
  width: 100%;
  /* transform:translateY(30%); */
  background-color: unset;
  border: none;
}
.no_background{
  width: 80%;
  position: relative;
  left: 50%;
  transform: translateX(-50%);
}
.list{
	padding-bottom: 20px;
	font-size: 16px;
	opacity: 0.98;
	border-radius: 5px;
	z-index: 1;
}
.set img{
    width: 175px;
    height: 175px;
    margin-top: 10px;
    border: 3px solid;
    border-radius: 100%;
    box-shadow: 0px 0px 10px rgb(255, 0, 0);
    object-fit: cover;
    box-shadow: 0,0,10px, rgb(236, 93, 93);
    position: relative;
    left: 50%;
    transform: translate(-50%,0);
}
.box{
  background-color: rgb(255, 255, 255);
  height: 520px;
  position: relative;
  margin-top: 50px;
  box-shadow:5px 5px 10px rgb(224, 118, 118);
}
.font_css{
  font-size: 15px;
  color: #FFFFFF;
  line-height: 45px;
}
.title {
  font-size: 1.1rem;
  font-weight: bold;
  padding: 0px 10px;
  margin-top: 5px;
  max-height: 70px;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
}
.desc1{
  font-size: 15px;
  margin-top: 10px;
  margin-bottom: 10px;
  font-weight: 600;
  margin-left: 10px;
}
.desc {
  font-size: 15px;
  text-indent: 32px;
  line-height: 17px;
  margin-bottom: 5px;
  max-height: 70px;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 4;
  -webkit-box-orient: vertical;
}
.btn {
  border-radius: 4px;
  background-image: linear-gradient(#CB1627, #A61D25);
  color: #FFFFFF;
  position: absolute;
  width: 50%;
  left: 50%;
  transform: translate(-50%,0);
  bottom: 3px;
}
.el-card >>> .el-card__body{
  padding:2px;
}
.page{
  text-align: center;
  margin-top: 20px;
}
@media screen and (max-width: 550px) {
  .el-pagination {
    white-space: normal;
  }
}
</style>