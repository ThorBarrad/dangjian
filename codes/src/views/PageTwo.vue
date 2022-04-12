<template>
  <div>
    <!-- 背景图部分 -->
    <!-- <div class="video_background">
      <img :src="imgSrc" width="100%" height="100%" alt="" />
    </div> -->
    <div class="video_background">
      <div style="width: 100%;height: 58vw;">
        <img :src="imgSrc" width="100%" height="100%" alt="" />
      </div>
      <div class="video_title">
        <div class="title_card">
          <span class="title_css">{{ get_list.title }}</span>
          <span class="title_css">【日期：{{ get_list.date }}】</span>
        </div>
      </div>
    </div>

    <!-- 非背景图部分 -->
    <div class="back_ground" :style="{backgroundImage:'url('+imgSrc1+')'}">
      <div class="no_background">
        <!-- 视频播放器 -->
        <div class="video_box">
          <video-player
            ref="videoPlayer"
            class="video-player vjs-custom-skin"
            :playsinline="true"
            :options="playerOptions"
            @play="onPlayerPlay($event)"
            @pause="onPlayerPause($event)"
          />
        </div>
        <div>
          <el-card class="content" >
            <span>
              <h3>原文：</h3>
              <div style="text-indent: 32px;">{{ get_list.content }}</div>
            </span>
          </el-card>
        </div>
      </div>
      <div>
        <img :src="imgSrc2" width="100%"   />
      </div>
    </div>
  </div>
</template>

<script>

export default {
  data() {
    return {
      get_list: {
        category: '',
        pic_url: '',
        video_url: '',
        title: '',
        content: '',
        tags: '',
        brief: "",
        date:'',
        location:''
      },
      id: '',
      playerOptions: {
        playbackRates: [0.7, 1.0, 1.5, 2.0], //播放速度
        autoplay: false, // 如果true,浏览器准备好时开始回放。
        muted: false, // 默认情况下将会消除任何音频。
        loop: false, // 导致视频一结束就重新开始。
        preload: 'auto', // 建议浏览器在<video>加载元素后是否应该开始下载视频数据。auto浏览器选择最佳行为,立即开始加载视频（如果浏览器支持）
        language: 'zh-CN',
        aspectRatio: '16:9', // 将播放器置于流畅模式，并在计算播放器的动态大小时使用该值。值应该代表一个比例 - 用冒号分隔的两个数字（例如"16:9"或"4:3"）
        fluid: true, // 当true时，Video.js player将拥有流体大小。换句话说，它将按比例缩放以适应其容器。
        hls: true,
        sources: [
          {
            type: 'application/x-mpegURL', // 这里的种类支持很多种：基本视频格式、直播、流媒体等，具体可以参看git网址项目
            src: '' // url地址
          }
        ],
        poster: '', // 你的封面地址
        width: document.documentElement.clientWidth, // 播放器宽度
        notSupportedMessage: '此视频暂无法播放，请稍后再试', // 允许覆盖Video.js无法播放媒体源时显示的默认信息。
        controlBar: {
          timeDivider: true,
          durationDisplay: true,
          remainingTimeDisplay: false,
          fullscreenToggle: true // 全屏按钮
        }
      },
      imgSrc:require('../assets/pic/top.png'),
      imgSrc1:require('../assets/pic/bkg32.png'),
      imgSrc2:require('../assets/pic/buttom.png'),
    };
  },

  created() {
    this.get_params()
  },
  computed: {
    player() {
      return this.$refs.videoPlayer.player//自定义播放
    }
  },

  methods: {
    async get_params() {
      // console.log(this.$route.params.id);   // post_id
      this.id = this.$route.params.id
      // console.log(this.id)

      const {data: res} = await this.$http.get('posts/' + this.$route.params.post_id)
      // res.forEach(element => {
      // console.log(element)
      // if (element.post_id == this.$route.params.post_id) {
      this.playerOptions.sources[0]['src'] = res.video_url
      this.playerOptions.poster = res.thumb_url
      this.get_list.brief = res.brief
      this.get_list.category = res.category
      this.get_list.content = res.raw_text
      this.get_list.tags = res.tags
      this.get_list.video_url = res.video_url
      this.get_list.title = res.title
      this.get_list.pic_url = res.thumb_url
      this.get_list.date = res.date
      this.get_list.location = res.location
      // }
      // });
      // console.log(this.playerOptions.sources[0]['src'])
      // console.log(this.playerOptions.poster)
    },
  },
  mounted() {
  },
};
</script>

<style scoped>
.video_background{
  position: relative;
  height: 58vw;
  background-size: cover;
  /* background-position: center 50%; */
	background-repeat: no-repeat;
}
.tag{
  font-size: 80px;
  font-family: ziti;
  color: rgb(153, 45, 45);
  position: absolute;
  left: 50%;
  top: 30%;
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

.video_title{
  font-family: ziti;
  width: 80%;
  left:50%;
  top: 50%;
  transform: translate(-50%,-30%);
  position: absolute;
}


.back_ground{
  /* position: absolute; */
  z-index: 1;
  /* top: 113%; */
}
.video_box{
  box-shadow:2px 2px 10px rgb(247, 230, 230);
}
.no_background{
  width: 85%;
  position: relative;
  left: 50%;
  transform: translateX(-50%);
  padding-top: 20px;
}

.title_card{
  z-index: 1;
  /* width: 540px; */
  /* height: 300px; */
  background-color: unset;
  border: none;
  text-align: center;
}
.title_card >>> .el-card__body{
  padding:0px;
}
.title_css{
  font-size: 40px;
  background-image:-webkit-linear-gradient(bottom,rgb(129, 113, 38),#d1c73e,rgb(239, 255, 20));
  -webkit-background-clip:text;
  -webkit-text-fill-color:transparent;
}
@media screen and (max-width: 750px){
  .title_css{
    font-size: 18px;
  }
  .video_background{
    max-height: 200px;
  }
  .video_title{
    bottom: 15%;
    top: unset;
  }
}
@media screen and (max-width: 400px){
  .title_css{
    font-size: 12px;
  }
  .video_background{
    max-height: 200px;
  }
  .video_title{
    bottom: 25%;
    top: unset;
  }
}
.content{
  margin-top: 50px;
  background:rgba(255, 255, 255, 0.8);
  
}
.content >>> .el-card__body{
  padding:30px;
}
</style>
