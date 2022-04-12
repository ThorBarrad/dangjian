<template>
  <div>
    <!-- 标题栏 -->
    <div class="headBack">
      <img :src="imgSrc" width="100%"/>
    </div>
    <!-- 轮播图 -->
    <el-carousel>
      <el-carousel-item v-for="item in bannerImgLst" :key="item.id">
        <div class="headImgBox3">
          <img :src="item.url" width="100%"/>
        </div>
      </el-carousel-item>
    </el-carousel>
    <!-- mobile -->

    <!-- 大背景图 -->
    <div>
      <!-- 背景图部分 -->
      <div class="back1">
        <img :src="imgSrc1" width="100%"/>
      </div>
      <!-- 非背景图部分 -->
      <div class="back_ground" :style="{backgroundImage:'url('+imgSrc4+')'}">
        <!-- 标签 -->
      <div>
        <el-row>
          <el-col :span="18" :offset="3">
            <div class="tag" style="text-align: center;">
              <div v-for="(item,index) in tag_list" :key="index" style="display:inline; margin:20px;">
                <el-button type="warning" class="test_button" @click="to_different_tag(item)">{{ item }}</el-button>
              </div>
            </div>
          </el-col>
        </el-row>
      </div>

      
        <!-- 搜索框 -->

      <!-- 正常搜索 -->
      <el-row class="pc">
        <el-col :span="15" :offset="1">
          <div class="search_box">
            <el-input class="search_input" style="width:80%" placeholder="请输入想要查询的内容" prefix-icon="el-icon-search" v-model="input"></el-input>
            <el-button type="danger" class="search_button" plain @click="getVideos">搜索</el-button>
          </div>
        </el-col>

        <!-- 按照日期搜索 -->
        <el-col :span="7">
          <div class="search_box2">
            <el-date-picker v-model="value1" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期"></el-date-picker>
            <el-button type="danger" size="small" plain @click="getVideos2" icon="el-icon-search"></el-button>
          </div>
        </el-col>
      </el-row>

      <el-row class="mobile">
        <el-col :span="24">
          <div class="mobile_search_box">
            <el-input class="search_input" style="width:60%" placeholder="请输入想要查询的内容" prefix-icon="el-icon-search" v-model="input"></el-input>
            <el-button type="danger" class="search_button" plain @click="getVideos">搜索</el-button>
          </div>
        </el-col>

        <!-- 按照日期搜索 -->
        <el-col :span="24">
          <div class="mobile_search_box2">
            <!-- <el-date-picker v-model="value1" style="width:60%" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期"></el-date-picker> -->
            <el-date-picker v-model="value2" type="date" placeholder="选择日" style="width:40%"></el-date-picker>
            <el-date-picker v-model="value3" type="date" placeholder="选择日" style="width:40%"></el-date-picker>
            <el-button type="danger" class="search_button" size="small" plain @click="getVideos2" icon="el-icon-search"></el-button>
          </div>
        </el-col>
      </el-row>





        <!-- 视频播放列表 -->
        <div class="list">
          <div class="set">
            <el-row :gutter="30">
              <el-col :lg="6" :md="12" :sm="12" :xs="24" v-for="(item,index) in videoList" :key="index">
                <div class="box">
                  <img :src="item.thumb_url">
                  <el-card style="background-image: linear-gradient(#CB1627, #A61D25);text-align:center;">
                    <span class="font_css">{{ "类别: " + item.category }}</span>
                  </el-card>
                  <div style="padding: 10px">
                    <div class="title">{{ "标题: " + item.title }}</div>
                    <div class="desc1">{{ "标签: " + item.tags }}</div>
                    <div class="desc">{{ "简介: " + item.brief }}</div>
                  </div>
                  <el-button class="btn" @click="to_PageTwo(item.post_id)">查看详情→</el-button>
                </div>
              </el-col>
            </el-row>
          </div>
        </div>
        <!-- 分页功能 -->
        <div class="page">
          <el-pagination
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :current-page="queryInfo.page_num"
              :page-size="queryInfo.page_size"
              layout="total, prev, pager, next, jumper"
              :total="total">
          </el-pagination>
        </div>
        <div class="mobile_page">
          <el-pagination
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :current-page="queryInfo.page_num"
              :page-size="queryInfo.page_size"
              layout="total, prev, pager, next, jumper"
              :total="total">
          </el-pagination>
        </div>
        <!-- 登出按钮 -->
        <div class="logout">
        <el-dropdown split-button type="danger" plain>
          用户操作
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item @click.native="user_logout()">登出</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
        </div>

        <div>
          <img :src="imgSrc3" width="100%"/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'App',
  data() {
    return {
      videoList: [],
      imgHeight: "",
      tag_list: ["党的建设", "中国特色社会主义", "经济与社会", "一带一路", "文化", "国防与军事"],
      bannerImgLst: [
        // 1600x600
      ],
      input: '',
      imgSrc: require('../assets/title.png'),
      imgSrc1: require('../assets/pic/111.png'),
      imgSrc2: require('../assets/tag.png'),
      imgSrc3: require('../assets/pic/bkg12.png'),
      imgSrc4: require('../assets/pic/222.png'),
      queryInfo: {
        //当前的页数
        page_num: 1,
        //当前每页显示多少条数据
        page_size: 8
      },
      total: 0,
      pickerOptions: {
          disabledDate(time) {
            return time.getTime() > Date.now();
          },
          shortcuts: [{
            text: '今天',
            onClick(picker) {
              picker.$emit('pick', new Date());
            }
          }, {
            text: '昨天',
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24);
              picker.$emit('pick', date);
            }
          }, {
            text: '一周前',
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit('pick', date);
            }
          }]
        },
        value1: '',
        value2:"",
        value3:"",
    }
  },
  created() {
    this.getVideoList()
    this.get_bannerImgLst()
  },
  methods: {
    async getVideoList() {
      const {data: res} = await this.$http.get('posts', {params: this.queryInfo})
      console.log(res.data)
      this.videoList = res.data
      this.total = res.total_num

    },
    async get_bannerImgLst() {
      const {data: res} = await this.$http.get('toutus')
      //console.log(res)
      this.bannerImgLst = res
    },
    to_PageTwo: function (post_id) {
      this.$router.push({
        path: `/PageTwo/${post_id}`,
      })
    },
    to_different_tag: function (item) {
      this.$router.push({
        path: `/tags/${item}`,
        // name: "标签对应的视频",
        // params: {
        //   tag_item: item
        // }

      })
    },
    async getVideos() {
      //视频分类
      if (this.input != '') {
        const {data: res} = await this.$http.get('search/' + this.input, {params: this.queryInfo})
        this.videoList = []
        this.videoList = res.data
        //console.log(this.videoList)
        this.total = res.total_num
      } else {
        this.getVideoList()
      }
      //console.log(this.videoList)
    },

    //按照日期查找
    async getVideos2(){
      if (this.value2!=""){
        this.value1=[this.value2,this.value3]
      }
      console.log(this.value1)
      if (this.value1 != ''){
        //console.log(this.value1)
        const {data: res} = await this.$http.get('searchbydate/' + this.value1, {params: this.queryInfo})
        this.videoList = []
        this.videoList = res.data
        //console.log(this.videoList)
        this.total = res.total_num
      }else {
        this.getVideoList()
      }
    },


    //监听page_size改变的事件
    handleSizeChange(newSize) {
      console.log(newSize)
      this.queryInfo.page_size = newSize
      this.getVideos()
    },
    //监听页码值改变的事件
    handleCurrentChange(newPage) {
      console.log(newPage)
      this.queryInfo.page_num = newPage
      this.getVideos()
    },
    user_logout(){
      window.sessionStorage.clear()
      this.$router.push('/login')
    }
  },
  mounted() {
  },
}
</script>


<style scoped>
.headBack {
  width: 100%;
  background: rgb(255, 255, 255);
  /*margin-bottom:30px;*/
  /* box-shadow: 0 2px 4px 0 rgba(0, 0, 0, .12), 0 0 6px 0 rgba(0, 0, 0, .04); */
  /*position: absolute;*/
  left: 0;
  top: 0;
  right: 0;
  z-index: 100;
}

.headImgBox {
  height: 760px;
  position: relative;
  width: 100%;
  background-size: cover;
  background-position: center 50%;
  background-repeat: no-repeat;
  margin-bottom: 90px;
}

.headImgBox2 {
  height: 150px;
  position: relative;
  width: 100%;
  background-size: cover;
  background-position: center 50%;
  background-repeat: no-repeat;
  margin-bottom: 90px;
}


.headImgBox3 {
  /*height: 760px;*/
  position: relative;
  width: 100%;
  background-size: cover;
  background-position: center 50%;
  background-repeat: no-repeat;
  /*margin-bottom: 90px;*/
}

.headImgBox .scene {
  width: 100%;
  text-align: center;
  font-size: 50px;
  font-weight: 100;
  color: #fff;
  position: absolute;
  left: 0;
  top: 200px;
  font-family: 'Sigmar One', Arial;
  text-shadow: 0 2px 2px #47456d;
  padding-bottom: 0px;
}


.button {
  padding: 0;
  float: right;
}

.el-carousel >>> .el-carousel__container {
  height: 51vw;
}

.el-carousel__item h3 {
  color: #475669;
  font-size: 14px;
  opacity: 0.75;
  line-height: 150px;
  margin: 0;

}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n+1) {
  background-color: #d3dce6;
}

body {
  margin: 0;
}

#app {
  width: 100%;
  margin: 0 auto;
  min-width: 360px;
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

.desc1 {
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
  transform: translate(-50%, 0);
  bottom: 3px;
}

.headImgBox {
  /* height: 852.39px; */
  width: 100%;
}

.back1 {
  /*position: absolute;*/
  /* z-index: -1; */
  margin-bottom: -5px;
}

.back_ground {
  /*position: absolute;*/
  width: 100%;
  /* transform: translate(0,250px); */
}

@media screen and (max-width: 700px){
  .pc{
    display:none;
  }
  .mobile{
    display: block;
  }
  .mobile_page{
    display: block;
  }
  .page{
    display: none;
  }
}
@media screen and (min-width: 700px){
  .pc{
    display:block;
  }
  .mobile{
    display: none;
  }
  .mobile_page{
    display: none;
  }
  .page{
    display: block;
  }
}
.el-button {
  font-size: 18px
}

.mobile_search_box {
  /* background-color: red; */
  text-align: center;
  margin-top: 50px;
}
.mobile_search_box2 {
  text-align: center;
  margin-top: 50px;
 
}

.search_box {
  text-align: center;
  margin-top: 50px;
}
.search_box2 {
  
  margin-top: 50px;
 
}

.logout{
    float: right;
    padding-right: 20px;
    padding-bottom:20px;
}

.search_button {
  margin-left: 20px;
}

.search_input {
  /*
  	-moz-,  -webkit-, -o-这些都是浏览器前缀
	Firefox: -moz-
	Chrome, Safari: -webkit-
	Opera: -o-
	IE: -ms-
  */
  /* box-shadow是设置阴影的
  inset：可选值，默认阴影在盒子外，使用inset后，阴影在盒子内*/
  box-shadow: inset 0 0 3px rgb(255, 0, 0);
  -moz-box-shadow: inset 0 0 3px rgb(255, 0, 0);
  -webkit-box-shadow: inset 0 0 3px rgb(255, 0, 0);
}

.test_button {
  background-color: unset;
  background-image: url("../assets/tag.png");
  border: none;
  width: 250px;
  height: 42px;
  margin-top: 20px;
}

.list {
  width: 80%;
  margin: auto;
  position: relative;
  /* text-align: center; */
  padding: 20px;
  font-size: 16px;
  opacity: 0.98;
  border-radius: 5px;
  z-index: 1;
}

.set img {
  width: 175px;
  height: 175px;
  margin-top: 10px;
  border: 3px solid;
  border-radius: 100%;
  box-shadow: 0px 0px 10px rgb(255, 0, 0);
  object-fit: cover;
  box-shadow: 0, 0, 10px, rgb(236, 93, 93);
  position: relative;
  left: 50%;
  transform: translate(-50%, 0);
}

.sett img {
  width: 175px;
  height: 175px;
  margin-top: 10px;
  border: 3px solid;
  border-radius: 100%;
  box-shadow: 0px 0px 10px rgb(255, 0, 0);
  object-fit: cover;
  box-shadow: 0, 0, 10px, rgb(236, 93, 93);
  position: relative;
  left: 50%;
  transform: translate(-50%, 0);
}

.box {
  background-color: rgb(255, 255, 255);
  height: 520px;
  position: relative;
  margin-top: 50px;
  box-shadow: 5px 5px 10px rgb(224, 118, 118);
}

.font_css {
  font-size: 15px;
  color: #FFFFFF;
  line-height: 45px;
}

.el-card >>> .el-card__body {
  padding: 2px;
}

.page {
  text-align: center;
  margin-top: 20px;
  opacity: 0.8;
  margin-bottom: 20px;
}
.mobile_page {
  text-align: center;
  margin-top: 20px;
  opacity: 0.8;
  margin-bottom: 20px;
}
@media screen and (max-width: 550px) {
  .el-pagination {
    white-space: normal;
  }
}

@media screen and (max-width: 390px) {
  .el-carousel >>> .el-carousel__container {
    height: 197px;
  }
}

</style>
