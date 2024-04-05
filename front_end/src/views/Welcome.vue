<template>
  <div class="welcome-main">
    <div>
      <aiChat />
    </div>
    <!-- <h3 class="greet">亲爱的用户
      <span style="color:gray;font-style:italic;">{{ user_name }}</span> , 欢迎使用
    </h3> -->
    <el-carousel :interval="5000" trigger="click">
      <el-carousel-item style="overflow:visible;" v-for="item in imgs" :key="item">
        <img style="display:block;z-index:100; image-rendering:auto; width:100%;object-fit:cover;height:444px;"
          :src="item" alt="">
      </el-carousel-item>
    </el-carousel>
    <div class="main-container">
      <div class="bookStat-container desc">
        <div class="bookStat">
          <el-card class="bookStat-card">
            <div class="card">
              <div class="card-left">
                <i class="el-icon-notebook-1" style="font-size:50px;"></i>
              </div>
              <div class="card-right">
                <div class="card-right-left">已借出图书数量</div>
                <div class="card-right-right">5</div>
              </div>
            </div>
          </el-card>
          <el-card class="bookStat-card">
            <div class="card">
              <div class="card-left">
                <i class="el-icon-notebook-2" style="font-size:50px;"></i>
              </div>
              <div class="card-right">
                <div class="card-right-left">该还入图书数量</div>
                <div class="card-right-right">0</div>
              </div>
            </div>
          </el-card>
        </div>
      </div>
      <div class="card1-box">
        <div class="card-bottom card1">
          <el-card>
            <!-- 柱状图 -->
            <div class="echarts-box">
              <div ref="echarts1" style="height:320px ;width:100%;"></div>
            </div>
          </el-card>
        </div>
      </div>

      <div class="card-bottom card2">
        <el-card>
          <!-- 饼状图 -->
          <div class="echarts-box">
            <div ref="echarts2" style="height:320px ;width:388px;"></div>
          </div>
        </el-card>
        <el-card>
          <!-- 折线图 -->
          <div class="echarts-box">
            <div ref="echarts3" style="height:320px ;width:388px;"></div>
          </div>
        </el-card>
        <el-card>
          <!-- 圆饼图 -->
          <div class="echarts-box">
            <div ref="echarts4" style="height:320px;width:380px;"></div>
          </div>
        </el-card>
      </div>
      <h3 class="title">精品书单</h3>
      <el-card class="card-bottom card33">
        <div class="card3">
          <CardCom v-for="item in bookLists" :key="item.id" :bookList="item" />
        </div>
      </el-card>
      <h3 class="title">今日荐读</h3>
      <el-card class="card-bottom card4">
        <div class="echarts-box">
          <h4 class="title2">中国巨著</h4>
          <el-carousel style="width: 666px;height: auto;" :interval="4000" type="card">
            <!-- style="width: 200px;" -->
            <el-carousel-item v-for="item in goodBooks" :key="item">
              <img class="goodBookImg" :src="item" alt="">
            </el-carousel-item>
          </el-carousel>
          <h4 class="title2">外国巨著</h4>
          <el-carousel style="width: 666px;height: auto;" :interval="4000" type="card">
            <!-- style="width: 200px;" -->
            <el-carousel-item v-for="item in goodBooks1" :key="item">
              <img class="goodBookImg" :src="item" alt="">
            </el-carousel-item>
          </el-carousel>
        </div>
        <!-- style="overflow:visible;width: 666px;"  -->
      </el-card>
    </div>
  </div>
  <!-- <transition-group appear name="animate__animated animated__bounce" enter-active-class="animate__fadeInDown"
      leave-active-class="animate__fadeOutDown"> -->
  <!-- <div class="echarts-container"></div> -->
  <!-- <el-card style="height:300px;" class="card2"> -->
  <!-- </el-card> -->
  <!-- </transition-group> -->
</template>

<script>
import * as echarts from 'echarts';
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import CardCom from '../components/CardCom.vue';
import aiChat from '../components/ai-service/index.vue'
export default {
  components: {
    CardCom,
    aiChat
  },
  data() {
    return {
      user_name: '',
      imgs: [
        '/img/4.jpg',
        '/img/3.jpg',
        '/img/2.jpg',
        '/img/1.jpg',
      ],
      goodBooks: [
        '/img/goodBooks1.jpg',
        '/img/goodBooks2.jpg',
        '/img/goodBooks3.jpg',
        '/img/goodBooks4.jpg',
        '/img/goodBooks5.jpg',
        '/img/goodBooks6.jpg',
      ],
      goodBooks1: [
        '/img/goodBooks7.jpg',
        '/img/goodBooks8.jpg',
        '/img/goodBooks9.jpg',
        '/img/goodBooks10.jpg',
        '/img/goodBooks2.jpg',
        '/img/goodBooks5.jpg',
      ],
      bookLists: [
        {
          id: 1,
          url: '/img/32.jpg',
          text: '雅美散文'
        },
        {
          id: 2,
          url: '/img/1.avif',
          text: '高分影视原著'
        },
        {
          id: 3,
          url: '/img/31.jpg',
          text: '读懂爱情'
        },
        {
          id: 4,
          url: '/img/2.avif',
          text: '译文精选'
        },
        {
          id: 5,
          url: '/img/3.jpg.avif',
          text: '成功学'
        },
        // {
        //   id: 6,
        //   url: '/img/shudan1.png',
        //   text: '历史趣事'
        // },
        {
          id: 6,
          url: '/img/shudan.jpg',
          text: '自然科学'
        },
        // {
        //   id: 8,
        //   url: '/img/shudan3.jpg',
        //   text: '神话故事'
        // },
      ]
    }
  },
  methods: {
    scrollCard1() {
      const line = gsap.timeline();
      ScrollTrigger.create({
        trigger: ".card1-box",
        once: true, // 确保动画只触发一次
        markers: false,
        onEnter: () => {
          line.fromTo(
            ".card1-box",
            {
              opacity: 0,
              y: -100,
              scale: 0
            }, {
            opacity: 1,
            y: 0,
            duration: 3, // 将动画持续时间延长到 3 秒
            scale: 1,
            ease: "power2.out"
          }
          );
        }
      })
    },
    scrollCard2() {
      const line = gsap.timeline();
      ScrollTrigger.create({
        trigger: ".card2",
        once: true, // 确保动画只触发一次
        markers: false,
        onEnter: () => {
          line.fromTo(
            ".card2",
            { translateY: 100, opacity: 0 },
            { translateY: 0, opacity: 1, duration: 1 }
          );
        }
      })
    },
    scrollCard3() {
      const line = gsap.timeline();
      ScrollTrigger.create({
        trigger: ".card33",
        once: true, // 确保动画只触发一次
        markers: false,
        onEnter: () => {
          line.fromTo(
            ".card33",
            { translateY: 100, opacity: 0 },
            { translateY: 0, opacity: 1, duration: 1 }
          );
        }
      })
    },
    scrollCard4() {
      const line = gsap.timeline();
      ScrollTrigger.create({
        trigger: ".card4",
        once: true, // 确保动画只触发一次
        markers: false,
        onEnter: () => {
          line.fromTo(
            ".card4",
            { translateY: 100, opacity: 0 },
            { translateY: 0, opacity: 1, duration: 1 }
          );
        }
      })
    },
  },
  created() {
    this.user_name = window.localStorage.getItem('name')
  },
  mounted() {
    const echarts1 = echarts.init(this.$refs.echarts1)
    let echarts1Option = {
      title: {
        text: '图书馆藏书统计', // 标题文本
        left: 'center', // 标题水平居中
      },
      // 提示框
      tooltip: {
        trigger: "axis",
      },
      xAxis: {
        type: 'category',
        data: ['社会科学类', '自然科学类', '工程技术类', '医学与健康类', '艺术与设计类', '教育与心理学类', '法律与政治类', '管理与商业类', '语言与文学类', '农业与农村发展类', '环境与可持续发展类', '传媒与传播类', '地理与人类学类', '建筑与城市规划类', '体育与运动科学类', '宗教与哲学类', '社会服务与社会工作类', '心理学与行为科学类', '旅游与酒店管理类', '家庭与消费科学类', '电影与电视类', '地球科学与地质学类', '法医学与犯罪学类', '航空航天与航海类', '音乐与舞蹈类', '食品科学与营养学类'],
        axisLine: {
          lineStyle: {
            // color:"#17b3a3",
          },
        },
        axisLabel: {
          rotate: 30,  // 设置旋转角度，例如45度
          fontSize: 10, // 设置字体大小
          color: '#0B539B' // 设置字体颜色，例如黑色
        }
      },
      yAxis: {
        type: 'value',
        axisLine: {
          lineStyle: {
            width: 2, // 设置轴线的粗细，单位为像素
          },
        },
        axisLabel: {
          color: "#0B539B" // 设置字体颜色，例如黑色
        }
      },
      series: [
        {
          data: [120, 200, 150, 80, 70, 110, 130, 88, 150, 66, 44, 104, 20, 55, 123, 45, 100, 88, 33, 12, 45, 32, 88, 44, 76, 32],
          type: 'bar',
          barWidth: 20 // 设置柱形的宽度，单位为像素，默认为自适应
        }
      ],
      color: ["#0B539B"],
    };
    echarts1.setOption(echarts1Option)
    const echarts2 = echarts.init(this.$refs.echarts2)
    let echarts2Option = {
      title: {
        text: '各个年级借书比例',
        left: 'center'
      },
      tooltip: {
        trigger: "item",
      },
      legend: {
        orient: 'vertical',
        left: 'left'
      },
      color: [
        "#0f78f4",
        "#dd536b",
        "#9462e5",
        "#39c362",
        "#3ed1cf",
      ],
      series: [{
        data: [
          { value: 1048, name: '大一' },
          { value: 735, name: '大二' },
          { value: 580, name: '大三' },
          { value: 484, name: '大四' },
          { value: 666, name: '研究生' }
        ],
        type: 'pie',
        center: ['55%', '60%'] // 将饼状图的圆心向右移动
      }
      ],
    }
    echarts2.setOption(echarts2Option)
    const echarts3 = echarts.init(this.$refs.echarts3)
    let echarts3Option = {
      title: {
        text: '借出和还入'
      },
      tooltip: {
        trigger: 'axis'
      },
      legend: {
        data: ['借书', '还书']
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
      },
      xAxis: {
        type: 'category',
        boundaryGap: false,
        data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月']
      },
      yAxis: {
        type: 'value'
      },
      series: [
        {
          name: '借书',
          type: 'line',
          data: [220, 182, 191, 234, 290, 330, 310, 101, 134, 90, 230, 210]
        },
        {
          name: '还书',
          type: 'line',
          data: [120, 132, 101, 134, 90, 230, 210, 123, 321, 134, 99, 321]
        },
      ]
    };
    echarts3.setOption(echarts3Option)
    const echarts4 = echarts.init(this.$refs.echarts4)
    let echarts4Option = {
      legend: {
        top: 'bottom',
      },
      // 提示框
      tooltip: {
        trigger: "item",
      },
      series: [
        {
          name: '学生爱读书类前八名',
          type: 'pie',
          radius: ['30%', '70%'], // 设置内半径和外半径
          center: ['50%', '40%'], // 设置圆心位置为上方
          roseType: 'area',
          itemStyle: {
            borderRadius: 8
          },
          data: [
            { value: 40, name: '自然科学类' },
            { value: 38, name: '工程技术类' },
            { value: 32, name: '医学与健康类' },
            { value: 30, name: '艺术与设计类' },
            { value: 28, name: '教育与心理学类' },
            { value: 26, name: '法律与政治类' },
            { value: 22, name: '电影与电视类语言与文学类' },
            { value: 18, name: '食品科学与营养学类' },
          ]
        }
      ]
    };
    echarts4.setOption(echarts4Option)
    // this.setupScrollTrigger();
    window.addEventListener('resize', () => {
      echarts1.resize();
      echarts2.resize();
      echarts3.resize();
      echarts4.resize();
    });
    this.scrollCard1()
    this.scrollCard2()
    this.scrollCard3()
    this.scrollCard4()
  },
}

</script>
<style scoped>
.welcome-main {
  width: 100%;
  padding: 0;
  margin: 0;
  background-color: #f2f5f8;
  display: flex;
  flex-direction: column;
  flex: auto;
  padding-top: 60px;
}

.el-carousel {
  width: 100%;
  /* height:554px; */
  height: 444px;
}

.el-carousel-item {
  width: 100%;
  height: 444px;
}

.el-carousel-item.el-carousel-item-img {
  display: block;
  width: 100%;
  object-fit: cover;
}

.swiper-img {
  height: 100%;
  width: 60%;
}

.greet {
  position: relative;
  user-select: none;
  font-size: 1rem;
  float: left;
}

.main-container {
  width: 100%;
  display: flex;
  flex-direction: column;
}

.bookStat-container {
  position: relative;
  margin: 0 20px;
}

.bookStat {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 25px 0;
}

.bookStat-card {
  flex: 1;
}

.card {
  display: flex;
  flex-direction: row;
}

.bookStat-card:nth-child(1) {
  margin-right: 18px;
}

.bookStat-card:nth-child(2) {
  margin-left: 18px;
}

.card-left {
  position: relative;
  flex: 1;
  height: 150px;
}

.card-left {
  background-color: #0b539ba8;
}

.card-right {
  flex: 2;
  width: 300px;
  height: 150px;
  padding: 10px;
  display: flex;
  flex-direction: column;
  text-align: center;
  align-items: center;
  /* 让子元素在纵向上居中 */
}

.el-icon-notebook-1,
.el-icon-notebook-2 {
  color: #fff;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.card-right-left {
  color: #0B539B;
  flex: 1;
  font-size: 44px;
  vertical-align: middle;
  display: flex;
  justify-content: center;
}

.card-right-right {
  color: #0B539B;
  vertical-align: middle;
  font-size: 66px;
  flex: 1;
  display: flex;
  justify-content: center;
}

.text {
  display: block;
}

.card-bottom {
  margin: 0 20px 20px 20px;
}

.card2 {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}

.card3 {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}

.echarts-box {
  display: flex;
  flex: 1;
  justify-content: center;
  align-items: center;
}

.title {
  position: relative;
  user-select: none;
  font-size: 2rem;
  color: #0B539B;
  padding: 0;
  margin: 0.5rem 0 4rem 0;
  margin: 10px auto;
}

.goodBookImg {
  /* width: 200px; */
  width: 100%;
  height: auto;
  display: block;
  image-rendering: auto;
  object-fit: cover;
}

.title2 {
  color: #0B539B;
  writing-mode: vertical-rl;
  margin: 0 20px;
}
</style>
